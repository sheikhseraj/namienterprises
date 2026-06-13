import { useState, useEffect, useRef } from 'react'
import { products as defaultProducts, MEN_SIZES, WOMEN_SIZES, KIDS_SIZES } from '../data/products'

const STORAGE_KEY  = 'nami_admin_products'
const ORDERS_KEY   = 'nami_orders'
const HERO_KEY     = 'nami_hero'
const PASS_ENV     = import.meta.env.VITE_ADMIN_PASSWORD || 'nami2024'

const GOLD  = '#C49A3C'
const BROWN = '#2C1200'
const CREAM = '#FDF9F4'

function getStoredProducts() {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? JSON.parse(s) : null
  } catch { return null }
}

function saveProducts(prods) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prods))
  window.dispatchEvent(new Event('nami_products_updated'))
}

const CATEGORY_SIZES = { Men: MEN_SIZES, Women: WOMEN_SIZES, Kids: KIDS_SIZES, Ethnic: WOMEN_SIZES, Sport: MEN_SIZES }

const EMPTY_PRODUCT = {
  id: Date.now(),
  slug: '',
  name: '',
  category: 'Men',
  subCategory: '',
  price: '',
  originalPrice: '',
  images: [],
  badge: '',
  sizes: MEN_SIZES,
  colors: ['Black'],
  rating: 4.5,
  reviews: 0,
  desc: '',
  features: [''],
  tags: [],
  inStock: true,
}

