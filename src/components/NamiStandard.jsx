import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const pillars = [
  {
    num: '01',
    title: 'Premium Materials',
    desc: 'We source high-grade leathers, resilient rubber, and breathable meshes. Your footwear is built to withstand extreme weather and rough usage without losing its aesthetic appeal.',
    icon: '◈',
  },
  {
    num: '02',
    title: 'Ergonomic Comfort',
    desc: 'Featuring engineered arch support, cushioned insoles, and shock-absorbing outsoles. Step into a world where long hours on your feet no longer result in fatigue.',
    icon: '◉',
  },
  {
    num: '03',
    title: 'Trendsetting Designs',
    desc: 'Our in-house design team constantly analyses global fashion trends to bring you modern, elegant silhouettes that make a statement in both corporate and casual settings.',
    icon: '◇',
  },
]

export default function NamiStandard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="standard" style={{ padding: '96px 0', background: '#FDF9F4' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ height: 1, width: 32, background: '#C49A3C' }} />
            <span style={{ color: '#C49A3C', fontSize: 10, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase' }}>The Nami Standard</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px,6vw,80px)', lineHeight: 1, color: '#2C1200', margin: 0 }}>
              Why Settle For Less?
            </h2>
            <p style={{ color: '#7a5c3a', fontSize: 14, lineHeight: 1.7, maxWidth: 340, margin: 0 }}>
              We don't just assemble shoes; we engineer them. Our commitment to craftsmanship ensures that every pair supports your daily journey seamlessly.
            </p>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(196,154,60,0.15)' }} className="md:grid-cols-3 grid-cols-1">
          {pillars.map((p, i) => (
            <motion.div key={p.num}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              className="group"
              style={{ background: '#FDF9F4', padding: 40, cursor: 'default', transition: 'background 0.5s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#2C1200'}
              onMouseLeave={e => e.currentTarget.style.background = '#FDF9F4'}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
                <span style={{ color: '#C49A3C', fontSize: 10, fontWeight: 700, letterSpacing: '0.3em' }}>{p.num}</span>
                <span style={{ fontSize: 28, color: 'rgba(196,154,60,0.25)', transition: 'color 0.4s' }} className="group-hover-icon">{p.icon}</span>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#2C1200', marginBottom: 10, transition: 'color 0.4s' }} className="pillar-title">{p.title}</h3>
              <p style={{ fontSize: 13, color: '#7a5c3a', lineHeight: 1.7, transition: 'color 0.4s', margin: 0 }} className="pillar-desc">{p.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
