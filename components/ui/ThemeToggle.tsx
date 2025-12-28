'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button
        className="inline-flex items-center justify-center p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
        aria-label="Theme toggle"
        disabled
      >
        <Moon className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  )
}