/* ───────────── Reusable UI primitives ───────────── */
const Btn = ({ onClick, children, variant = 'primary', type = 'button', small, style: ext }) => {
  const styles = {
    primary: { background: BROWN, color: GOLD, border: `1px solid ${GOLD}` },
    danger:  { background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca' },
    ghost:   { background: 'white', color: '#374151', border: '1px solid #e5e7eb' },
    green:   { background: '#dcfce7', color: '#16a34a', border: '1px solid #bbf7d0' },
  }
  return (
    <button type={type} onClick={onClick}
      style={{ ...styles[variant], borderRadius: 8, padding: small ? '6px 12px' : '10px 18px', fontSize: small ? 12 : 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', ...ext }}>
      {children}
    </button>
  )
}

const Input = ({ label, value, onChange, type = 'text', placeholder, style: ext }) => (
  <label style={{ display: 'block', marginBottom: 14 }}>
    {label && <span style={{ fontSize: 11, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box', ...ext }} />
  </label>
)

const Textarea = ({ label, value, onChange, rows = 3, placeholder }) => (
  <label style={{ display: 'block', marginBottom: 14 }}>
    {label && <span style={{ fontSize: 11, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>}
    <textarea value={value} onChange={onChange} rows={rows} placeholder={placeholder}
      style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
  </label>
)

/* ───────────── Login Screen ───────────── */
function Login({ onLogin }) {
  const [pass, setPass]   = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (pass === PASS_ENV) { onLogin(); setError('') }
    else setError('Incorrect password. Check your .env file for VITE_ADMIN_PASSWORD.')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: CREAM }}>
      <div style={{ background: 'white', borderRadius: 16, padding: 40, width: '100%', maxWidth: 380, boxShadow: '0 8px 40px rgba(44,18,0,0.12)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/logo.png" alt="Nami" style={{ height: 56, margin: '0 auto 16px', display: 'block' }} />
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: BROWN, margin: 0 }}>Admin Panel</h1>
          <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>Nami Enterprises</p>
        </div>
        <form onSubmit={submit}>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</span>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Enter admin password"
              autoFocus
              style={{ width: '100%', padding: '11px 14px', border: `1.5px solid ${error ? '#fca5a5' : '#e5e7eb'}`, borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
          </label>
          {error && <p style={{ color: '#ef4444', fontSize: 12, marginBottom: 12 }}>{error}</p>}
          <button type="submit"
            style={{ width: '100%', background: BROWN, color: GOLD, border: 'none', borderRadius: 8, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            Login
          </button>
        </form>
        <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 20 }}>
          Default password: <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: 3 }}>nami2024</code><br/>
          Set <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: 3 }}>VITE_ADMIN_PASSWORD</code> in .env to change
        </p>
      </div>
    </div>
  )
}

/* ───────────── Product Form ───────────── */
function ProductForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(() => ({
    ...EMPTY_PRODUCT,
    id: Date.now(),
    ...initial,
    features: initial?.features?.length ? [...initial.features] : [''],
    colors:   initial?.colors?.length   ? [...initial.colors]   : ['Black'],
    images:   initial?.images?.length   ? [...initial.images]   : [],
  }))
  const [imgInput, setImgInput] = useState('')

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const autoSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleName = (v) => {
    setForm(f => ({ ...f, name: v, slug: initial?.slug ? f.slug : autoSlug(v) }))
  }

  const handleCategory = (cat) => {
    setForm(f => ({ ...f, category: cat, sizes: CATEGORY_SIZES[cat] || MEN_SIZES }))
  }

  const addImage = () => {
    const url = imgInput.trim()
    if (!url) return
    set('images', [...form.images, url])
    setImgInput('')
  }

  const removeImage = (i) => set('images', form.images.filter((_, idx) => idx !== i))
  const moveImage = (i, dir) => {
    const arr = [...form.images]
    const j = i + dir
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]]
    set('images', arr)
  }

  const handleFeatureChange = (i, v) => {
    const arr = [...form.features]
    arr[i] = v
    set('features', arr)
  }
  const addFeature    = () => set('features', [...form.features, ''])
  const removeFeature = (i) => set('features', form.features.filter((_, idx) => idx !== i))

  const handleColorChange = (i, v) => {
    const arr = [...form.colors]; arr[i] = v; set('colors', arr)
  }
  const addColor    = () => set('colors', [...form.colors, ''])
  const removeColor = (i) => set('colors', form.colors.filter((_, idx) => idx !== i))

  const handleSubmit = (e) => {
    e.preventDefault()
    const cleaned = {
      ...form,
      price:         Number(form.price),
      originalPrice: Number(form.originalPrice),
      rating:        Number(form.rating),
      reviews:       Number(form.reviews),
      features: form.features.filter(f => f.trim()),
      colors:   form.colors.filter(c => c.trim()),
      tags: form.name.toLowerCase().split(' ').concat([form.category.toLowerCase()]),
    }
    onSave(cleaned)
  }

  const section = (title) => (
    <div style={{ fontSize: 10, fontWeight: 800, color: GOLD, letterSpacing: '0.3em', textTransform: 'uppercase', padding: '10px 0 6px', borderBottom: `1px solid ${GOLD}22`, marginBottom: 14, marginTop: 8 }}>
      {title}
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      {section('Basic Info')}
      <Input label="Product Name *" value={form.name} onChange={e => handleName(e.target.value)} placeholder="e.g. Men's Classic Oxford" />
      <Input label="Slug (URL key) *" value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="e.g. mens-classic-oxford" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <label>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category *</span>
          <select value={form.category} onChange={e => handleCategory(e.target.value)}
            style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, outline: 'none' }}>
            {['Men','Women','Kids','Ethnic','Sport'].map(c => <option key={c}>{c}</option>)}
          </select>
        </label>
        <Input label="Sub-Category" value={form.subCategory} onChange={e => set('subCategory', e.target.value)} placeholder="e.g. Heritage Collection" />
      </div>

      <Input label="Badge (optional)" value={form.badge} onChange={e => set('badge', e.target.value)} placeholder="e.g. Best Seller, New Arrival" />
      <Textarea label="Description *" value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="Describe the product..." />

      {section('Pricing')}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Input label="Selling Price (₹) *" type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="1999" />
        <Input label="Original / MRP (₹) *" type="number" value={form.originalPrice} onChange={e => set('originalPrice', e.target.value)} placeholder="2699" />
      </div>

      {section('Ratings')}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Input label="Rating (0–5)" type="number" value={form.rating} onChange={e => set('rating', e.target.value)} />
        <Input label="Review Count" type="number" value={form.reviews} onChange={e => set('reviews', e.target.value)} />
      </div>

      {section('Stock')}
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, cursor: 'pointer' }}>
        <input type="checkbox" checked={form.inStock} onChange={e => set('inStock', e.target.checked)}
          style={{ width: 16, height: 16, accentColor: BROWN }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>In Stock</span>
      </label>

      {section('Images (URLs)')}
      <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 10 }}>
        Add image paths like <code>/products/article01/article01-1.jpg</code>. First image = main product card image.
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input value={imgInput} onChange={e => setImgInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImage())}
          placeholder="/products/folder/image-1.jpg"
          style={{ flex: 1, padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, outline: 'none' }} />
        <Btn onClick={addImage} small>Add</Btn>
      </div>
      {form.images.map((img, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, padding: '6px 10px', background: '#f9fafb', borderRadius: 8 }}>
          <img src={img} alt="" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 4, background: '#e5e7eb', flexShrink: 0 }} onError={e => e.target.style.opacity = 0.3} />
          <span style={{ flex: 1, fontSize: 11, color: '#4b5563', wordBreak: 'break-all' }}>{img}</span>
          <button type="button" onClick={() => moveImage(i, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, padding: '0 4px', color: '#9ca3af' }}>↑</button>
          <button type="button" onClick={() => moveImage(i, 1)}  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, padding: '0 4px', color: '#9ca3af' }}>↓</button>
          <button type="button" onClick={() => removeImage(i)}    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#ef4444' }}>×</button>
        </div>
      ))}

      {section('Colors')}
      {form.colors.map((c, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
          <input value={c} onChange={e => handleColorChange(i, e.target.value)} placeholder="e.g. Black"
            style={{ flex: 1, padding: '8px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, outline: 'none' }} />
          <button type="button" onClick={() => removeColor(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 18 }}>×</button>
        </div>
      ))}
      <Btn onClick={addColor} small variant="ghost" style={{ marginBottom: 8 }}>+ Add Color</Btn>

      {section('Features')}
      {form.features.map((f, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
          <input value={f} onChange={e => handleFeatureChange(i, e.target.value)} placeholder="e.g. Genuine leather upper"
            style={{ flex: 1, padding: '8px 12px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, outline: 'none' }} />
          <button type="button" onClick={() => removeFeature(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 18 }}>×</button>
        </div>
      ))}
      <Btn onClick={addFeature} small variant="ghost" style={{ marginBottom: 8 }}>+ Add Feature</Btn>

      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <Btn type="submit" variant="primary">💾 Save Product</Btn>
        <Btn onClick={onCancel} variant="ghost">Cancel</Btn>
      </div>
    </form>
  )
}

/* ───────────── Products Tab ───────────── */
function ProductsTab({ products, setProducts }) {
  const [view, setView] = useState('list') // 'list' | 'add' | 'edit'
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState(null)

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const save = (prod) => {
    let next
    if (editing) {
      next = products.map(p => p.id === prod.id ? prod : p)
    } else {
      next = [...products, { ...prod, id: Date.now() }]
    }
    setProducts(next)
    saveProducts(next)
    setView('list')
    setEditing(null)
  }

  const del = (id) => {
    const next = products.filter(p => p.id !== id)
    setProducts(next)
    saveProducts(next)
    setDeleteId(null)
  }

  const toggleStock = (id) => {
    const next = products.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p)
    setProducts(next)
    saveProducts(next)
  }

  const resetToDefaults = () => {
    if (window.confirm('Reset ALL products to default data from products.js? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY)
      setProducts(defaultProducts)
    }
  }

  if (view === 'add' || view === 'edit') {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <button onClick={() => { setView('list'); setEditing(null) }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: 22 }}>←</button>
          <h2 style={{ margin: 0, fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: BROWN }}>
            {view === 'add' ? 'Add New Product' : `Edit: ${editing?.name}`}
          </h2>
        </div>
        <ProductForm
          initial={editing}
          onSave={save}
          onCancel={() => { setView('list'); setEditing(null) }}
        />
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <h2 style={{ margin: 0, fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: BROWN }}>Products ({products.length})</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn onClick={resetToDefaults} variant="ghost" small>Reset to Default</Btn>
          <Btn onClick={() => { setEditing(null); setView('add') }} variant="primary">+ Add Product</Btn>
        </div>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
        style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, outline: 'none', marginBottom: 16, boxSizing: 'border-box' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(p => (
          <div key={p.id} style={{ background: 'white', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, border: '1px solid #f3f4f6', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ width: 56, height: 56, borderRadius: 8, overflow: 'hidden', background: '#f5f5f5', flexShrink: 0 }}>
              {p.images?.[0]
                ? <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{p.emoji || '👟'}</div>
              }
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: BROWN }}>{p.name}</span>
                {p.badge && <span style={{ background: GOLD + '22', color: GOLD, fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4 }}>{p.badge}</span>}
                <span style={{ fontSize: 10, color: '#9ca3af' }}>{p.category}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: BROWN }}>₹{Number(p.price).toLocaleString('en-IN')}</span>
                <span style={{ fontSize: 11, color: '#9ca3af', textDecoration: 'line-through' }}>₹{Number(p.originalPrice).toLocaleString('en-IN')}</span>
                <span style={{ fontSize: 11, color: '#6b7280' }}>{p.images?.length || 0} images</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <button onClick={() => toggleStock(p.id)}
                style={{ background: p.inStock ? '#dcfce7' : '#fee2e2', color: p.inStock ? '#16a34a' : '#dc2626', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>
                {p.inStock ? 'In Stock' : 'Out of Stock'}
              </button>
              <Btn onClick={() => { setEditing(p); setView('edit') }} small variant="ghost">Edit</Btn>
              {deleteId === p.id
                ? (
                  <div style={{ display: 'flex', gap: 4 }}>
                    <Btn onClick={() => del(p.id)} small variant="danger">Delete?</Btn>
                    <Btn onClick={() => setDeleteId(null)} small variant="ghost">No</Btn>
                  </div>
                )
                : <Btn onClick={() => setDeleteId(p.id)} small variant="danger">Delete</Btn>
              }
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>No products found</div>
        )}
      </div>

      <div style={{ marginTop: 24, padding: 16, background: '#fffbeb', borderRadius: 12, border: '1px solid #fde68a' }}>
        <p style={{ fontSize: 12, color: '#92400e', margin: 0, fontWeight: 600 }}>
          ⚡ Changes are saved in browser localStorage and take effect immediately on the live site (same browser). To make changes permanent for all visitors, export products and update <code>src/data/products.js</code>.
        </p>
        <Btn onClick={() => {
          const json = JSON.stringify(products, null, 2)
          navigator.clipboard.writeText(json)
          alert('Products JSON copied to clipboard! Paste into src/data/products.js → products array.')
        }} small variant="ghost" style={{ marginTop: 10 }}>📋 Copy products JSON to clipboard</Btn>
      </div>
    </div>
  )
}

