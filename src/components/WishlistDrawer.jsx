import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'

const BROWN = '#2C1200'
const GOLD  = '#C49A3C'

export default function WishlistDrawer({ open, onClose }) {
  const { wishlist, toggle } = useWishlist()

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 998 }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: 320,
              background: 'white', zIndex: 999,
              display: 'flex', flexDirection: 'column',
              boxShadow: '-8px 0 32px rgba(0,0,0,0.15)',
            }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px 16px', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Heart size={18} fill="#ef4444" color="#ef4444" />
                <span style={{ fontWeight: 700, fontSize: 15, color: BROWN }}>Wishlist</span>
                <span style={{ background: BROWN, color: 'white', fontSize: 11, fontWeight: 700, width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {wishlist.length}
                </span>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
              {wishlist.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <Heart size={40} color="#e5e7eb" style={{ margin: '0 auto 12px' }} />
                  <p style={{ fontWeight: 700, color: BROWN, marginBottom: 6 }}>Your wishlist is empty</p>
                  <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 20 }}>Save items you love to find them later</p>
                  <button onClick={onClose}
                    style={{ background: BROWN, color: 'white', border: 'none', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
                    Browse Products
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {wishlist.map(p => (
                    <div key={p.id} style={{ display: 'flex', gap: 12, background: '#fafafa', borderRadius: 10, padding: 12, alignItems: 'center' }}>
                      <Link to={`/product/${p.slug}`} onClick={onClose}
                        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 8, background: p.bg, fontSize: 28, flexShrink: 0 }}>
                        {p.emoji}
                      </Link>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Link to={`/product/${p.slug}`} onClick={onClose} style={{ textDecoration: 'none' }}>
                          <p style={{ fontSize: 13, fontWeight: 700, color: BROWN, marginBottom: 2, lineHeight: 1.3 }}>{p.name}</p>
                        </Link>
                        <p style={{ fontSize: 13, fontWeight: 800, color: BROWN }}>₹{p.price.toLocaleString('en-IN')}</p>
                      </div>
                      <button onClick={() => toggle(p)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4 }}>
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {wishlist.length > 0 && (
              <div style={{ padding: '16px 20px', borderTop: '1px solid #f3f4f6' }}>
                <Link to="/shop" onClick={onClose}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: GOLD, color: 'white', borderRadius: 10, padding: '13px', textDecoration: 'none', fontSize: 13, fontWeight: 800 }}>
                  <ShoppingBag size={16} /> Continue Shopping
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
