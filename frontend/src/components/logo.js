'use client'
import { useState } from 'react'
import { Code } from 'lucide-react'

export default function Logo() {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    // Fallback when image fails to load
    return (
      <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
        <Code className="w-6 h-6 text-white" />
      </div>
    )
  }

  return (
    <img 
      src="/tinker-logo.png" 
      alt="Tinkerly" 
      className="w-10 h-10 rounded-lg"
      onError={() => setImageError(true)}
    />
  )
}