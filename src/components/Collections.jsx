import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'The Executive Oxford',
    category: 'MEN · SIGNATURE FORMAL',
    desc: 'Command the boardroom with these premium, hand-finished genuine leather formal shoes. Engineered with an anti-slip sole and breathable inner linings.',
    bg: '#1A1A2E',
    accent: '#C49A3C',
    emoji: '👞',
  },
  {
    id: 2,
    name: 'Aura Block Heels',
    category: 'WOMEN · PREMIUM ELEGANCE',
    desc: 'Experience grace without structural foot fatigue. Our custom block heels offer perfect weight distribution and stability across formal events.',
    bg: '#2C1654',
    accent: '#DDB968',
    emoji: '👠',
  },
  {
    id: 3,
    name: 'Velocity Aero-Mesh',
    category: 'MEN · ACTIVE PERFORMANCE',
    desc: 'Engineered sport fitness shoes for running tracks and daily outdoor activities. Built with ultra-lightweight high traction EVA compounds.',
    bg: '#1A2E1A',
    accent: '#5DBB63',
    emoji: '👟',
  },
  {
    id: 4,
    name: 'Royal Kolhapuri Sandals',
    category: 'MEN · ETHNIC HERITAGE',
    desc: 'Authentic classic designs crafted with traditional hand-stitched leather values, featuring flexible outsoles for versatile ethnic ensembles.',
    bg: '#2E1A0A',
    accent: '#C49A3C',
    emoji: '🥿',
  },
  {
    id: 5,
    name: 'Elegance Kolhapuri Flats',
    category: 'WOMEN · TRADITIONAL FLATS',
    desc: 'The ideal pairing for kurtis and traditional suits. Comfortable cushion metrics layered below upper styles.',
    bg: '#1A1F2E',
    accent: '#A78BFA',
    emoji: '🩴',
  },
  {
    id: 6,
    name: 'Street Runner Pro',
    category: 'UNISEX · CASUAL SPORT',
    desc: 'Versatile everyday sneaker built for the urban explorer. Lightweight, durable, and effortlessly stylish on any terrain.',
    bg: '#0A2020',
    accent: '#34D399',
    emoji: '👟',
  },
]

export default function Collections() {
  const ref = useRef(null)
  const trackRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  const scroll = (dir) => {
    const card = trackRef.current?.children[0]
    const w = card ? card.offsetWidth + 24 : 340
    trackRef.current?.scrollBy({ left: dir * w, behavior: 'smooth' })
    setActive(a => Math.min(Math.max(a + dir, 0), products.length - 1))
  }

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
          <div className="flex items-center gap-3">
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
          {products.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex-shrink-0 w-72 snap-start group cursor-pointer">

              {/* Image area */}
              <div className="relative h-72 rounded-xl overflow-hidden mb-5 flex items-center justify-center"
                style={{ background: p.bg }}>
                <span className="text-8xl select-none group-hover:scale-110 transition-transform duration-500">{p.emoji}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: p.accent }}>
                    <ArrowUpRight size={14} className="text-white" />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="text-[9px] font-bold tracking-[0.25em] px-2.5 py-1 rounded-sm text-white"
                    style={{ background: p.accent + '33', border: `1px solid ${p.accent}66`, color: p.accent }}>
                    {p.category}
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-[#2C1200] text-base mb-2 group-hover:text-[#C49A3C] transition-colors">{p.name}</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{p.desc}</p>
              <button className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#C49A3C] flex items-center gap-2 hover:gap-3 transition-all">
                View Details <ArrowUpRight size={12} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-6 justify-center">
          {products.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-[#C49A3C]' : 'w-2 bg-gray-200'}`} />
          ))}
        </div>

      </div>
    </section>
  )
}
