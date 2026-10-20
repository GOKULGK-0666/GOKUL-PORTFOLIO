import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Award, ExternalLink, FileText, X, ZoomIn, ZoomOut } from 'lucide-react'
import { achievements, certificates as verificationCertificates } from '../data/portfolio'
import RunningLetters from './RunningLetters'

const certificateFiles = [
  'DevTown 5days camp.jpeg',
  'Freecode camp Js & Ds.jpeg',
  'Freecode camp Responsive web.jpeg',
  'Freecodecamp Frontend lb.png',
  'Google C1.pdf',
  'Google C2.pdf',
  'Google C3.pdf',
  'Google C4.pdf',
  'Google C5.pdf',
  'Google CAll.pdf',
  'IBM C1.pdf',
  'IBM C2.pdf',
  'IBM C3.pdf',
  'IBM C4.pdf',
  'IBM C5.pdf',
  'IBM C6.pdf',
  'IBM C7.pdf',
  'IBM C8.pdf',
  'IBM C9.pdf',
  'IBM Star badge.jpeg',
  'Meta C1.pdf',
  'Meta C2.pdf',
  'Meta C3.pdf',
  'Meta C4.pdf',
  'Novitech AI.jpeg',
  'Novitech Bootcamp.jpeg',
  'Novitech DA.jpeg',
  'Scaler Aws.jpeg',
  'Scaler Nodejs.jpeg',
  'Scaler Springboot.jpeg',
  'Udmey 10 website.jpeg',
  'Udmey AI & cybersecurity.jpeg',
  'Udmey All in database.jpeg',
  'Udmey Css & Js & PY.jpeg',
  'Udmey Pyhton.jpeg',
  'Udmey React.jpeg',
  'Udmye AI tools.jpeg',
  'Unique yt Java.jpeg',
]

const verifiedFileTitles = new Map([
  ['Freecode camp Js & Ds.jpeg', 'JavaScript Algorithms and Data Structures'],
  ['Freecode camp Responsive web.jpeg', 'Responsive Web Design'],
  ['Freecodecamp Frontend lb.png', 'Front-End Development Libraries'],
  ['Udmey AI & cybersecurity.jpeg', 'AI & Cybersecurity Mastery 2026'],
  ['Udmey All in database.jpeg', 'SQL, MySQL, PostgreSQL & MongoDB: All-in-One Database'],
  ['Udmey Pyhton.jpeg', 'The Complete Python Masterclass: Learn Python'],
])

const verifiedByTitle = new Map(
  verificationCertificates.map(([title, issuer, year, url]) => [
    title,
    { issuer, year, url },
  ]),
)

const getIssuer = (file) => {
  if (file.startsWith('Freecode camp')) return 'freeCodeCamp'
  if (file.startsWith('Udmey') || file.startsWith('Udmye')) return 'Udemy'
  if (file.startsWith('Unique yt')) return 'Unique YouTube'
  return file.split(' ')[0]
}

const encodeCertificateFilename = (file) =>
  encodeURIComponent(file).replace(/%26/g, '&')

const certificateItems = certificateFiles.map((file) => {
  const verified = verifiedByTitle.get(verifiedFileTitles.get(file))
  const title = verifiedFileTitles.get(file)
    ?? file.replace(/\.[^.]+$/, '').replace(/^Udmey/, 'Udemy').replace(/^Udmye/, 'Udemy').replace(/^Freecode camp/, 'freeCodeCamp')

  return {
    title,
    issuer: verified?.issuer ?? getIssuer(file),
    year: verified?.year ?? '',
    file,
    url: `${import.meta.env.BASE_URL}certificates/${encodeCertificateFilename(file)}`,
    verificationUrl: verified?.url ?? '',
    type: file.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image',
  }
})

const representedTitles = new Set(verifiedFileTitles.values())
const onlineOnlyCertificates = verificationCertificates
  .filter(([title]) => !representedTitles.has(title))
  .map(([title, issuer, year, url]) => ({
    title,
    issuer,
    year,
    file: '',
    url,
    verificationUrl: url,
    type: 'online',
  }))

const galleryItems = [...certificateItems, ...onlineOnlyCertificates]

const wrapIndex = (index) => (index + galleryItems.length) % galleryItems.length

function CertificateArtwork({ certificate, className = '', eager = false, thumbnail = false }) {
  if (certificate.type === 'image') {
    return (
      <img
        className={className}
        src={certificate.url}
        alt={`${certificate.title} certificate`}
        loading={eager ? 'eager' : 'lazy'}
        draggable="false"
      />
    )
  }

  if (certificate.type === 'pdf') {
    if (thumbnail) {
      return (
        <span className={`${className} certificate-pdf-artwork`}>
          <FileText size={32} />
          <strong>PDF certificate</strong>
          <small>Open to view original</small>
        </span>
      )
    }
    return (
      <iframe
        className={className}
        src={`${certificate.url}#toolbar=0&navpanes=0&view=FitH`}
        title={`${certificate.title} certificate`}
        loading={eager ? 'eager' : 'lazy'}
      />
    )
  }

  return (
    <div className={`${className} certificate-online-artwork`}>
      <span>Verified certificate</span>
      <strong>{certificate.issuer}</strong>
      <small>Open the issuer&apos;s certificate page to view the original.</small>
    </div>
  )
}