/* ───────────── Hero Editor Tab ───────────── */
function HeroTab() {
  const defaultHero = {
    headline1: 'Step Into',
    headline2: 'Excellence',
    subheadline: 'Premium footwear crafted for the modern Indian — where tradition meets contemporary design',
    ctaText: 'Explore Collection',
    ctaLink: '/shop',
    badgeText: 'Delhi\'s Premier Footwear',
    image: '',
  }

  const [hero, setHero] = useState(() => {
    try { return JSON.parse(localStorage.getItem(HERO_KEY)) || defaultHero }
    catch { return defaultHero }
  })
  const [saved, setSaved] = useState(false)

  const set = (k, v) => setHero(h => ({ ...h, [k]: v }))

  const save = () => {
    localStorage.setItem(HERO_KEY, JSON.stringify(hero))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const reset = () => {
    localStorage.removeItem(HERO_KEY)
    setHero(defaultHero)
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: BROWN, marginBottom: 6 }}>Hero Banner Editor</h2>
      <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 24 }}>Edit the homepage hero section text and content.</p>

      <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid #f3f4f6' }}>
        <Input label="Headline Line 1" value={hero.headline1} onChange={e => set('headline1', e.target.value)} placeholder="Step Into" />
        <Input label="Headline Line 2" value={hero.headline2} onChange={e => set('headline2', e.target.value)} placeholder="Excellence" />
        <Textarea label="Subheadline" value={hero.subheadline} onChange={e => set('subheadline', e.target.value)} placeholder="Premium footwear..." />
        <Input label="CTA Button Text" value={hero.ctaText} onChange={e => set('ctaText', e.target.value)} placeholder="Explore Collection" />
        <Input label="Badge Text (top pill)" value={hero.badgeText} onChange={e => set('badgeText', e.target.value)} placeholder="Delhi's Premier Footwear" />

        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <Btn onClick={save} variant="primary">💾 Save Hero</Btn>
          <Btn onClick={reset} variant="ghost">Reset to Default</Btn>
        </div>
        {saved && <p style={{ color: '#16a34a', fontSize: 12, marginTop: 8 }}>✓ Saved! Refresh homepage to see changes.</p>}
      </div>

      <div style={{ marginTop: 16, padding: 16, background: '#fffbeb', borderRadius: 12, border: '1px solid #fde68a' }}>
        <p style={{ fontSize: 12, color: '#92400e', margin: 0 }}>
          💡 Hero changes are stored in browser localStorage. To make them permanent for all visitors, update <code>src/components/Hero.jsx</code> directly.
        </p>
      </div>
    </div>
  )
}

