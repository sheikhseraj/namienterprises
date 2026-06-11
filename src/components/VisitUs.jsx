import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink } from 'lucide-react'

const contactItems = [
  {
    Icon: MapPin,
    label: 'Retail Experience Center',
    value: 'H-679A, Jaitpur Extension Part 2,\nBadarpur, New Delhi 110044',
    sub: 'Landmark: Near Grand Cafe',
    color: '#C49A3C',
  },
  {
    Icon: Phone,
    label: 'Customer Support',
    value: '+91 86072 32326',
    sub: 'Mon – Sat, 10 AM – 8 PM',
    color: '#7ab8f5',
    href: 'tel:+918607232326',
  },
  {
    Icon: Mail,
    label: 'Email Support',
    value: 'info.namienterprises@gmail.com',
    sub: 'We reply within 24 hours',
    color: '#C49A3C',
    href: 'mailto:info.namienterprises@gmail.com',
  },
  {
    Icon: Clock,
    label: 'Store Hours',
    value: 'Mon–Sat: 10:00 AM – 8:00 PM',
    sub: 'Sunday: 11:00 AM – 6:00 PM',
    color: '#7ab8f5',
  },
]

export default function VisitUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="visit" style={{ background: '#2C1200', overflow: 'hidden' }}>

      {/* Heading */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 40px 48px' }}>
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ height: 1, width: 32, background: '#C49A3C' }} />
            <span style={{ color: '#C49A3C', fontSize: 10, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase' }}>
              Visit Our Store
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px,6vw,80px)', lineHeight: 1, color: 'white', margin: 0 }}>
              Experience The<br />
              <span style={{ color: '#C49A3C', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 600 }}>
                Quality In Person
              </span>
            </h2>
            <p style={{ color: '#8fa3b8', fontSize: 14, lineHeight: 1.7, maxWidth: 340, margin: 0 }}>
              Step into our world. Our team is ready to assist you in finding the perfect fit tailored to your lifestyle and comfort needs.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Map zone — single relative container, card lives inside */}
      <div style={{ position: 'relative', height: 620 }}>

        {/* iframe fills the full zone */}
        <motion.iframe
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          title="Nami Enterprises Location"
          width="100%"
          height="100%"
          style={{
            border: 0,
            display: 'block',
            position: 'absolute',
            inset: 0,
            filter: 'saturate(0.55) contrast(1.05) brightness(0.8)',
          }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.4787!2d77.29470000000001!3d28.506600000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1b18e6df2ff%3A0x1!2sJaitpur%20Extension%20Part%202%2C%20Badarpur%2C%20New%20Delhi%2C%20Delhi%20110044!5e0!3m2!1sen!2sin!4v1748700000000"
        />

        {/* Left gradient overlay — lets card sit cleanly */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
          background: 'linear-gradient(to right, rgba(44,18,0,0.92) 0%, rgba(44,18,0,0.65) 35%, rgba(44,18,0,0.1) 65%, rgba(44,18,0,0) 100%)',
        }} />

        {/* Top & bottom edge fade */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
          background: 'linear-gradient(to bottom, rgba(44,18,0,0.5) 0%, transparent 18%, transparent 82%, rgba(44,18,0,0.7) 100%)',
        }} />

        {/* Gold corner glow top-left */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: 280, height: 280, pointerEvents: 'none', zIndex: 3,
          background: 'radial-gradient(circle at top left, rgba(201,130,26,0.18), transparent 65%)',
        }} />

        {/* Floating glass card — INSIDE the relative container */}
        <motion.div
          initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            position: 'absolute',
            top: 32,
            left: 40,
            bottom: 32,
            width: 340,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>

          {/* Main card */}
          <div style={{
            background: 'rgba(20,5,0,0.90)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(201,130,26,0.28)',
            borderRadius: 16,
            overflow: 'hidden',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}>

            {/* Card header */}
            <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', background: '#C49A3C',
                  boxShadow: '0 0 0 3px rgba(74,222,128,0.2)',
                  animation: 'pulse 2s infinite',
                }} />
                <span style={{ color: '#C49A3C', fontSize: 9, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase' }}>
                  Open Now
                </span>
              </div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, letterSpacing: '0.08em', color: 'white', lineHeight: 1.1 }}>
                NAMI ENTERPRISES
              </div>
              <div style={{ color: '#6b8aaa', fontSize: 11, marginTop: 3 }}>
                Flagship Retail Experience Center
              </div>
            </div>

            {/* Contact rows */}
            <div style={{ padding: '18px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {contactItems.map(({ Icon, label, value, sub, color, href }) => {
                const Tag = href ? 'a' : 'div'
                return (
                  <Tag key={label} href={href}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 12, textDecoration: 'none' }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: color + '18',
                      border: `1px solid ${color}30`,
                    }}>
                      <Icon size={14} color={color} />
                    </div>
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#4a6580', marginBottom: 2 }}>
                        {label}
                      </div>
                      <div style={{ fontSize: 12, color: '#d4e4f4', fontWeight: 500, lineHeight: 1.45, whiteSpace: 'pre-line' }}>
                        {value}
                      </div>
                      {sub && <div style={{ fontSize: 10, color: '#4a6580', marginTop: 2 }}>{sub}</div>}
                    </div>
                  </Tag>
                )
              })}
            </div>

            {/* Action buttons */}
            <div style={{ padding: '0 24px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <a href="tel:+918607232326" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: '#C49A3C', color: 'white', borderRadius: 9, padding: '10px 0',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}>
                <Phone size={12} /> Call Now
              </a>
              <a href="https://maps.google.com/?q=Jaitpur+Extension+Part+2+Badarpur+New+Delhi+110044"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  background: 'transparent', color: '#8fa3b8',
                  border: '1px solid rgba(255,255,255,0.15)', borderRadius: 9, padding: '10px 0',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                  textDecoration: 'none',
                }}>
                <Navigation size={12} /> Directions
              </a>
            </div>
          </div>

          {/* "Open in Google Maps" link below card */}
          <a href="https://maps.google.com/?q=Jaitpur+Extension+Part+2+Badarpur+New+Delhi+110044"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              color: '#4a6580', fontSize: 10, textDecoration: 'none',
              justifyContent: 'flex-end',
            }}>
            Open in Google Maps <ExternalLink size={10} />
          </a>
        </motion.div>

        {/* Bottom-right location badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{
            position: 'absolute', bottom: 24, right: 24, zIndex: 10,
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(201,130,26,0.14)',
            border: '1px solid rgba(201,130,26,0.38)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderRadius: 12,
            padding: '10px 16px',
          }}>
          <MapPin size={16} color="#C49A3C" />
          <div>
            <div style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>Badarpur, New Delhi</div>
            <div style={{ color: '#6b8aaa', fontSize: 10 }}>110044 · Near Grand Cafe</div>
          </div>
        </motion.div>

      </div>

      {/* Bottom spacer */}
      <div style={{ height: 64, background: '#2C1200' }} />

    </section>
  )
}
