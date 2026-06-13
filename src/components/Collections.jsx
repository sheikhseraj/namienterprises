import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

const featured = products.slice(0, 6)

export default function Collections() {
  const ref = useRef(null)
  const trackRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  const scroll = (dir) => {
    const card = trackRef.current?.children[0]
    const w = card ? card.offsetWidth + 24 : 340
    trackRef.current?.scrollBy({ left: dir * w, behavior: 'smooth' })
    setActive(a => Math.min(Math.max(a + dir, 0), featured.length - 1))
  }

  const discount = (orig, price) => Math.round((1 - price / orig) * 100)

  return (
    <section id="collections" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <span className="text-[#C49A3C] text-[10px] font-bold tracking-[0.4em] uppercase block mb-3">Curated Collections</span>
            <h2 className="leading-none text-[#2C1200]"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 6vw, 80px)' }}>
              Masterpieces For<br />Every Step
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/shop"
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C49A3C', textDecoration: 'none' }}>
              View All →
            </Link>
            <button onClick={() => scroll(-1)}
              className="w-11 h-11 border border-gray-200 flex items-center justify-center hover:bg-[#2C1200] hover:border-[#2C1200] hover:text-white transition-all">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll(1)}
              className="w-11 h-11 border border-gray-200 flex items-center justify-center hover:bg-[#2C1200] hover:border-[#2C1200] hover:text-white transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        <div ref={trackRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {featured.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="collections-card flex-shrink-0 w-72 snap-start group cursor-pointer">

              <Link to={`/product/${p.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                {/* Image area */}
                <div className="relative h-72 rounded-xl overflow-hidden mb-5 flex items-center justify-center"
                  style={{ background: p.images?.[0] ? '#f5f5f5' : (p.bg || '#1A1A2E') }}>
                  {p.images?.[0]
                    ? <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="group-hover:scale-105" />
                    : <span className="text-8xl select-none group-hover:scale-110 transition-transform duration-500">{p.emoji || '👟'}</span>
                  }
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Discount badge */}
                  <div className="absolute top-4 right-4">
                    <span style={{ background: '#16a34a', color: 'white', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4 }}>
                      {discount(p.originalPrice, p.price)}% off
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#C49A3C' }}>
                      <ArrowUpRight size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-bold tracking-[0.25em] px-2.5 py-1 rounded-sm"
                      style={{ background: 'rgba(196,154,60,0.2)', border: '1px solid rgba(196,154,60,0.5)', color: '#DDB968' }}>
                      {p.category} · {p.subCategory}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-[#2C1200] text-base mb-1 group-hover:text-[#C49A3C] transition-colors">{p.name}</h3>

                {/* Price row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#2C1200' }}>₹{p.price.toLocaleString('en-IN')}</span>
                  <span style={{ fontSize: 12, color: '#9ca3af', textDecoration: 'line-through' }}>₹{p.originalPrice.toLocaleString('en-IN')}</span>
                </div>

                <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{p.desc}</p>

                <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#C49A3C] flex items-center gap-2 hover:gap-3 transition-all">
                  View Details <ArrowUpRight size={12} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-6 justify-center">
          {featured.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-[#C49A3C]' : 'w-2 bg-gray-200'}`} />
          ))}
        </div>

        {/* View all button */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/shop"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2C1200', color: '#DDB968', border: '1px solid #C49A3C', padding: '14px 36px', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Shop All {products.length} Products <ArrowUpRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  )
}
