import { ArrowUpRight, Download, FileText } from 'lucide-react'

export default function Resume() {
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`
  return (
    <section className="resume section" id="resume">
      <div className="section-label">06 — Resume</div>
      <div className="resume-layout">
        <div>
          <h2>
            A clear
            <br />
            <em>next step.</em>
          </h2>
          <p className="resume-copy">
            A concise overview of my experience, skills, education, and
            full-stack projects.
          </p>
        </div>
        <div className="resume-card">
          <FileText size={30} />
          <div>
            <h3>Gokul S — MERN Stack Developer</h3>
            <p>Updated September 2026 · PDF format</p>
          </div>
          <a
            className="button button-dark"
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open resume <ArrowUpRight size={16} />
          </a>
          <a className="resume-download" href={resumeUrl} download>
            <Download size={15} /> Download PDF
          </a>
        </div>
      </div>
    </section>
  )
}
