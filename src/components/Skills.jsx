import { useState } from 'react'
import {
  Braces,
  Cloud,
  Database,
  Globe,
  Layers,
  Server,
  Wrench,
} from 'lucide-react'

const categories = [
  {
    number: '01',
    name: 'Frontend Engineering',
    icon: Globe,
    items: [
      ['HTML5', 'Semantic, accessible page structure.'],
      ['CSS3', 'Responsive layouts with thoughtful visual detail.'],
      ['JavaScript', 'Interactive, maintainable web experiences.'],
      ['React.js', 'Scalable component-based interfaces.'],
      ['Bootstrap', 'Responsive UI components and utilities.'],
      ['Tailwind CSS', 'Fast, consistent utility-first styling.'],
    ],
  },
  {
    number: '02',
    name: 'Backend Architecture',
    icon: Server,
    items: [
      ['Node.js', 'Fast, scalable server-side applications.'],
      ['Express.js', 'Clean REST APIs and server features.'],
      ['REST APIs', 'Reliable communication between services.'],
    ],
  },
  {
    number: '03',
    name: 'Database & APIs',
    icon: Database,
    items: [
      ['MongoDB', 'Flexible NoSQL data solutions.'],
      ['Mongoose', 'Structured models and database workflows.'],
      ['API Integration', 'Connecting products to useful services.'],
    ],
  },
  {
    number: '04',
    name: 'DevOps & Tools',
    icon: Wrench,
    items: [
      ['Git', 'Confident version control and collaboration.'],
      ['GitHub', 'Team-based delivery and code review.'],
      ['VS Code', 'A focused environment for daily development.'],
      ['Postman', 'Testing and documenting API behaviour.'],
      ['npm', 'Managing reliable JavaScript dependencies.'],
    ],
  },
  {
    number: '05',
    name: 'AI & Modern Technology',
    icon: Cloud,
    items: [
      ['RAG', 'Grounding useful answers in trusted context.'],
      ['Vector Databases', 'Working with semantic data retrieval.'],
      ['Prompt Engineering', 'Designing clear, effective AI instructions.'],
    ],
  },
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section className="skills section" id="skills">
      <div className="section-label">06 — Technical arsenal</div>
      <div className="skills-intro">
        <div>
          <h2>
            Technical
            <br />
            <em>Arsenal.</em>
          </h2>
        </div>
        <p>
          Technologies, tools and capabilities I use to build modern digital
          experiences.
        </p>
      </div>

      <div className="arsenal-categories" role="tablist" aria-label="Skill categories">
        {categories.map((category, index) => {
          const Icon = category.icon
          const isActive = activeCategory === index
          return (
            <button
              className={`arsenal-category ${isActive ? 'is-active' : ''}`}
              key={category.name}
              onClick={() => setActiveCategory(index)}
              onMouseEnter={() => setActiveCategory(index)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`category-panel-${index}`}
            >
              <span className="arsenal-category-top">
                <span className="arsenal-number">{category.number}</span>
                <Icon size={18} strokeWidth={1.5} />
              </span>
              <strong>{category.name}</strong>
              <span className="arsenal-arrow" aria-hidden="true">
                ↗
              </span>
              <div className="arsenal-items" id={`category-panel-${index}`} role="tabpanel">
                {category.items.map(([itemName, detail]) => (
                  <span className="arsenal-item" key={itemName}>
                    <span className="arsenal-item-icon">
                      {itemName === 'React.js' ? <Braces size={14} /> : <Layers size={14} />}
                    </span>
                    <span>
                      <b>{itemName}</b>
                      <small>{detail}</small>
                    </span>
                  </span>
                ))}
              </div>
            </button>
          )
        })}
      </div>

    </section>
  )
}
