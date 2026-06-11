import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const BROWN = '#2C1200'
const GOLD  = '#C49A3C'
const GOLDT = '#DDB968'

export default function Hero() {
  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', background: BROWN, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>

      {/* Subtle texture overlays */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Warm amber glow top-right */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '55%', height: '100%', background: `radial-gradient(ellipse at top right, ${GOLD}18, transparent 65%)` }} />
        {/* Gold line left */}
        <div style={{ position: 'absolute', bottom: 0, left: 60, width: 1, height: '65%', background: `linear-gradient(to top, ${GOLD}60, transparent)` }} />
        {/* Soft warm floor glow */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: `linear-gradient(to top, ${BROWN}ff, transparent)` }} />
      </div>

      {/* Giant watermark */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden', userSelect: 'none' }}>
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20vw', color: 'rgba(196,154,60,0.04)', lineHeight: 1, letterSpacing: '-0.02em' }}>NAMI</span>
      </div>

      {/* Hero image — shoe product */}
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '52%', overflow: 'hidden' }}>
        <img src="/assets/hero.png" alt="Premium footwear"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.55,
            maskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
          }}
          onError={e => e.target.style.display = 'none'}
        />
        {/* Extra left fade on image */}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${BROWN} 0%, transparent 35%)` }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 40px 80px', paddingTop: 130, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'flex-end' }}>

        <div>
          {/* Label */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ height: 1, width: 36, background: GOLD }} />
            <span style={{ color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase' }}>
              Redefining Footwear In India
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(58px,9vw,128px)', lineHeight: 0.92, color: '#FDF9F4', margin: '0 0 24px', letterSpacing: '0.01em' }}>
            Crafted<br />
            For The<br />
            <span style={{ color: GOLD, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 600, fontSize: '0.78em' }}>
              Indian Terrain.
            </span>
          </motion.h1>

          {/* Divider */}
          <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.6, delay: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, transformOrigin: 'left' }}>
            <div style={{ height: 1, width: 48, background: `${GOLD}60` }} />
            <div style={{ width: 5, height: 5, background: GOLD, transform: 'rotate(45deg)' }} />
            <div style={{ height: 1, flex: 1, maxWidth: 80, background: `${GOLD}30` }} />
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }}
            style={{ color: 'rgba(253,249,244,0.55)', fontSize: 14, lineHeight: 1.75, maxWidth: 340, marginBottom: 40 }}>
            From the meticulous selection of raw materials to the final stitch, Nami Enterprises crafts premium footwear designed exclusively for the Indian terrain. Style, durability, and comfort — delivered.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <button
              onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: GOLD, color: BROWN, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '14px 28px', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background = GOLDT}
              onMouseLeave={e => e.currentTarget.style.background = GOLD}>
              Shop Latest Arrivals <ArrowRight size={13} />
            </button>
            <button
              onClick={() => document.getElementById('standard')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(253,249,244,0.55)', background: 'transparent', border: '1px solid rgba(196,154,60,0.35)', padding: '14px 28px', cursor: 'pointer', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.color = GOLDT; e.currentTarget.style.borderColor = GOLDT }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(253,249,244,0.55)'; e.currentTarget.style.borderColor = 'rgba(196,154,60,0.35)' }}>
              Discover Our Craft
            </button>
          </motion.div>
        </div>

        {/* Right — stats */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-end', paddingBottom: 16 }}
          className="hidden lg:flex">
          {[['100%', 'Made In India'], ['5000+', 'Happy Customers'], ['50+', 'Styles & Collections']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'right', borderRight: `2px solid ${GOLD}50`, paddingRight: 24 }}>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3.2rem', color: '#FDF9F4', lineHeight: 1, marginBottom: 4 }}>{num}</div>
              <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: `${GOLD}90` }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.4 }}>
        <div style={{ width: 1, height: 40, background: GOLD, animation: 'pulse 2s infinite' }} />
        <span style={{ color: '#FDF9F4', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase' }}>Scroll</span>
      </div>
    </section>
  )
}
