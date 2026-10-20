import { useEffect, useRef, useState } from 'react'
import RunningLetters from './RunningLetters'

export default function PortfolioCard({
  title,
  organization,
  date,
  description,
  number,
}) {
  const cardRef = useRef(null)
  const frameRef = useRef(0)
  const [revealed, setRevealed] = useState(false)
  const [touchFlipped, setTouchFlipped] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return undefined

    if (!('IntersectionObserver' in window)) {
      setRevealed(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  const handlePointerMove = (event) => {
    setRevealed(true)
    if (event.pointerType !== 'mouse' || !cardRef.current) return

    const card = cardRef.current
    const bounds = card.getBoundingClientRect()
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8
    const rotateX = (0.5 - (event.clientY - bounds.top) / bounds.height) * 8

    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      card.style.setProperty('--card-rotate-x', `${rotateX.toFixed(2)}deg`)
      card.style.setProperty('--card-rotate-y', `${rotateY.toFixed(2)}deg`)
      card.style.setProperty('--card-light-x', `${event.clientX - bounds.left}px`)
      card.style.setProperty('--card-light-y', `${event.clientY - bounds.top}px`)
    })
  }

  const handlePointerLeave = () => {
    cancelAnimationFrame(frameRef.current)
    if (!cardRef.current) return
    cardRef.current.style.setProperty('--card-rotate-x', '0deg')
    cardRef.current.style.setProperty('--card-rotate-y', '0deg')
  }

  const handlePointerDown = (event) => {
    if (event.pointerType === 'touch') {
      setRevealed(true)
      setTouchFlipped((current) => !current)
    }
  }

  return (
    <article
      ref={cardRef}
      className={`experience-card${revealed ? ' is-revealed' : ''}${touchFlipped ? ' is-touch-flipped' : ''}`}
      tabIndex={0}
      aria-label={`${title} at ${organization}. ${date}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onFocus={() => setRevealed(true)}
    >
      <div className="experience-card-inner">
        <div className="experience-card-face experience-card-front">
          <span className="experience-number">{String(number).padStart(2, '0')}</span>
          <span className="experience-card-hint">HOVER TO EXPLORE</span>
          <span className="experience-period">
            <RunningLetters text={date} stage={1} />
          </span>
          <h3>
            <RunningLetters text={title} stage={0} />
          </h3>
          <p className="experience-company">
            <RunningLetters text={organization} stage={1} />
          </p>
        </div>
        <div className="experience-card-face experience-card-back">
          <span className="experience-card-back-label">
            <RunningLetters text="Details" stage={0} />
          </span>
          <p>
            <RunningLetters text={description} stage={2} />
          </p>
        </div>
      </div>
    </article>
  )
}
