import { Link, useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'The Nami Standard', id: 'standard' },
  { label: 'Collections', id: 'collections' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Visit Us', id: 'visit' },
]

export default function Footer() {
  const navigate = useNavigate()
  const scrollTo = (id) => {
    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-[#1A0A00] text-white">

      {/* Top CTA bar */}
      <div className="border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C49A3C] mb-1">Ready to step up?</p>
            <p className="text-white font-bold text-xl" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
              Explore Our Full Collection Today
            </p>
          </div>
          <Link to="/shop"
            className="bg-[#C49A3C] text-white text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-[#DDB968] transition-all flex-shrink-0"
            style={{ textDecoration: 'none' }}>
            Shop All Products →
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <div className="mb-4">
            <img
              src="/logo.png"
              alt="Nami Enterprises"
              style={{ height: 56, width: 'auto', objectFit: 'contain', display: 'block', marginBottom: 8, filter: 'brightness(0) invert(1)' }}
            />
            <span className="text-[9px] tracking-[0.3em] text-gray-500 uppercase">Born In Delhi. Built For India.</span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
            Premium footwear crafted for the Indian terrain. Style, durability, and comfort — delivered to your doorstep.
          </p>
          {/* Social icons */}
          <div className="flex gap-3 mt-6">
            {[
              { href: '#', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
              { href: '#', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.56v14.91C24 21.98 21.98 24 19.44 24H4.56C2.02 24 0 21.98 0 19.44V4.56C0 2.02 2.02 0 4.56 0h14.88C21.98 0 24 2.02 24 4.56zM9 19V9H6v10h3zM7.5 7.5A1.5 1.5 0 1 0 7.5 4.5 1.5 1.5 0 0 0 7.5 7.5zM19 19v-5.5c0-2.5-1-3.5-2.5-3.5-1.2 0-1.9.7-2.5 1.5V9h-3v10h3v-5c0-.6.5-1 1-1s1 .4 1 1v5h3z"/></svg> },
              { href: '#', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
            ].map((s, i) => (
              <a key={i} href={s.href}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#C49A3C] hover:border-[#C49A3C] hover:text-white transition-all">
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div>
          <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 mb-5">Navigation</h4>
          <ul className="space-y-3">
            <li>
              <Link to="/shop" className="text-xs text-[#C49A3C] hover:text-[#DDB968] transition-colors tracking-wide font-bold" style={{ textDecoration: 'none' }}>
                🛍 Shop All Products
              </Link>
            </li>
            {navLinks.map(l => (
              <li key={l.id}>
                <button onClick={() => scrollTo(l.id)}
                  className="text-xs text-gray-400 hover:text-[#C49A3C] transition-colors tracking-wide">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 mb-5">Contact</h4>
          <div className="space-y-3 text-xs text-gray-400">
            <p>H-679A, Jaitpur Extension Part 2,<br />Badarpur, New Delhi 110044</p>
            <p><a href="tel:+918607232326" className="hover:text-[#C49A3C] transition-colors">+91 86072 32326</a></p>
            <p><a href="mailto:info.namienterprises@gmail.com" className="hover:text-[#C49A3C] transition-colors break-all">info.namienterprises@gmail.com</a></p>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-gray-600">© {new Date().getFullYear()} Nami Enterprises. All rights reserved.</p>
          <p className="text-[10px] text-gray-600">namienterprises.in</p>
        </div>
      </div>

    </footer>
  )
}
