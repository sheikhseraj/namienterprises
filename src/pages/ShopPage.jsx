import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Heart, Star, SlidersHorizontal, X } from 'lucide-react'
import { products, CATEGORIES } from '../data/products'
import { useWishlist } from '../context/WishlistContext'

const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Most Reviews']

const GOLD = '#C49A3C'
const BROWN = '#2C1200'

export default function ShopPage() {
  const [searchParams] = useSearchParams()
  const [search, setSearch]       = useState(searchParams.get('search') || '')
  const [category, setCategory]   = useState(searchParams.get('cat') || 'All')

  useEffect(() => {
    const s = searchParams.get('search')
    const c = searchParams.get('cat')
    if (s) setSearch(s)
    if (c) setCategory(c)
  }, [searchParams])
  const [sort, setSort]           = useState('Featured')
  const [showFilters, setShowFilters] = useState(false)
  const { toggle, isWishlisted }  = useWishlist()

  const filtered = useMemo(() => {
    let list = [...products]

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      )
    }

    if (category !== 'All') {
      list = list.filter(p => p.category === category)
    }

    switch (sort) {
      case 'Price: Low to High':  list.sort((a, b) => a.price - b.price); break
      case 'Price: High to Low':  list.sort((a, b) => b.price - a.price); break
      case 'Top Rated':           list.sort((a, b) => b.rating - a.rating); break
      case 'Most Reviews':        list.sort((a, b) => b.reviews - a.reviews); break
    }

    return list
  }, [search, category, sort])

  const discount = (orig, price) => Math.round((1 - price / orig) * 100)

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', paddingTop: 70 }}>

      {/* Header banner */}
      <div style={{ background: BROWN, padding: '40px 20px 32px', textAlign: 'center' }}>
        <p style={{ color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 8 }}>
          Nami Enterprises
        </p>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(36px,8vw,72px)', color: 'white', margin: 0, lineHeight: 1 }}>
          Our Collections
        </h1>
        <p style={{ color: 'rgba(253,249,244,0.55)', fontSize: 13, marginTop: 10 }}>
          {products.length} premium styles crafted for India
        </p>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 16px' }}>

        {/* Search + Sort bar */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search shoes, sandals, ethnic..."
              style={{
                width: '100%', padding: '10px 12px 10px 36px',
                border: '1px solid #e5e7eb', borderRadius: 8,
                fontSize: 13, outline: 'none', background: 'white',
                boxSizing: 'border-box',
              }}
            />
            {search && (
              <button onClick={() => setSearch('')}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{ padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 13, background: 'white', cursor: 'pointer', outline: 'none' }}>
            {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </select>

          {/* Filter toggle mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', border: `1px solid ${showFilters ? GOLD : '#e5e7eb'}`, borderRadius: 8, background: showFilters ? GOLD + '15' : 'white', cursor: 'pointer', fontSize: 13, color: showFilters ? GOLD : '#374151' }}>
            <SlidersHorizontal size={14} /> Filters
          </button>
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
          {CATEGORIES.map(cat => (
            <button key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '7px 18px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                border: `1.5px solid ${category === cat ? BROWN : '#e5e7eb'}`,
                background: category === cat ? BROWN : 'white',
                color: category === cat ? 'white' : '#374151',
                cursor: 'pointer', transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 16 }}>
          Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'product' : 'products'}
          {category !== 'All' ? ` in ${category}` : ''}
          {search ? ` for "${search}"` : ''}
        </p>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <p style={{ fontSize: 40 }}>👟</p>
            <p style={{ fontWeight: 700, fontSize: 18, color: BROWN }}>No products found</p>
            <p style={{ color: '#6b7280', fontSize: 13 }}>Try a different search or category</p>
            <button onClick={() => { setSearch(''); setCategory('All') }}
              style={{ marginTop: 16, padding: '10px 24px', background: BROWN, color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(165px, 1fr))', gap: 14 }}>
            {filtered.map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', position: 'relative' }}>

                {/* Wishlist button */}
                <button
                  onClick={() => toggle(p)}
                  style={{
                    position: 'absolute', top: 8, right: 8, zIndex: 10,
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'white', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                  }}>
                  <Heart size={15} fill={isWishlisted(p.id) ? '#ef4444' : 'none'} color={isWishlisted(p.id) ? '#ef4444' : '#9ca3af'} />
                </button>

                {/* Badge */}
                {p.badge && (
                  <div style={{ position: 'absolute', top: 8, left: 8, zIndex: 10 }}>
                    <span style={{ background: GOLD, color: 'white', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 4, letterSpacing: '0.05em' }}>
                      {p.badge}
                    </span>
                  </div>
                )}

                {/* Product image area */}
                <Link to={`/product/${p.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ height: 160, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>
                    {p.emoji}
                  </div>

                  <div style={{ padding: '12px 12px 14px' }}>
                    <p style={{ fontSize: 9, color: GOLD, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
                      {p.category} · {p.subCategory}
                    </p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: BROWN, marginBottom: 8, lineHeight: 1.3 }}>{p.name}</p>

                    {/* Rating */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                      <Star size={11} fill={GOLD} color={GOLD} />
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#374151' }}>{p.rating}</span>
                      <span style={{ fontSize: 10, color: '#9ca3af' }}>({p.reviews})</span>
                    </div>

                    {/* Price */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: BROWN }}>₹{p.price.toLocaleString('en-IN')}</span>
                      <span style={{ fontSize: 11, color: '#9ca3af', textDecoration: 'line-through' }}>₹{p.originalPrice.toLocaleString('en-IN')}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#16a34a' }}>{discount(p.originalPrice, p.price)}% off</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
