import { useState } from 'react'
import { ArrowUpRight, Send } from 'lucide-react'
import { gmailComposeUrl } from '../utils/gmail'

export default function Contact() {
  const [isOpeningGmail, setIsOpeningGmail] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const submitContact = (event) => {
    event.preventDefault()
    setIsOpeningGmail(true)

    const subject = `Portfolio enquiry from ${form.name}`
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    window.location.assign(gmailComposeUrl(subject, body))
  }

  const updateFormField = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  return (
    <section className="contact section" id="contact">
      <div className="contact-intro">
        <div className="section-label">08 — Contact</div>
        <h2>
          Let&apos;s build
          <br />
          <em>something useful.</em>
        </h2>
        <p>
          Have a project, role, or idea in mind? I&apos;d love to hear about it.
        </p>
        <a
          href={gmailComposeUrl()}
          target="_blank"
          rel="noreferrer"
          className="email-link"
        >
          Email me via Gmail <ArrowUpRight size={18} />
        </a>
        <a href="tel:+919500483963" className="email-link">
          +91 9500483963 <ArrowUpRight size={18} />
        </a>
      </div>
      <form className="contact-form" onSubmit={submitContact}>
        <label>
          Your name
          <input
            name="name"
            required
            value={form.name}
            onChange={updateFormField}
            placeholder="Gokul S"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            required
            type="email"
            value={form.email}
            onChange={updateFormField}
            placeholder="you@example.com"
          />
        </label>
        <label>
          Tell me about it
          <textarea
            name="message"
            required
            rows="3"
            value={form.message}
            onChange={updateFormField}
            placeholder="A few words about your project..."
          />
        </label>
        <button className="button button-dark" type="submit" disabled={isOpeningGmail}>
          {isOpeningGmail ? 'Opening Gmail…' : (
            <>
              <Send size={16} /> Send message
            </>
          )}
        </button>
      </form>
    </section>
  )
}
