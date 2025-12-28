'use client'

import { X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface StickySidebarAdProps {
  className?: string
}

export default function StickySidebarAd({ className = '' }: StickySidebarAdProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  useEffect(() => {
    // Only show on desktop (lg breakpoint and above)
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) {
        // Show after user scrolls down 300px
        const handleScroll = () => {
          if (window.scrollY > 300 && !isClosed) {
            setIsVisible(true)
          } else if (window.scrollY <= 300) {
            setIsVisible(false)
          }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
      } else {
        setIsVisible(false)
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [isClosed])

  const handleClose = () => {
    setIsClosed(true)
    setIsVisible(false)
    // Store in sessionStorage (only for current session)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('sidebarAdClosed', 'true')
    }
  }

  useEffect(() => {
    // Check if user closed the ad in this session
    if (typeof window !== 'undefined') {
      const wasClosed = sessionStorage.getItem('sidebarAdClosed')
      if (wasClosed === 'true') {
        setIsClosed(true)
      }
    }
  }, [])

  if (!isVisible || isClosed) return null

  return (
    <div
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block ${className}`}
      role="complementary"
      aria-label="Advertisement"
    >
      <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl w-64">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 min-w-[44px] min-h-[44px] flex items-center justify-center shadow-md text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors border border-gray-200 dark:border-gray-700 touch-manipulation"
          aria-label="Close advertisement"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Ad Content */}
        <div className="p-4">
          <div className="bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-gray-400 dark:text-gray-500 text-sm p-4">
              <p className="font-medium">Advertisement</p>
              <p className="text-xs mt-1">300x600 / 160x600</p>
              <p className="text-xs mt-1 text-gray-300 dark:text-gray-400">Sticky Sidebar Ad</p>
              <p className="text-xs mt-2 text-gray-300 dark:text-gray-400">Desktop Only</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

