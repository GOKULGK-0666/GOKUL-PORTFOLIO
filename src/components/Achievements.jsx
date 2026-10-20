import { achievements } from '../data/portfolio'
import PortfolioCard from './PortfolioCard'

export default function Achievements() {
  return (
    <section className="certificates section" id="achievements">
      <div className="section-label">04 — Achievements</div>
      <div className="experience-layout">
        <h2>
          Skills and
          <br />
          <em>milestones.</em>
        </h2>
        <div className="experience-timeline">
          {achievements.map(([title, organization, date, description], index) => (
            <div
              className={`experience-item ${index % 2 ? 'right' : 'left'}`}
              key={title}
            >
              <PortfolioCard
                title={title}
                organization={organization}
                date={date}
                description={description}
                number={index + 1}
              />
              <span className="experience-dot" aria-hidden="true" />
              {index < achievements.length - 1 && (
                <span className="experience-connector" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
