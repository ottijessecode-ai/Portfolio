'use client'
import { useEffect, useRef } from 'react'

export default function AvatarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const img = new Image()
    img.src = '/new-avatar.jpeg'
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return
      
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      
      // The background colour typically found at [0,0]
      const bgR = data[0], bgG = data[1], bgB = data[2]
      
      // Strict tolerance array to preserve white clothing (like the durag)
      // Only completely drops pure/near-pure white
      const exactTolerance = 15
      const smoothTolerance = 25
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i+1], b = data[i+2]
        
        // Broadened threshold to ensure a "true cutout" of the background while preserving character details
        if (r > 200 && g > 200 && b > 200) {
          const dist = Math.sqrt(
            Math.pow(r - bgR, 2) + 
            Math.pow(g - bgG, 2) + 
            Math.pow(b - bgB, 2)
          )
          
          if (dist <= exactTolerance) {
            data[i+3] = 0 // Absolute transparency
          } else if (dist <= smoothTolerance) {
            // Professional-grade feathering for high-impact cutout edges
            const alphaFactor = (dist - exactTolerance) / (smoothTolerance - exactTolerance)
            data[i+3] = Math.floor(255 * alphaFactor)
          }
        }
      }
      ctx.putImageData(imageData, 0, 0)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover',
        objectPosition: 'top',
        filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.15))'
      }} 
    />
  )
}
