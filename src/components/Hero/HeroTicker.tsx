'use client'

const tickerItems = [
  { label: 'Website Design', accent: true },
  { label: 'Webflow Development', accent: false },
  { label: 'High-Converting Pages', accent: true },
  { label: 'Next.js & React', accent: false },
  { label: 'Performance Optimization', accent: true },
  { label: 'Brand Identity', accent: false },
  { label: 'UI/UX Design', accent: true },
  { label: 'Template Design', accent: false },
]

export default function HeroTicker() {
  // Duplicate for seamless loop
  const items = [...tickerItems, ...tickerItems]

  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(10px)',
        padding: '18px 0',
      }}
    >
      <div
        className="ticker-track"
        style={{
          display: 'flex',
          gap: '0',
          animationDuration: '30s',
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: item.accent ? 'var(--teal)' : 'rgba(248,246,242,0.4)',
                padding: '0 30px',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgba(74,191,181,0.4)',
                flexShrink: 0,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
