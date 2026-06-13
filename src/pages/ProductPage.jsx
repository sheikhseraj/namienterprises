import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Star, ArrowLeft, Share2, ChevronRight, CheckCircle2, MessageCircle, ChevronLeft } from 'lucide-react'
import { getProductBySlug, getRelatedProducts, buildWhatsAppUrl } from '../data/products'
import { useWishlist } from '../context/WishlistContext'

const GOLD  = '#C49A3C'
const BROWN = '#2C1200'

function StarRow({ rating, reviews }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ display: 'flex', gap: 2 }}>
        {[1,2,3,4,5].map(s => (
          <Star key={s} size={14}
            fill={s <= Math.round(rating) ? GOLD : 'none'}
            color={s <= Math.round(rating) ? GOLD : '#d1d5db'} />
        ))}
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>{rating}</span>
      <span style={{ fontSize: 12, color: '#9ca3af' }}>({reviews} reviews)</span>
    </div>
  )
}

export default function ProductPage() {
  const { slug }    = useParams()
  const navigate    = useNavigate()
  const product     = getProductBySlug(slug)
  const related     = product ? getRelatedProducts(product) : []
  const { toggle, isWishlisted } = useWishlist()

  const [activeImg, setActiveImg]     = useState(0)
  const [selectedSize, setSelectedSize]   = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [qty, setQty]                     = useState(1)
  const [sizeError, setSizeError]         = useState(false)
  const [colorError, setColorError]       = useState(false)
  const [shareMsg, setShareMsg]           = useState('')

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 70 }}>
        <p style={{ fontSize: 48 }}>👟</p>
        <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', color: BROWN, fontSize: 36 }}>Product Not Found</h2>
        <Link to="/shop" style={{ color: GOLD, fontSize: 14, marginTop: 8 }}>← Back to Shop</Link>
      </div>
    )
  }

  const images  = product.images || []
  const hasImgs = images.length > 0
  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  const prevImg = () => setActiveImg(i => (i - 1 + images.length) % images.length)
  const nextImg = () => setActiveImg(i => (i + 1) % images.length)

  const handleBuyWhatsApp = () => {
    if (!selectedSize)  { setSizeError(true);  return }
    if (!selectedColor) { setColorError(true); return }
    window.open(buildWhatsAppUrl(product, selectedSize, selectedColor, qty), '_blank')
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.name, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      setShareMsg('Link copied!')
      setTimeout(() => setShareMsg(''), 2000)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', paddingTop: 70 }}>

      {/* Breadcrumb */}
      <div style={{ background: 'white', borderBottom: '1px solid #f3f4f6', padding: '10px 16px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" style={{ color: '#6b7280', textDecoration: 'none' }}>Shop</Link>
          <ChevronRight size={12} />
          <span style={{ color: BROWN, fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 16px' }}>

        <button onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: 13, marginBottom: 20 }}>
          <ArrowLeft size={15} /> Back
        </button>

        {/* Main grid */}
        <div className="md:product-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 28 }}>

          {/* LEFT — Image gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>

            {/* Main image */}
            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', background: hasImgs ? '#f5f5f5' : '#1A1A2E', aspectRatio: '1/1', maxHeight: 420 }}>
              {hasImgs ? (
                <img
                  src={images[activeImg]}
                  alt={`${product.name} view ${activeImg + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => { e.target.style.display = 'none' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 100 }}>
                  {product.emoji || '👟'}
                </div>
              )}

              {/* Prev/Next */}
              {images.length > 1 && (
                <>
                  <button onClick={prevImg} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={nextImg} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Badges */}
              <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {product.badge && <span style={{ background: GOLD, color: 'white', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 4 }}>{product.badge}</span>}
                <span style={{ background: '#16a34a', color: 'white', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 4 }}>{discount}% OFF</span>
              </div>

              {/* Wishlist */}
              <button onClick={() => toggle(product)}
                style={{ position: 'absolute', top: 12, right: 12, width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                <Heart size={18} fill={isWishlisted(product.id) ? '#ef4444' : 'none'} color={isWishlisted(product.id) ? '#ef4444' : '#9ca3af'} />
              </button>

              {/* Image counter */}
              {images.length > 1 && (
                <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 11, padding: '3px 8px', borderRadius: 99 }}>
                  {activeImg + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: 8, marginTop: 10, overflowX: 'auto', paddingBottom: 4 }}>
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    style={{ flexShrink: 0, width: 64, height: 64, borderRadius: 8, overflow: 'hidden', border: `2px solid ${activeImg === i ? GOLD : '#e5e7eb'}`, padding: 0, cursor: 'pointer', background: '#f5f5f5' }}>
                    <img src={img} alt={`view ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.opacity = 0.3} />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantees */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 14 }}>
              {[['🇮🇳','Made in India'],['✅','7-Day Return'],['🚚','Free Delivery*']].map(([icon,label]) => (
                <div key={label} style={{ background: 'white', borderRadius: 8, padding: '10px 6px', textAlign: 'center', border: '1px solid #f3f4f6' }}>
                  <div style={{ fontSize: 18 }}>{icon}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#374151', marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>

            <p style={{ fontSize: 10, color: GOLD, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 6 }}>
              {product.category} · {product.subCategory}
            </p>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(28px,6vw,48px)', color: BROWN, margin: '0 0 12px', lineHeight: 1.1 }}>
              {product.name}
            </h1>

            <StarRow rating={product.rating} reviews={product.reviews} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: BROWN }}>₹{product.price.toLocaleString('en-IN')}</span>
              <span style={{ fontSize: 16, color: '#9ca3af', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 99 }}>{discount}% off</span>
            </div>

            {!product.inStock && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#ef4444', fontWeight: 600 }}>
                ⚠ Currently Out of Stock — Contact us on WhatsApp for availability
              </div>
            )}

            <p style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.7, marginBottom: 20 }}>{product.desc}</p>

            {/* Color */}
            <div style={{ marginBottom: 18 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: BROWN, marginBottom: 8 }}>
                Color {selectedColor && <span style={{ fontWeight: 400, color: '#6b7280' }}>— {selectedColor}</span>}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.colors.map(c => (
                  <button key={c} onClick={() => { setSelectedColor(c); setColorError(false) }}
                    style={{ padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: `2px solid ${selectedColor === c ? BROWN : '#e5e7eb'}`, background: selectedColor === c ? BROWN : 'white', color: selectedColor === c ? 'white' : '#374151', transition: 'all 0.15s' }}>
                    {c}
                  </button>
                ))}
              </div>
              {colorError && <p style={{ color: '#ef4444', fontSize: 11, marginTop: 4 }}>Please select a color</p>}
            </div>

            {/* Size */}
            <div style={{ marginBottom: 18 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: BROWN, marginBottom: 8 }}>
                Size {selectedSize && <span style={{ fontWeight: 400, color: '#6b7280' }}>— {selectedSize}</span>}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.sizes.map(s => (
                  <button key={s} onClick={() => { setSelectedSize(s); setSizeError(false) }}
                    style={{ width: 58, height: 38, borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: `2px solid ${selectedSize === s ? GOLD : '#e5e7eb'}`, background: selectedSize === s ? GOLD + '20' : 'white', color: selectedSize === s ? BROWN : '#374151', transition: 'all 0.15s' }}>
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && <p style={{ color: '#ef4444', fontSize: 11, marginTop: 4 }}>Please select a size</p>}
            </div>

            {/* Qty */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: BROWN }}>Qty:</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q-1))} style={{ width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>−</button>
                <span style={{ width: 32, textAlign: 'center', fontSize: 14, fontWeight: 700, color: BROWN }}>{qty}</span>
                <button onClick={() => setQty(q => Math.min(10, q+1))} style={{ width: 36, height: 36, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>+</button>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
              <button onClick={handleBuyWhatsApp}
                style={{ flex: 1, minWidth: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: 'white', border: 'none', borderRadius: 10, padding: '14px 20px', fontSize: 14, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,211,102,0.35)' }}>
                <MessageCircle size={18} /> Buy on WhatsApp
              </button>
              <button onClick={() => toggle(product)}
                style={{ width: 50, height: 50, borderRadius: 10, border: `1.5px solid ${isWishlisted(product.id) ? '#ef4444' : '#e5e7eb'}`, background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={20} fill={isWishlisted(product.id) ? '#ef4444' : 'none'} color={isWishlisted(product.id) ? '#ef4444' : '#9ca3af'} />
              </button>
              <button onClick={handleShare}
                style={{ width: 50, height: 50, borderRadius: 10, border: '1.5px solid #e5e7eb', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Share2 size={18} color="#6b7280" />
              </button>
            </div>
            {shareMsg && <p style={{ fontSize: 12, color: '#16a34a', marginBottom: 8 }}>✓ {shareMsg}</p>}

            <a href={`https://wa.me/918607232326?text=${encodeURIComponent(`Hi! I have a question about the ${product.name}`)}`}
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: '#6b7280', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              💬 Have a question? Chat with us on WhatsApp
            </a>

            {/* Features */}
            <div style={{ marginTop: 22, background: 'white', borderRadius: 12, padding: 18, border: '1px solid #f3f4f6' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: BROWN, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Product Features</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {product.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#374151' }}>
                    <CheckCircle2 size={14} color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: BROWN, marginBottom: 20 }}>You May Also Like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 14 }}>
              {related.map(p => (
                <Link key={p.id} to={`/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
                    <div style={{ height: 120, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      {p.images?.[0]
                        ? <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <span style={{ fontSize: 48 }}>{p.emoji || '👟'}</span>
                      }
                    </div>
                    <div style={{ padding: '10px 12px' }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: BROWN, marginBottom: 4, lineHeight: 1.3 }}>{p.name}</p>
                      <p style={{ fontSize: 13, fontWeight: 800, color: BROWN }}>₹{p.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
