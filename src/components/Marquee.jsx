export default function Marquee() {
  const items = ['Premium Footwear', '100% Made In India', 'Born In Delhi', 'Built For India', 'Everything Footwear', 'Crafted With Passion']
  const doubled = [...items, ...items]

  return (
    <div style={{ background: '#2C1200', borderTop: '1px solid rgba(196,154,60,0.3)', borderBottom: '1px solid rgba(196,154,60,0.3)', padding: '11px 0', overflow: 'hidden' }}>
      <div className="marquee-track" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 16, padding: '0 24px' }}>
            <span style={{ color: '#DDB968', fontSize: 10, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase' }}>{item}</span>
            <span style={{ color: 'rgba(196,154,60,0.4)' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
