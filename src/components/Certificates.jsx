import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { certificates } from '../data/portfolio'

const certificateDetails = certificates.map(([title, issuer, year, url]) => ({
  title,
  issuer,
  year,
  url,
  category: title.toLowerCase().includes('ai') || title.toLowerCase().includes('prompt')
    ? 'Artificial Intelligence'
    : title.toLowerCase().includes('web') || title.toLowerCase().includes('javascript')
      ? 'Frontend Development'
      : title.toLowerCase().includes('database') || title.toLowerCase().includes('sql')
        ? 'Database & APIs'
        : 'Professional Development',
}))

export default function Certificates() {
  const [selected, setSelected] = useState(0)
  const certificate = certificateDetails[selected]

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') setSelected((current) => (current + 1) % certificateDetails.length)
      if (event.key === 'ArrowLeft') {
        setSelected((current) => (current - 1 + certificateDetails.length) % certificateDetails.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <section className="certificates section" id="certificates">
      <div className="section-label">04 — Certifications</div>
      <div className="certificates-heading">
        <h2>
          Always
          <br />
          <em>learning.</em>
        </h2>
        <p>Continuous learning, practical knowledge and professional growth.</p>
      </div>
      <div className="certificate-explorer">
        <div className="certificate-list" role="tablist" aria-label="Certificates">
          {certificateDetails.map((item, index) => (
            <button
              className={`certificate-item ${selected === index ? 'is-selected' : ''}`}
              key={item.title}
              onClick={() => setSelected(index)}
              role="tab"
              aria-selected={selected === index}
            >
              <span className="certificate-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="certificate-item-copy">
                <strong>{item.title}</strong>
                <small>{item.issuer}</small>
              </span>
              <span className="certificate-item-year">{item.year}</span>
            </button>
          ))}
        </div>
        <article className="certificate-preview" key={certificate.title} role="tabpanel">
          <div className="certificate-preview-top">
            <span>{certificate.category}</span>
            <span>{String(selected + 1).padStart(2, '0')} / {String(certificateDetails.length).padStart(2, '0')}</span>
          </div>
          <div className="certificate-paper">
            <span className="certificate-paper-mark">GS<span>.</span></span>
            <div className="certificate-paper-content">
              <span>Certificate of achievement</span>
              <h3>{certificate.title}</h3>
              <p>Issued by {certificate.issuer}</p>
              <strong>{certificate.year}</strong>
            </div>
            <div className="certificate-paper-line" />
            <small>Verified learning record</small>
          </div>
          <div className="certificate-preview-actions">
            <a href={certificate.url} target="_blank" rel="noreferrer" className="button button-dark">
              View certificate <ExternalLink size={14} />
            </a>
            <div className="certificate-controls">
              <button onClick={() => setSelected((selected - 1 + certificateDetails.length) % certificateDetails.length)} aria-label="Previous certificate">
                <ArrowLeft size={16} />
              </button>
              <button onClick={() => setSelected((selected + 1) % certificateDetails.length)} aria-label="Next certificate">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