/* ───────────── Orders Tab ───────────── */
function OrdersTab() {
  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [] }
    catch { return [] }
  })

  const addSample = () => {
    const sample = {
      id: Date.now(),
      product: 'Article 01 — Men\'s Premium',
      size: 'UK 8',
      color: 'Dark Brown',
      qty: 2,
      price: 4998,
      customer: 'Via WhatsApp',
      date: new Date().toLocaleString('en-IN'),
      status: 'pending',
    }
    const next = [sample, ...orders]
    setOrders(next)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(next))
  }

  const updateStatus = (id, status) => {
    const next = orders.map(o => o.id === id ? { ...o, status } : o)
    setOrders(next)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(next))
  }

  const del = (id) => {
    const next = orders.filter(o => o.id !== id)
    setOrders(next)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(next))
  }

  const STATUS_COLORS = {
    pending:   { bg: '#fffbeb', color: '#92400e', border: '#fde68a' },
    confirmed: { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' },
    shipped:   { bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe' },
    delivered: { bg: '#f0fdf4', color: '#15803d', border: '#86efac' },
    cancelled: { bg: '#fee2e2', color: '#dc2626', border: '#fecaca' },
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: BROWN }}>Orders ({orders.length})</h2>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6b7280' }}>WhatsApp orders tracked here. Manually add orders after WhatsApp conversations.</p>
        </div>
        <Btn onClick={addSample} variant="ghost" small>+ Add Sample Order</Btn>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, background: 'white', borderRadius: 12, border: '1px solid #f3f4f6' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
          <h3 style={{ color: BROWN, fontFamily: 'Bebas Neue, sans-serif', fontSize: 24 }}>No orders yet</h3>
          <p style={{ fontSize: 13, color: '#6b7280' }}>Orders come through WhatsApp. Add them here to track status.</p>
          <Btn onClick={addSample} variant="primary" style={{ marginTop: 12 }}>Add Sample Order</Btn>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {orders.map(o => {
            const sc = STATUS_COLORS[o.status] || STATUS_COLORS.pending
            return (
              <div key={o.id} style={{ background: 'white', borderRadius: 12, padding: 16, border: '1px solid #f3f4f6', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: BROWN, marginBottom: 4 }}>#{String(o.id).slice(-6)} — {o.product}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      {o.size} · {o.color} · Qty {o.qty} · <strong style={{ color: BROWN }}>₹{Number(o.price).toLocaleString('en-IN')}</strong>
                    </div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>{o.date} · {o.customer}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, borderRadius: 6, padding: '4px 10px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>
                      {o.status}
                    </span>
                    <button onClick={() => del(o.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 18 }}>×</button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                  {['pending','confirmed','shipped','delivered','cancelled'].map(s => (
                    <button key={s} onClick={() => updateStatus(o.id, s)}
                      style={{ padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: `1px solid ${o.status === s ? BROWN : '#e5e7eb'}`, background: o.status === s ? BROWN : 'white', color: o.status === s ? GOLD : '#374151', textTransform: 'capitalize' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ───────────── Settings Tab ───────────── */
function SettingsTab({ onLogout }) {
  const [wa, setWa] = useState(localStorage.getItem('nami_wa') || '918607232326')
  const [saved, setSaved] = useState(false)

  const save = () => {
    localStorage.setItem('nami_wa', wa)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: BROWN, marginBottom: 20 }}>Settings</h2>

      <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid #f3f4f6', marginBottom: 16 }}>
        <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: BROWN, margin: '0 0 16px' }}>WhatsApp Number</h3>
        <Input label="WhatsApp Number (with country code)" value={wa} onChange={e => setWa(e.target.value)} placeholder="918607232326" />
        <p style={{ fontSize: 11, color: '#6b7280', margin: '-8px 0 12px' }}>Format: country code + number, no + or spaces. E.g. 918607232326 for India +91 86072 32326</p>
        <Btn onClick={save} variant="primary">Save</Btn>
        {saved && <span style={{ marginLeft: 10, color: '#16a34a', fontSize: 12 }}>✓ Saved</span>}
      </div>

      <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid #f3f4f6', marginBottom: 16 }}>
        <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: BROWN, margin: '0 0 12px' }}>Admin Password</h3>
        <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 12px' }}>
          Password is set via environment variable in your <code>.env</code> file:<br/>
          <code style={{ background: '#f3f4f6', padding: '4px 8px', borderRadius: 4, display: 'inline-block', marginTop: 6 }}>VITE_ADMIN_PASSWORD=yourpassword</code>
        </p>
        <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>Current: {PASS_ENV === 'nami2024' ? '⚠ Using default password — change in .env' : '✓ Custom password set'}</p>
      </div>

      <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid #f3f4f6' }}>
        <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: BROWN, margin: '0 0 16px' }}>Data Management</h3>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Btn onClick={() => {
            const data = {
              products: localStorage.getItem(STORAGE_KEY),
              orders:   localStorage.getItem(ORDERS_KEY),
              hero:     localStorage.getItem(HERO_KEY),
            }
            navigator.clipboard.writeText(JSON.stringify(data, null, 2))
            alert('All admin data copied to clipboard!')
          }} variant="ghost">Export Backup</Btn>
          <Btn onClick={onLogout} variant="danger">Logout</Btn>
        </div>
      </div>
    </div>
  )
}

/* ───────────── Main Admin Panel ───────────── */
export default function AdminPage() {
  const [authed, setAuthed]   = useState(() => sessionStorage.getItem('nami_admin') === '1')
  const [tab, setTab]         = useState('products')
  const [products, setProducts] = useState(() => getStoredProducts() || defaultProducts)

  const login  = () => { sessionStorage.setItem('nami_admin', '1'); setAuthed(true) }
  const logout = () => { sessionStorage.removeItem('nami_admin'); setAuthed(false) }

  if (!authed) return <Login onLogin={login} />

  const TABS = [
    { id: 'products', label: '📦 Products' },
    { id: 'orders',   label: '🛒 Orders' },
    { id: 'hero',     label: '🖼 Hero Banner' },
    { id: 'settings', label: '⚙ Settings' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: CREAM, display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ background: BROWN, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 54, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src="/logo.png" alt="Nami" style={{ height: 34, filter: 'brightness(0) invert(1)' }} />
          <span style={{ color: GOLD, fontFamily: 'Bebas Neue, sans-serif', fontSize: 20, letterSpacing: '0.05em' }}>Admin Panel</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="/" target="_blank" style={{ color: GOLD, fontSize: 11, textDecoration: 'none', opacity: 0.8 }}>View Site →</a>
          <button onClick={logout} style={{ background: 'none', border: `1px solid ${GOLD}55`, color: GOLD, borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontSize: 11 }}>Logout</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <div style={{ width: 200, background: 'white', borderRight: '1px solid #f3f4f6', padding: '20px 0', flexShrink: 0 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 20px', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: tab === t.id ? 700 : 500, background: tab === t.id ? CREAM : 'transparent', color: tab === t.id ? BROWN : '#6b7280', borderLeft: tab === t.id ? `3px solid ${GOLD}` : '3px solid transparent', transition: 'all 0.15s' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: 28, overflowY: 'auto', maxHeight: 'calc(100vh - 54px)' }}>
          {tab === 'products' && <ProductsTab products={products} setProducts={setProducts} />}
          {tab === 'orders'   && <OrdersTab />}
          {tab === 'hero'     && <HeroTab />}
          {tab === 'settings' && <SettingsTab onLogout={logout} />}
        </div>
      </div>
    </div>
  )
}
