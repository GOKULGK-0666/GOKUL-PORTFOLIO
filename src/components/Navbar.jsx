import { ArrowUpRight, Menu, X } from 'lucide-react'

const links = [
  'about',
  'work',
  'experience',
  'achievements',
  'certificates',
  'resume',
  'skills',
  'contact',
]

export default function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <header className="nav-wrap">
      <a href="#home" className="logo" aria-label="Gokul S home">
        G<span>.</span>S
      </a>
      <nav id="primary-navigation" className={menuOpen ? 'nav-links open' : 'nav-links'}>
        {links.map((item) => (
          <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>
            {item}
          </a>
        ))}
      </nav>
      <a className="nav-cta" href="#contact">
        Let&apos;s talk <ArrowUpRight size={15} />
      </a>
      <button
        className="menu-toggle"
        type="button"
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  )
}