export default function Certificates() {
  const [selected, setSelected] = useState(0)
  const [activeAchievement, setActiveAchievement] = useState(0)
  const [expandedAchievement, setExpandedAchievement] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [galleryVisible, setGalleryVisible] = useState(false)
  const sectionRef = useRef(null)
  const galleryRef = useRef(null)
  const closeButtonRef = useRef(null)
  const dragStartRef = useRef(null)
  const draggedRef = useRef(false)
  const returnFocusRef = useRef(null)
  const certificate = galleryItems[selected]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    if (!('IntersectionObserver' in window)) {
      setGalleryVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGalleryVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!modalOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setModalOpen(false)
      if (event.key === 'ArrowRight') {
        setSelected((current) => wrapIndex(current + 1))
        setZoom(1)
      }
      if (event.key === 'ArrowLeft') {
        setSelected((current) => wrapIndex(current - 1))
        setZoom(1)
      }
      if (event.key === 'Tab') {
        const focusable = document.querySelectorAll(
          '.certificate-modal-dialog button:not([disabled]), .certificate-modal-dialog a[href]',
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [modalOpen])

  useEffect(() => {
    if (!modalOpen) {
      returnFocusRef.current?.focus()
      setZoom(1)
    }
  }, [modalOpen])

  const openModal = (trigger) => {
    returnFocusRef.current = trigger
    setModalOpen(true)
  }

  const handleGalleryKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      setSelected((current) => wrapIndex(current + 1))
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setSelected((current) => wrapIndex(current - 1))
    }
    if (event.key === 'Enter' && event.target === galleryRef.current) {
      openModal(galleryRef.current)
    }
  }

  const handlePointerDown = (event) => {
    if (event.target.closest('.certificate-gallery-control, .certificate-verify-link')) return
    draggedRef.current = false
    dragStartRef.current = { x: event.clientX, y: event.clientY }
  }

  const handlePointerUp = (event) => {
    if (!dragStartRef.current) return
    const deltaX = event.clientX - dragStartRef.current.x
    const deltaY = event.clientY - dragStartRef.current.y
    dragStartRef.current = null
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      draggedRef.current = true
      setSelected((current) => wrapIndex(current + (deltaX < 0 ? 1 : -1)))
    }
  }

  const previous = () => {
    setSelected((current) => wrapIndex(current - 1))
    setZoom(1)
  }
  const next = () => {
    setSelected((current) => wrapIndex(current + 1))
    setZoom(1)
  }

  return (
    <section
      className={`certificates section achievement-certificates-section${galleryVisible ? ' is-gallery-visible' : ''}`}
      id="achievements"
      ref={sectionRef}
    >
      <div className="section-label">05 — Achievements & Certifications</div>
      <div className="certificates-heading">
        <h2>
          <span className="achievement-heading-word">Achievements</span>{' '}
          <em>
            <span className="achievement-heading-word">&amp;</span>{' '}
            <span className="achievement-heading-word">Certifications</span>
          </em>
        </h2>
        <p>Every milestone represents a new skill, a challenge overcome, and another step forward in my development journey.</p>
      </div>
      <div className="achievement-journey" aria-label="Achievement milestones">
        <svg className="achievement-journey-path" viewBox="0 0 1000 230" preserveAspectRatio="none" aria-hidden="true">
          <path className="achievement-journey-line-desktop" id="achievement-journey-line" d="M125 86 L375 125 L625 102 L875 125" />
          <path className="achievement-journey-line-mobile" d="M500 0 L350 57.5 L650 115 L350 172.5 L500 230" />
          <circle r="4" className="achievement-journey-particle">
            <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
              <mpath href="#achievement-journey-line" />
            </animateMotion>
          </circle>
        </svg>
        {achievements.map(([title, organization, date, description], index) => (
          <article
            className={`achievement-journey-card${activeAchievement === index ? ' is-featured' : ''}${expandedAchievement === index ? ' is-expanded' : ''}`}
            key={title}
            style={{ '--achievement-index': index }}
            onMouseEnter={() => setActiveAchievement(index)}
            onFocus={() => setActiveAchievement(index)}
          >
            <button
              className="achievement-journey-trigger"
              type="button"
              aria-expanded={expandedAchievement === index}
              aria-controls={`achievement-details-${index}`}
              onClick={() => {
                setActiveAchievement(index)
                setExpandedAchievement((current) => current === index ? -1 : index)
              }}
            >
              <span className="achievement-journey-topline">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <Award size={17} aria-hidden="true" />
              </span>
              <strong>{title}</strong>
              <span className="achievement-journey-organization">{organization}</span>
              <span className="achievement-journey-date">{date}</span>
              <span className="achievement-journey-action">{expandedAchievement === index ? 'Hide details' : 'Explore milestone'}</span>
            </button>
            <div
              className="achievement-journey-details"
              id={`achievement-details-${index}`}
              aria-hidden={expandedAchievement !== index}
            >
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
      <div id="certificates" className="certificate-collection">
        <div className="certificate-collection-heading">
          <div>
            <span className="section-label">Certificate collection</span>
            <p>Browse the certificates and verified credentials earned along the way.</p>
          </div>
        </div>
        <div
          className="certificate-gallery"
          role="region"
          aria-label="Certificate gallery. Use left and right arrow keys to browse."
          tabIndex={0}
          ref={galleryRef}
          onKeyDown={handleGalleryKeyDown}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { dragStartRef.current = null }}
          onClickCapture={(event) => {
            if (draggedRef.current) {
              event.preventDefault()
              event.stopPropagation()
              draggedRef.current = false
            }
          }}
        >
          <div className="certificate-gallery-glow" aria-hidden="true" />
          {[-2, -1, 1, 2].map((offset) => {
            const index = wrapIndex(selected + offset)
            const item = galleryItems[index]
            return (
              <button
                className={`certificate-float-card certificate-float-card-${offset < 0 ? 'left' : 'right'}-${Math.abs(offset)}`}
                key={`${offset}-${item.title}`}
                onClick={() => setSelected(index)}
                aria-label={`Show certificate: ${item.title}`}
                type="button"
              >
                <div className="certificate-float-media">
                  <CertificateArtwork certificate={item} thumbnail />
                </div>
                <span className="certificate-float-title">{item.title}</span>
                <span className="certificate-float-issuer">{item.issuer}</span>
              </button>
            )
          })}
          <article
            className="certificate-featured"
            key={certificate.title}
            aria-live="polite"
          >
            <button
              className="certificate-featured-media"
              type="button"
              onClick={(event) => openModal(event.currentTarget)}
              aria-label={`Open original certificate: ${certificate.title}`}
            >
              <CertificateArtwork certificate={certificate} eager />
              <span className="certificate-open-hint">
                View certificate <ExternalLink size={14} />
              </span>
            </button>
            <div className="certificate-featured-caption">
              <div>
                <span className="certificate-featured-counter">
                  {String(selected + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}
                </span>
                <h3><RunningLetters text={certificate.title} stage={0} /></h3>
                <p>
                  <span>{certificate.issuer}</span>
                  {certificate.year && <span>{certificate.year}</span>}
                </p>
              </div>
              <a
                className="certificate-verify-link"
                href={certificate.verificationUrl || certificate.url}
                target="_blank"
                rel="noreferrer"
              >
                Open original <ExternalLink size={14} />
              </a>
            </div>
          </article>
          <button className="certificate-gallery-control certificate-gallery-previous" onClick={previous} aria-label="Previous certificate" type="button">
            <ArrowLeft size={18} />
          </button>
          <button className="certificate-gallery-control certificate-gallery-next" onClick={next} aria-label="Next certificate" type="button">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      {modalOpen && (
        <div
          className="certificate-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setModalOpen(false)
          }}
        >
          <section
            className="certificate-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`${certificate.title} certificate`}
          >
            <header className="certificate-modal-header">
              <div>
                <span>{certificate.issuer}{certificate.year ? ` · ${certificate.year}` : ''}</span>
                <h2>{certificate.title}</h2>
              </div>
              <div className="certificate-modal-actions">
                {certificate.type !== 'online' && (
                  <>
                    <button onClick={() => setZoom((current) => Math.max(0.75, current - 0.25))} aria-label="Zoom out" type="button">
                      <ZoomOut size={17} />
                    </button>
                    <button onClick={() => setZoom((current) => Math.min(2, current + 0.25))} aria-label="Zoom in" type="button">
                      <ZoomIn size={17} />
                    </button>
                  </>
                )}
                <a href={certificate.verificationUrl || certificate.url} target="_blank" rel="noreferrer" aria-label="Open certificate in a new tab">
                  <ExternalLink size={17} />
                </a>
                <button ref={closeButtonRef} onClick={() => setModalOpen(false)} aria-label="Close certificate viewer" type="button">
                  <X size={19} />
                </button>
              </div>
            </header>
            <div className="certificate-modal-stage">
              {certificate.type === 'online' ? (
                <div className="certificate-modal-online">
                  <p>Open the issuer&apos;s certificate page to view this certificate.</p>
                  <a href={certificate.url} target="_blank" rel="noreferrer">View certificate <ExternalLink size={16} /></a>
                </div>
              ) : (
                <div className="certificate-modal-zoom" style={{ '--certificate-zoom': zoom }}>
                  <CertificateArtwork certificate={certificate} eager />
                </div>
              )}
            </div>
            <footer className="certificate-modal-footer">
              <button onClick={previous} type="button"><ArrowLeft size={16} /> Previous</button>
              <span>{String(selected + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}</span>
              <button onClick={next} type="button">Next <ArrowRight size={16} /></button>
            </footer>
          </section>
        </div>
      )}
    </section>
  )
}
