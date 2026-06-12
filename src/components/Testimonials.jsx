import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const reviews = [
  { name: 'Gurpreet Singh', city: 'Amritsar, Punjab', initial: 'G', color: '#C49A3C', text: 'Very reliable sports shoes. The sole cushion grip is perfect for morning walks on concrete pavement tracks. Highly satisfied.' },
  { name: 'Rohan Das', city: 'Kolkata, West Bengal', initial: 'R', color: '#2C1200', text: 'Ordered formal shoes online. The leather texture is top tier. Fits accurately matching the standard size charts provided. Will order again.' },
  { name: "Joseph D'Souza", city: 'Panaji, Goa', initial: 'J', color: '#1A4D2E', text: 'Exceptional builds! The slippers handle water exposure gracefully without rotting or losing strap adherence. Perfect beach and home footwear.' },
  { name: 'Aisha Khan', city: 'Mumbai, Maharashtra', initial: 'A', color: '#4A1942', text: 'The elegant collection line for traditional suits is well. Comfortable heels that don\'t exhaust during festive occasions.' },
]

export default function Testimonials() {
  const ref = useRef(null)
  const trackRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const scroll = (dir) => {
    const card = trackRef.current?.children[0]
    const w = card ? card.offsetWidth + 24 : 320
    trackRef.current?.scrollBy({ left: dir * w, behavior: 'smooth' })
  }

  return (
    <section id="testimonials" className="py-28 bg-[#2C1200] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div>
            <span className="text-[#C49A3C] text-[10px] font-bold tracking-[0.4em] uppercase block mb-3">Customer Voices</span>
            <h2 className="leading-none text-white"
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(40px, 6vw, 80px)' }}>
              Loved Across India
            </h2>
            <p className="text-gray-400 text-sm mt-3 max-w-md">
              See what our satisfied customers have to say about their Nami Enterprises experience.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => scroll(-1)}
              className="w-11 h-11 border border-white/20 flex items-center justify-center text-white hover:bg-[#C49A3C] hover:border-[#C49A3C] transition-all">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll(1)}
              className="w-11 h-11 border border-white/20 flex items-center justify-center text-white hover:bg-[#C49A3C] hover:border-[#C49A3C] transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        <div ref={trackRef} className="flex gap-6 overflow-x-auto pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {reviews.map((r, i) => (
            <motion.div key={r.name}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="testimonial-card flex-shrink-0 w-80 bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all group">

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#C49A3C"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>

              <p className="text-white/80 text-sm leading-relaxed mb-8 italic">"{r.text}"</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: r.color }}>
                  {r.initial}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{r.name}</p>
                  <p className="text-gray-500 text-xs">{r.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
