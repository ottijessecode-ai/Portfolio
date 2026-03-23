interface TornPaperProps {
  fromColor?: string
  toColor?: string
  flip?: boolean
  height?: number
}

export default function TornPaper({
  fromColor = '#111111',
  toColor = '#F2EFE6',
  flip = false,
  height = 80,
}: TornPaperProps) {
  return (
    <div
      style={{
        position: 'relative',
        height: `${height}px`,
        background: fromColor,
        overflow: 'hidden',
        transform: flip ? 'scaleY(-1)' : 'none',
        marginBottom: flip ? `-${height}px` : 0,
        zIndex: 2,
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 L0,40 C50,55 100,20 160,38 C220,56 270,30 340,45 C410,60 450,25 520,42 C590,59 640,28 700,44 C760,60 810,22 880,40 C950,58 1000,26 1070,43 C1140,60 1190,28 1260,45 C1330,62 1380,30 1440,48 L1440,0 Z"
          fill={toColor}
        />
      </svg>
    </div>
  )
}
