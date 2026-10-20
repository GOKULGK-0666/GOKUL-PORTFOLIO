export default function RunningLetters({ text, stage = 0 }) {
  return (
    <span className="experience-running-text" aria-label={text}>
      {Array.from(text).map((letter, index) => (
        <span
          aria-hidden="true"
          className="experience-running-letter"
          key={`${letter}-${index}`}
          style={{ '--letter-index': index, '--text-stage': stage }}
        >
          {letter === ' ' ? '\u00a0' : letter}
        </span>
      ))}
    </span>
  )
}
