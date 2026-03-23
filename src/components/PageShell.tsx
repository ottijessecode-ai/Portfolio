'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('./Navigation/Navbar'), { ssr: false })
const ToggleMenu = dynamic(() => import('./Navigation/ToggleMenu'), { ssr: false })

export default function PageShell() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Navbar
        onMenuToggle={() => setMenuOpen((prev) => !prev)}
        menuOpen={menuOpen}
      />
      <ToggleMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  )
}
