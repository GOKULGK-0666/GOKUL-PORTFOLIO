import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  RotateCcw,
  RotateCw,
} from 'lucide-react'

const projects = [
   {
    number: '01',
    title: 'CyberIntel',
    type: 'AI-Powered Full-Stack Cybersecurity Platform',
    description:
      'A final-year team capstone full-stack platform for AI-driven cybersecurity intelligence gathering, real-time threat monitoring, data visualization, and structured reporting, built with React, TypeScript, Node.js, and MongoDB.',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    features: [
      'AI-driven cybersecurity intelligence gathering',
      'Real-time threat monitoring',
      'Data visualization',
      'Structured reporting',
    ],
    role: 'Final-year team capstone; individual responsibilities are not specified in the existing portfolio.',
    video: `${import.meta.env.BASE_URL}assets/project-videos/cyberintel.mp4`,
    sourceCode: 'https://github.com/GOKULGK-0666/Cyber-Intel.git',
  },
 
  {
    number: '02',
    title: 'E-commerce Website',
    type: 'Personal Full-Stack Project',
    description:
      'A responsive food ordering platform with menu listings, cart functionality, clean state management, and RESTful APIs for core commerce features.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    features: [
      'Menu listings',
      'Cart functionality',
      'Clean state management',
      'RESTful APIs for core commerce features',
    ],
    role: 'Personal full-stack project.',
    video: `${import.meta.env.BASE_URL}assets/project-videos/e-commerce.mp4`,
    sourceCode: 'https://github.com/GOKULGK-0666/E-commerce-.git',
  },
  {
    number: '03',
    title: 'Weather App',
    type: 'TypeScript Weather Application',
    description:
      'A responsive weather application built with TypeScript that presents current conditions and forecast information through a clean, focused interface.',
    tags: ['TypeScript', 'React', 'API Integration', 'CSS3'],
    features: ['Current conditions', 'Forecast information', 'Responsive interface'],
    video: `${import.meta.env.BASE_URL}assets/project-videos/weather-app.mp4`,
    sourceCode: 'https://github.com/GOKULGK-0666/Weather-App.git',
  },
  
]

function ProjectPreview({ project, isActive, isPlaying, reducedMotion }) {
  const videoRef = useRef(null)
  const [unavailable, setUnavailable] = useState(false)

  useEffect(() => {
    if (!isPlaying) videoRef.current?.pause()
  }, [isPlaying])

  if (!project.video || unavailable) {
    return (
      <div className="project-carousel-preview-unavailable">
        <span className="project-carousel-preview-index">{project.number}</span>
        <span className="project-carousel-preview-title">{project.title}</span>
        <span className="project-carousel-preview-note">Project preview unavailable</span>
      </div>
    )
  }

  return (
    <video
      ref={videoRef}
      className="project-carousel-preview-video"
      src={project.video}
      autoPlay={isActive && isPlaying && !reducedMotion}
      loop
      muted
      playsInline
      controls={isActive && reducedMotion}
      preload={isActive ? 'metadata' : 'none'}
      aria-label={`${project.title} project preview`}
      onError={(event) => {
        if (event.currentTarget.error?.code !== 1) setUnavailable(true)
      }}
    />
  )
}

