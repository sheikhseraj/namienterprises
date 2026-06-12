import { useState, useEffect, useRef } from 'react'
import { Menu, X, Search, Heart, ShoppingBag } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import WishlistDrawer from './WishlistDrawer'

const links = [
  { label: 'The Nami Standard', id: 'standard' },
  { label: 'Collections',       id: 'collections' },
  { label: 'Testimonials',      id: 'testimonials' },
  { label: 'Visit Us',          id: 'visit' },
]

export default function Navbar() {
  const [open, setOpen]             = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal]   = useState('')
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const searchRef                   = useRef(null)
  const navigate                    = useNavigate()
  const location                    = useLocation()
  const { wishlist }                = useWishlist()
  const isHome                      = location.pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  const scrollTo = (id) => {
    if (!isHome) {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchVal.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchVal.trim())}`)
      setSearchVal('')
      setSearchOpen(false)
    }
  }

  const isDark = isHome && !scrolled

  const navBg    = scrolled || !isHome ? 'rgba(253,249,244,0.97)' : 'transparent'
  const linkCol  = isDark ? 'rgba(253,249,244,0.85)' : '#5C2800'
  const iconCol  = isDark ? '#FDF9F4' : '#2C1200'

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.4s ease',
        background: navBg,
        borderBottom: scrolled || !isHome ? '1px solid rgba(196,154,60,0.2)' : 'none',
        backdropFilter: scrolled || !isHome ? 'blur(12px)' : 'none',
        boxShadow: scrolled || !isHome ? '0 2px 20px rgba(44,18,0,0.08)' : 'none',
      }}>
        <div className="navbar-inner">

          {/* Logo */}
          <Link to="/" style={{ lineHeight: 0, display: 'block', flexShrink: 0 }}>
            <img src="/logo.png" alt="Nami Enterprises"
              className="navbar-logo"
              style={{
                width: 'auto', objectFit: 'contain', display: 'block',
                filter: isDark ? 'brightness(0) invert(1)' : 'none',
                transition: 'filter 0.4s ease',
              }}
            />
          </Link>

          {/* Desktop links */}
          <div className="navbar-desktop-links">
            {links.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: linkCol, transition: 'color 0.3s',
              }}
                onMouseEnter={e => e.target.style.color = '#C49A3C'}
                onMouseLeave={e => e.target.style.color = linkCol}>
                {l.label}
              </button>
            ))}

            {/* Shop link */}
            <Link to="/shop" style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#C49A3C', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <ShoppingBag size={13} /> Shop All
            </Link>

            {/* Search icon */}
            <button onClick={() => setSearchOpen(s => !s)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: iconCol, display: 'flex' }}>
              <Search size={18} />
            </button>

            {/* Wishlist icon */}
            <button onClick={() => setWishlistOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: iconCol, position: 'relative', display: 'flex' }}>
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute', top: -6, right: -6,
                  background: '#ef4444', color: 'white',
                  fontSize: 9, fontWeight: 700, width: 16, height: 16,
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Explore CTA */}
            <Link to="/shop" style={{
              background: '#2C1200', color: '#DDB968',
              border: '1px solid #C49A3C',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', padding: '10px 20px',
              cursor: 'pointer', textDecoration: 'none',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C49A3C'; e.currentTarget.style.color = '#2C1200' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#2C1200'; e.currentTarget.style.color = '#DDB968' }}>
              Explore Range
            </Link>
          </div>

          {/* Mobile right icons */}
          <div className="navbar-mobile-icons">
            <button onClick={() => setSearchOpen(s => !s)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: iconCol }}>
              <Search size={20} />
            </button>
            <button onClick={() => setWishlistOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: iconCol, position: 'relative' }}>
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute', top: -6, right: -6,
                  background: '#ef4444', color: 'white',
                  fontSize: 9, fontWeight: 700, width: 16, height: 16,
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {wishlist.length}
                </span>
              )}
            </button>
            <button onClick={() => setOpen(!open)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: iconCol }}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search bar dropdown */}
        {searchOpen && (
          <div style={{ background: 'white', borderTop: '1px solid rgba(196,154,60,0.2)', padding: '12px 24px' }}>
            <form onSubmit={handleSearch} style={{ maxWidth: 600, margin: '0 auto', display: 'flex', gap: 8 }}>
              <input
                ref={searchRef}
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search for shoes, sandals, ethnic wear..."
                style={{ flex: 1, padding: '10px 16px', border: '1.5px solid #C49A3C', borderRadius: 8, fontSize: 14, outline: 'none' }}
              />
              <button type="submit"
                style={{ background: '#2C1200', color: '#DDB968', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
                Search
              </button>
              <button type="button" onClick={() => setSearchOpen(false)}
                style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', color: '#6b7280' }}>
                <X size={16} />
              </button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
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
            <Link to="/shop" onClick={() => setOpen(false)} style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#C49A3C', textDecoration: 'none',
            }}>
              🛍 Shop All Products
            </Link>
            <Link to="/shop" onClick={() => setOpen(false)} style={{
              background: '#2C1200', color: '#DDB968', border: '1px solid #C49A3C',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              padding: '12px', cursor: 'pointer', textDecoration: 'none', textAlign: 'center',
            }}>
              Explore Range
            </Link>
          </div>
        )}
      </nav>

      {/* Wishlist drawer */}
      <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  )
}
