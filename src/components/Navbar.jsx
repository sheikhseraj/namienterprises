import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'The Nami Standard', id: 'standard' },
  { label: 'Collections', id: 'collections' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Visit Us', id: 'visit' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'all 0.4s ease',
      background: scrolled ? 'rgba(253,249,244,0.97)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(196,154,60,0.2)' : 'none',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      boxShadow: scrolled ? '0 2px 20px rgba(44,18,0,0.08)' : 'none',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo — image only, no text */}
        <button onClick={() => scrollTo('hero')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}>
          <img
            src="/logo.png"
            alt="Nami Enterprises"
            style={{
              height: 62,
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: scrolled ? 'none' : 'brightness(0) invert(1)',
              transition: 'filter 0.4s ease',
            }}
          />
        </button>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden md:flex">
          {links.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: scrolled ? '#5C2800' : 'rgba(253,249,244,0.85)',
              transition: 'color 0.3s',
            }}
              onMouseEnter={e => e.target.style.color = '#C49A3C'}
              onMouseLeave={e => e.target.style.color = scrolled ? '#5C2800' : 'rgba(253,249,244,0.85)'}>
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('collections')} style={{
            background: '#2C1200', color: '#DDB968',
            border: '1px solid #C49A3C',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', padding: '10px 22px',
            cursor: 'pointer', transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.target.style.background = '#C49A3C'; e.target.style.color = '#2C1200' }}
            onMouseLeave={e => { e.target.style.background = '#2C1200'; e.target.style.color = '#DDB968' }}>
            Explore Range
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: scrolled ? '#2C1200' : '#FDF9F4' }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div style={{ background: '#FDF9F4', borderTop: '1px solid rgba(196,154,60,0.2)', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{
              textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5C2800',
            }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('collections')} style={{
            background: '#2C1200', color: '#DDB968', border: '1px solid #C49A3C',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
            padding: '12px', cursor: 'pointer',
          }}>
            Explore Range
          </button>
        </div>
      )}
    </nav>
  )
}
