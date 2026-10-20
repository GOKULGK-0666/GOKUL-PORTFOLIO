import { Github, Linkedin, Mail } from 'lucide-react'
import { gmailComposeUrl } from '../utils/gmail'

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        G<span>.</span>S
      </div>
      <p>Designed &amp; built with intention.</p>
      <div className="socials">
        <a href="https://github.com/GOKULGK-0666" aria-label="GitHub">
          <Github size={18} />
        </a>
        <a href="https://www.linkedin.com/in/gokul006" aria-label="LinkedIn">
          <Linkedin size={18} />
        </a>
        <a
          href={gmailComposeUrl()}
          target="_blank"
          rel="noreferrer"
          aria-label="Email"
        >
          <Mail size={18} />
        </a>
      </div>
      <span className="copyright">© 2026 Gokul S</span>
    </footer>
  )
}
