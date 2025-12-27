'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Clock } from 'lucide-react'
import { blogPosts } from '@/lib/blog'
import type { BlogPost } from '@/types/blog'
import { format } from 'date-fns'
import Image from 'next/image'

interface SearchResult extends BlogPost {
  matchScore: number
}

export default function SearchAutosuggest() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Debounced search function
  const searchResults = useMemo(() => {
    if (!query.trim() || query.length < 2) return []

    const searchTerm = query.toLowerCase().trim()
    const results: SearchResult[] = []

    blogPosts.forEach((post) => {
      let score = 0
      const titleMatch = post.title.toLowerCase().includes(searchTerm)
      const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm)
      const categoryMatch = post.category.toLowerCase().includes(searchTerm)
      const tagMatches = post.tags.filter((tag) => tag.toLowerCase().includes(searchTerm)).length

      if (titleMatch) score += 10
      if (post.title.toLowerCase().startsWith(searchTerm)) score += 5
      if (excerptMatch) score += 3
      if (categoryMatch) score += 2
      if (tagMatches > 0) score += tagMatches

      if (score > 0) {
        results.push({ ...post, matchScore: score })
      }
    })

    // Sort by relevance score (highest first), then by date
    return results
      .sort((a, b) => {
        if (b.matchScore !== a.matchScore) {
          return b.matchScore - a.matchScore
        }
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      })
      .slice(0, 6) // Limit to 6 results
  }, [query])

  const handleSelect = useCallback((post: BlogPost) => {
    router.push(`/blog/${post.slug}`)
    setIsOpen(false)
    setQuery('')
    setSelectedIndex(-1)
    inputRef.current?.blur()
  }, [router])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setQuery('')
        setSelectedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen || searchResults.length === 0) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
      } else if (e.key === 'Enter' && selectedIndex >= 0 && searchResults[selectedIndex]) {
        e.preventDefault()
        handleSelect(searchResults[selectedIndex])
      } else if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
        setSelectedIndex(-1)
        inputRef.current?.blur()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, searchResults, selectedIndex, handleSelect])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsOpen(value.length >= 2)
    setSelectedIndex(-1)
  }

  const handleInputFocus = () => {
    if (query.length >= 2 && searchResults.length > 0) {
      setIsOpen(true)
    }
  }

  const clearSearch = () => {
    setQuery('')
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  return (
    <div ref={searchRef} className="relative">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Autosuggest Dropdown */}
      {isOpen && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[500px] overflow-y-auto">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
            </div>
            {searchResults.map((post, index) => (
              <button
                key={post.id}
                type="button"
                onClick={() => handleSelect(post)}
                className={[
                  'w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors',
                  index === selectedIndex
                    ? 'bg-primary-50 border border-primary-200'
                    : 'hover:bg-gray-50 border border-transparent',
                ].join(' ')}
              >
                <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime} min</span>
                    </div>
                    <time dateTime={post.publishedAt}>
                      {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                    </time>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && searchResults.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          <p className="text-sm text-gray-600 text-center">
            No articles found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  )
}

