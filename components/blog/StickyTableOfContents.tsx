'use client'

import { useEffect, useState, useRef } from 'react'
import { Menu, X } from 'lucide-react'

interface Heading {
  id: string
  text: string
  number: number
}

interface StickyTableOfContentsProps {
  content: string
  postSlug: string
}

export default function StickyTableOfContents({ content, postSlug }: StickyTableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const tocRef = useRef<HTMLDivElement>(null)

  // Only show for Valentine's Day article
  const isValentinesDayArticle = postSlug.includes('15-unique-valentines-day')

  useEffect(() => {
    if (!isValentinesDayArticle) return

    // Extract H2 headings that start with numbers (the 15 ideas)
    const headingRegex = /^##\s+(\d+)\.\s+(.+)$/gm
    const matches = Array.from(content.matchAll(headingRegex))
    const extractedHeadings: Heading[] = matches.map((match) => {
      const number = parseInt(match[1], 10)
      const text = match[2].split(':')[0] // Get text before colon if present
      // Create ID from heading text (sanitized)
      const id = `idea-${number}-${text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')}`
      
      return {
        id,
        text: `${number}. ${text}`,
        number,
      }
    })

    setHeadings(extractedHeadings)
  }, [content, isValentinesDayArticle])

  // Track active section on scroll
  useEffect(() => {
    if (!isValentinesDayArticle || headings.length === 0) return

    let observer: IntersectionObserver | null = null

    // Wait for DOM to be ready
    const timeoutId = setTimeout(() => {
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      }

      observer = new IntersectionObserver(observerCallback, observerOptions)

      headings.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) {
          observer?.observe(element)
        }
      })
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      if (observer) {
        headings.forEach((heading) => {
          const element = document.getElementById(heading.id)
          if (element) {
            observer.unobserve(element)
          }
        })
      }
    }
  }, [headings, isValentinesDayArticle])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Account for sticky header (80px on desktop, 64px on mobile) plus padding
      // We want enough space so the TOC remains visible when scrolling
      const headerHeight = window.innerWidth >= 1024 ? 80 : 64
      const offset = headerHeight + 40 // Extra padding to keep TOC visible
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: Math.max(0, offsetPosition), // Ensure we don't scroll to negative position
        behavior: 'smooth',
      })

      // On mobile, keep TOC open so users can easily access other ideas
      // Only close if we're on a very small screen where space is limited
      if (window.innerWidth < 640) {
        // Small delay to allow smooth scroll, then close
        setTimeout(() => setIsOpen(false), 500)
      }
    }
  }

  if (!isValentinesDayArticle || headings.length === 0) return null

  return (
    <>
      {/* Mobile TOC Button - Only render when in main content area */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
          aria-label="Toggle table of contents"
          aria-expanded={isOpen}
        >
          <span className="font-semibold text-gray-900 dark:text-white">
            Jump to Idea
          </span>
          {isOpen ? (
            <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {/* Mobile TOC Dropdown */}
        {isOpen && (
          <div className="mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-[400px] overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                15 Ideas
              </h3>
              <nav aria-label="Table of contents">
                <ul className="space-y-1">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <button
                        onClick={() => handleClick(heading.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors touch-manipulation ${
                          activeId === heading.id
                            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {heading.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sticky TOC */}
      <div
        ref={tocRef}
        className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgb(209 213 219) transparent',
        }}
      >
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
            15 Ideas
          </h3>
          <nav aria-label="Table of contents">
            <ul className="space-y-1">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => handleClick(heading.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors ${
                      activeId === heading.id
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

