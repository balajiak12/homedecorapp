'use client'

import { X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface BottomBannerAdProps {
  className?: string
}

export default function BottomBannerAd({ className = '' }: BottomBannerAdProps) {
  // Use mounted state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user closed the ad in this session
    const wasClosed = sessionStorage.getItem('bottomBannerAdClosed')
    if (wasClosed === 'true') {
      setIsClosed(true)
    }
  }, [])

  const handleClose = () => {
    setIsClosed(true)
    // Store in sessionStorage (only for current session)
    sessionStorage.setItem('bottomBannerAdClosed', 'true')
  }

  // Don't render until mounted (prevents hydration issues)
  if (!mounted || isClosed) return null

  return (
    <div
      className={`bottom-banner-ad fixed bottom-0 left-0 right-0 z-[100] bg-white dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-700 shadow-2xl ${className}`}
      role="complementary"
      aria-label="Advertisement"
    >
      <div className="container-custom py-3">
        <div className="relative flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close advertisement"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Ad Content */}
          <div className="w-full max-w-5xl mx-auto">
            <div className="bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-24 md:h-32 flex items-center justify-center">
              <div className="text-center text-gray-400 dark:text-gray-500 text-sm">
                <p className="font-medium">Advertisement</p>
                <p className="text-xs mt-1">728x90 / 970x250 Banner</p>
                <p className="text-xs mt-1 text-gray-300 dark:text-gray-400">Bottom Banner Ad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

