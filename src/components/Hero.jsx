import {
  FileText,
  Github,
  Instagram,
  Linkedin,
  MoveUpRight,
} from 'lucide-react'
import { useRef } from 'react'
import AnimatedLetters from './AnimatedLetters'

export default function Hero() {
  const portraitMotionRef = useRef(null)

  const handlePortraitMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    portraitMotionRef.current?.style.setProperty('--tilt-x', `${y * -2.5}deg`)
    portraitMotionRef.current?.style.setProperty('--tilt-y', `${x * 2.5}deg`)
  }

  const resetPortraitTilt = () => {
    portraitMotionRef.current?.style.setProperty('--tilt-x', '0deg')
    portraitMotionRef.current?.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <section className="hero section" id="home">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" /> Available for project work ·
        </div>
        <p className="hero-name hero-reveal">
          <AnimatedLetters text="HELLO, I'M" />
        </p>
        <h1 className="hero-reveal">
          <span className="hero-title-letters hero-name-main">
            <AnimatedLetters text="GOKUL S" />
          </span>
          <br />
          <em className="hero-role">
            <AnimatedLetters text="MERN Stack Developer." />
          </em>
        </h1>
        <p className="hero-intro hero-reveal">
          <AnimatedLetters text="MERN Stack Developer with a Computer Science degree and hands-on experience building responsive, scalable web applications." />
        </p>
        <div className="hero-actions hero-reveal">
          <a href="#work" className="button button-dark">
            Explore my work <MoveUpRight size={17} />
          </a>
          <a href="#contact" className="text-link">
            Get in touch <span>↗</span>
          </a>
        </div>
        <div className="hero-socials" aria-label="Social links">
          <a
            href="https://github.com/GOKULGK-0666"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/gokul006"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={17} /> LinkedIn
          </a>
          <a
            href="https://www.instagram.com/just_misuhh/"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={17} /> Instagram
          </a>
          <a href="#resume" className="resume-link">
            <FileText size={16} /> View resume
          </a>
        </div>
      </div>
      <div className="hero-art" aria-label="Profile photo section">
        <div
          className="portrait-motion"
          ref={portraitMotionRef}
          onMouseMove={handlePortraitMove}
          onMouseLeave={resetPortraitTilt}
        >
          <div className="portrait-frame">
            <img
              className="portrait-photo"
              src={`${import.meta.env.BASE_URL}assets/profile-photo.jpeg`}
              alt="Gokul S profile"
            />
            <div className="portrait-caption">
              Gokul S<br />
              <small>Developer / maker</small>
            </div>
          </div>
        </div>
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="art-note">
          <strong>2+</strong>
          <br />
          <span>years experience</span>
        </div>
      </div>
      <div className="scroll-cue">
        Scroll to explore <span>↓</span>
      </div>
    </section>
  )
}
