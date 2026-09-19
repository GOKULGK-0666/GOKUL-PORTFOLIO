import { education, experience } from '../data/portfolio'

const journey = [...experience, ...education]

export default function Experience() {
  return (
    <section className="certificates section" id="experience">
      <div className="section-label">03 — Experience & education</div>
      <div className="experience-layout">
        <h2>
          Growing
          <br />
          <em>through practice.</em>
        </h2>
        <div className="experience-timeline">
          {journey.map(([title, company, period, description], index) => (
            <div
              className={`experience-item ${index % 2 ? 'right' : 'left'}`}
              key={title}
            >
              <article className="experience-card">
                <span className="experience-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <span className="experience-period">{period}</span>
                  <h3>{title}</h3>
                  <p className="experience-company">{company}</p>
                  <p>{description}</p>
                </div>
              </article>
              <span className="experience-dot" aria-hidden="true" />
              {index < journey.length - 1 && (
                <span className="experience-connector" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