function CarouselCard({ project, position, isFlipped, onFlip, onSelect, reducedMotion }) {
  const frontFaceRef = useRef(null)
  const flipBackRef = useRef(null)
  const previousFlipState = useRef(isFlipped)
  const touchStartRef = useRef(null)
  const suppressClickRef = useRef(false)
  const isActive = position === 'active'
  const isSide = position === 'previous' || position === 'next'
  const showCard = isActive || isSide

  const handlePointerDown = (event) => {
    if (event.pointerType === 'touch') {
      touchStartRef.current = { x: event.clientX, y: event.clientY }
    }
  }

  const handlePointerUp = (event) => {
    const start = touchStartRef.current
    touchStartRef.current = null
    if (event.pointerType !== 'touch' || !start) return

    const moved = Math.hypot(event.clientX - start.x, event.clientY - start.y)
    if (moved > 12) return

    event.preventDefault()
    suppressClickRef.current = true
    window.setTimeout(() => {
      suppressClickRef.current = false
    }, 500)
    onFlip()
  }

  const handleFrontClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }
    onFlip()
  }

  useEffect(() => {
    if (previousFlipState.current !== isFlipped) {
      if (isFlipped) flipBackRef.current?.focus()
      else frontFaceRef.current?.focus()
      previousFlipState.current = isFlipped
    }
  }, [isFlipped])

  return (
    <article
      className={`project-carousel-item project-carousel-item-${position}`}
      aria-hidden={!showCard}
      data-project={project.number}
    >
      {isActive ? (
        <div className={`project-flip-card${isFlipped ? ' is-flipped' : ''}`}>
          <div className="project-flip-inner">
            <section
              className="project-card-face project-card-front"
              ref={frontFaceRef}
              aria-hidden={isFlipped}
              aria-label={`Flip ${project.title} card to explore project details`}
              role="button"
              tabIndex={isFlipped ? -1 : 0}
              onClick={handleFrontClick}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => {
                touchStartRef.current = null
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onFlip()
                }
              }}
            >
              <div className="project-card-media">
                <ProjectPreview
                  project={project}
                  isActive
                  isPlaying={!isFlipped}
                  reducedMotion={reducedMotion}
                />
                <span className="project-card-number">PROJECT {project.number}</span>
              </div>
              <div className="project-front-copy">
                <span className="project-carousel-category">{project.type}</span>
                <h3>{project.title}</h3>
                <span className="project-flip-prompt" aria-hidden="true">
                  <RotateCw size={15} aria-hidden="true" />
                  <span>Tap to explore</span>
                </span>
              </div>
            </section>

            <section className="project-card-face project-card-back" aria-hidden={!isFlipped}>
              <div className="project-back-topline">
                <span>PROJECT {project.number} / DETAILS</span>
                <button
                  className="project-flip-back"
                  ref={flipBackRef}
                  type="button"
                  tabIndex={isFlipped ? 0 : -1}
                  onClick={onFlip}
                  aria-label={`Flip back to ${project.title} preview`}
                >
                  <RotateCcw size={17} aria-hidden="true" />
                  <span>Back</span>
                </button>
              </div>
              <div className="project-back-content">
                <span className="project-carousel-category">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <h4>Technologies</h4>
                {project.tags.length > 0 ? (
                  <div className="project-carousel-tags">
                    {project.tags.map((tag, index) => (
                      <span key={`${tag}-${isFlipped}`} style={{ '--badge-index': index }}>{tag}</span>
                    ))}
                  </div>
                ) : (
                  <p className="project-unavailable-note">Technology details are not listed on the existing portfolio.</p>
                )}

                <h4>Key features</h4>
                {project.features.length > 0 ? (
                  <ul className="project-feature-list">
                    {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                ) : (
                  <p className="project-unavailable-note">Feature details are not listed on the existing portfolio.</p>
                )}

                {project.role && (
                  <>
                    <h4>Contribution</h4>
                    <p>{project.role}</p>
                  </>
                )}
              </div>
              <div className="project-back-actions">
                {project.demo ? (
                  <a className="project-demo-link" href={project.demo} target="_blank" rel="noreferrer" tabIndex={isFlipped ? 0 : -1}>
                    Live Demo <ExternalLink size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="project-unavailable-action" aria-label="Live demo unavailable">Live Demo unavailable</span>
                )}
                {project.sourceCode ? (
                  <a className="project-source-link" href={project.sourceCode} target="_blank" rel="noreferrer" tabIndex={isFlipped ? 0 : -1}>
                    <Github size={15} aria-hidden="true" /> Source Code <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="project-unavailable-action" aria-label="Source code unavailable">Source Code unavailable</span>
                )}
              </div>
            </section>
          </div>
        </div>
      ) : (
        <button
          className="project-side-preview"
          type="button"
          onClick={onSelect}
          aria-label={`Show project ${project.number}: ${project.title}`}
          tabIndex={showCard ? 0 : -1}
        >
          <div className="project-card-media">
            <ProjectPreview
              project={project}
              isActive={false}
              isPlaying={false}
              reducedMotion={reducedMotion}
            />
            <span className="project-card-number">PROJECT {project.number}</span>
          </div>
          <span className="project-side-title">{project.title}</span>
          <span className="project-side-category">{project.type}</span>
        </button>
      )}
    </article>
  )
}

function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches)
    updateMotionPreference()
    motionPreference.addEventListener('change', updateMotionPreference)
    return () => motionPreference.removeEventListener('change', updateMotionPreference)
  }, [])

  const selectProject = (index) => {
    setActiveIndex((index + projects.length) % projects.length)
    setIsFlipped(false)
  }

  const navigate = (direction) => selectProject(activeIndex + direction)

  const handleKeyDown = (event) => {
    if (event.target.closest('a')) return
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      navigate(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      navigate(1)
    }
  }

  const activeProject = projects[activeIndex]

  return (
    <section
      className="work section project-launch-section project-carousel-section"
      id="work"
      onKeyDown={handleKeyDown}
      aria-roledescription="carousel"
      aria-label="Selected projects"
    >
      <div className="project-carousel-heading">
        <div>
          <div className="section-label">SELECTED WORKS / 2026</div>
          <h2>Projects <span>in focus.</span></h2>
          <p>A closer look at selected work, the tools behind it, and the details that bring each idea to life.</p>
        </div>
        <div className="project-carousel-count" aria-live="polite" aria-atomic="true">
          <span>{String(activeIndex + 1).padStart(2, '0')}</span>
          <span>/ {String(projects.length).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="project-carousel-stage">
        <div className="project-carousel-cards" aria-live="polite" aria-atomic="false">
          {projects.map((project, index) => {
            const offset = (index - activeIndex + projects.length) % projects.length
            const wrappedOffset = offset > projects.length / 2 ? offset - projects.length : offset
            const position = wrappedOffset === 0
              ? 'active'
              : wrappedOffset === -1
                ? 'previous'
                : wrappedOffset === 1
                  ? 'next'
                  : 'hidden'

            return (
              <CarouselCard
                key={project.number}
                project={project}
                position={position}
                isFlipped={isFlipped && position === 'active'}
                onFlip={() => setIsFlipped((flipped) => !flipped)}
                onSelect={() => selectProject(index)}
                reducedMotion={reducedMotion}
              />
            )
          })}
        </div>

        <button
          className="project-carousel-arrow project-carousel-arrow-previous"
          type="button"
          aria-label="Previous project"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={19} aria-hidden="true" />
        </button>
        <button
          className="project-carousel-arrow project-carousel-arrow-next"
          type="button"
          aria-label="Next project"
          onClick={() => navigate(1)}
        >
          <ArrowRight size={19} aria-hidden="true" />
        </button>
      </div>

      <div className="project-carousel-footer">
        <span className="project-carousel-current" aria-live="polite">{activeProject.title}</span>
        <div className="project-carousel-pagination" aria-label="Choose a project">
          {projects.map((project, index) => (
            <button
              key={project.number}
              className={index === activeIndex ? 'is-active' : ''}
              type="button"
              aria-label={`Show project ${index + 1}: ${project.title}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => selectProject(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
