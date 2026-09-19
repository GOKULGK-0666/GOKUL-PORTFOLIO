import { useState } from 'react'
import { ExternalLink, PlayCircle, Sparkles } from 'lucide-react'

const projects = [
  {
    number: '01',
    title: 'CyberIntel',
    type: 'AI-Powered Full-Stack Cybersecurity Platform',
    description:
      'A final-year team capstone full-stack platform for AI-driven cybersecurity intelligence gathering, real-time threat monitoring, data visualization, and structured reporting, built with React, TypeScript, Node.js, and MongoDB.',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    color: 'coral',
    video: `${import.meta.env.BASE_URL}assets/project-videos/cyberintel.mp4`,
    sourceCode: 'https://github.com/GOKULGK-0666/Cyber-Intel.git',
  },
  {
    number: '02',
    title: 'Food E-Commerce Web Application',
    type: 'Personal Full-Stack Project',
    description:
      'A responsive food ordering platform with menu listings, cart functionality, clean state management, and RESTful APIs for core commerce features.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    color: 'blue',
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
    color: 'green',
    video: `${import.meta.env.BASE_URL}assets/project-videos/weather-app.mp4`,
    sourceCode: 'https://github.com/GOKULGK-0666/Weather-App.git',
  },
]

function ProjectVideo({ project }) {
  const [videoUnavailable, setVideoUnavailable] = useState(false)

  return (
    <div className={`project-visual ${project.color}`}>
      <span className="project-number">{project.number}</span>
      {videoUnavailable ? (
        <div className="video-empty">
          <PlayCircle size={34} />
          <span>Project video</span>
          <small>
            Add {project.video.split('/').pop()} to public/assets/project-videos
          </small>
        </div>
      ) : (
        <video
          className="project-video"
          src={project.video}
          controls
          preload="metadata"
          onError={() => setVideoUnavailable(true)}
        />
      )}
      <Sparkles className="sparkle" size={20} />
    </div>
  )
}

function Projects() {
  return (
    <section className="work section" id="work">
      <div className="section-heading">
        <div className="section-label">02 — Selected work</div>
        <p>Full-stack projects built with curiosity and purpose.</p>
      </div>
      <div className="project-list">
        {projects.map((project, index) => (
          <div className="project-step" key={project.number}>
            <article className={`project-card ${index % 2 ? 'reverse' : ''}`}>
              <ProjectVideo project={project} />
              <div className="project-info">
                <div>
                  <span className="project-type">{project.type}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="project-links">
                  <a
                    className="button button-dark project-source-link"
                    href={project.sourceCode}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Source code <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </article>
            {index < projects.length - 1 && (
              <div className="project-connector" aria-hidden="true">
                <span />
              </div>
            )}
          </div>
        ))}
      </div>
      <a
        className="projects-more view-more"
        href="https://github.com/GOKULGK-0666/GOKUL--PORTFOLIO"
        target="_blank"
        rel="noreferrer"
      >
        View portfolio source <ExternalLink size={14} />
      </a>
    </section>
  )
}

export default Projects
