'use client'

export const EmailIcon = ({ size = 20, color = 'currentColor' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

export const WhatsAppIcon = ({ size = 20, color = 'currentColor' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12.031 6.062c-3.414 0-6.191 2.777-6.191 6.191 0 1.294.402 2.49 1.09 3.477l-.715 2.614 2.674-.701a6.114 6.114 0 0 0 3.142.859c3.414 0 6.191-2.777 6.191-6.191s-2.777-6.191-6.191-6.191zm3.626 8.712c-.148.415-.856.776-1.222.823-.343.044-.738.063-2.155-.518-1.728-.712-2.847-2.473-2.933-2.587-.086-.115-.697-.914-.697-1.743s.434-1.245.589-1.413c.155-.168.337-.21.45-.21s.225.001.325.006c.105.005.215-.045.337.243s.413 1.01.45 1.085c.037.075.062.162.012.262s-.075.162-.15.25c-.075.088-.157.195-.225.262-.075.075-.153.157-.066.307.087.15.385.635.826 1.026.568.503 1.048.658 1.198.733s.225.038.307-.057c.088-.095.362-.412.463-.556.101-.144.205-.12.333-.075s.812.383.953.454.238.108.273.168c.035.06.035.348-.113.763z" />
  </svg>
)

export const LinkedInIcon = ({ size = 20, color = 'currentColor' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)
