import { education, experience } from '../data/portfolio'
import PortfolioCard from './PortfolioCard'

const journey = [...experience, ...education]

export default function Experience() {
  return (
    <section className="certificates section experience-section" id="experience">
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
              <PortfolioCard
                title={title}
                organization={company}
                date={period}
                description={description}
                number={index + 1}
              />
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
