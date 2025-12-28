'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Bath, BedDouble, ChevronDown, Heart, Home, Menu, Sofa, Trees, UtensilsCrossed, X } from 'lucide-react'
import SearchAutosuggest from '@/components/ui/SearchAutosuggest'
import ThemeToggle from '@/components/ui/ThemeToggle'

type NavItem = {
  name: string
  href: string
}

type CategoryItem = {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  subcategories: NavItem[]
}

export default function Header() {
  // Categories array - can be expanded with more categories
  const categories: CategoryItem[] = useMemo(
    () => [
      {
        name: 'Home Decor',
        href: '/home-decor',
        icon: Home,
        subcategories: [
          { name: 'Living Room', href: '/home-decor/living-room' },
          { name: 'Bedroom', href: '/home-decor/bedroom' },
          { name: 'Kitchen', href: '/home-decor/kitchen' },
          { name: 'Bathroom', href: '/home-decor/bathroom' },
          { name: 'Outdoor', href: '/home-decor/outdoor' },
        ],
      },
      {
        name: 'Holidays',
        href: '/holidays',
        icon: Heart,
        subcategories: [
          { name: "Valentine's Day", href: '/holidays/valentines-day' },
        ],
      },
    ],
    []
  )
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement | null>(null)
  const [openCategoryHref, setOpenCategoryHref] = useState<string | null>(null)
  const [openMobileCategoryHref, setOpenMobileCategoryHref] = useState<string | null>(null)

  const openCategory = useMemo(
    () => categories.find((cat) => cat.href === openCategoryHref) || null,
    [categories, openCategoryHref]
  )

  // Check if current path is a subcategory of any category
  const getActiveCategory = useMemo(() => {
    return categories.find(
      (cat) =>
        cat.subcategories.some((sub) => pathname === sub.href) || pathname === cat.href
    )
  }, [categories, pathname])

  useEffect(() => {
    // Close dropdown when route changes
    setOpenCategoryHref(null)
    setOpenMobileCategoryHref(null)
  }, [pathname])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenCategoryHref(null)
        setMobileMenuOpen(false)
        setOpenMobileCategoryHref(null)
      }
    }

    function onPointerDown(e: MouseEvent | PointerEvent) {
      if (!headerRef.current) return
      const target = e.target as Node
      // Don't close if clicking inside the header (including dropdown panels)
      if (target && !headerRef.current.contains(target)) {
        setOpenCategoryHref(null)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  return (
    <header
      ref={(el) => {
        headerRef.current = el
      }}
      className="sticky top-0 z-50 border-b border-gray-200/70 dark:border-gray-700/70 bg-white/90 dark:bg-gray-900/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/70"
    >
      <nav className="container-custom" aria-label="Global">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl sm:text-2xl font-serif font-bold text-primary-600 dark:text-primary-400">
                Modern Life Maven
              </span>
            </Link>
          </div>

          {/* Desktop Categories */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-start lg:pl-6">
            <div className="flex items-center gap-2">
              {categories.map((category) => {
                const Icon = category.icon
                const isActive = getActiveCategory?.href === category.href
                const isOpen = openCategoryHref === category.href
                return (
                  <button
                    key={category.href}
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    className={[
                      'group inline-flex items-center gap-2 rounded-lg px-3 py-2.5 min-h-[44px] text-sm font-medium transition-colors touch-manipulation',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                      isActive
                        ? 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800',
                    ].join(' ')}
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenCategoryHref((prev) => (prev === category.href ? null : category.href))
                    }}
                  >
                    <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors" />
                    <span className="whitespace-nowrap">{category.name}</span>
                    <ChevronDown
                      className={[
                        'h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform',
                        isOpen ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Search + Theme Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-4 lg:flex-1 lg:justify-end">
            <div className="hidden lg:block w-80">
              <SearchAutosuggest />
            </div>
            <div className="lg:hidden w-32 xs:w-40 sm:w-48">
              <SearchAutosuggest />
            </div>
            <ThemeToggle />
            <button
              type="button"
              className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 touch-manipulation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Subcategory Panel */}
        {openCategory && (
          <div className="hidden lg:block pb-4 pt-2">
            <div
              role="menu"
              aria-label={`${openCategory.name} subcategories`}
              className="relative z-10"
            >
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-5">
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-2">
                  {openCategory.subcategories.map((sub) => {
                    const subcategoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
                      'Living Room': Sofa,
                      'Bedroom': BedDouble,
                      'Kitchen': UtensilsCrossed,
                      'Bathroom': Bath,
                      'Outdoor': Trees,
                      "Valentine's Day": Heart,
                    }
                    const SubIcon = subcategoryIcons[sub.name]
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="rounded-xl px-4 py-3 min-h-[44px] text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 touch-manipulation"
                        onClick={() => setOpenCategoryHref(null)}
                      >
                        {SubIcon && <SubIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
                        {sub.name}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-5">
            <div className="space-y-6">
              <div className="px-2">
                <p className="px-2 text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase">
                  Categories
                </p>
                <div className="mt-3 space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon
                    const isOpen = openMobileCategoryHref === category.href
                    const isActive = getActiveCategory?.href === category.href
                    return (
                      <div key={category.href} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                        <button
                          type="button"
                          className={[
                            'w-full flex items-center justify-between gap-3 px-4 py-3 min-h-[44px] text-sm font-semibold transition-colors touch-manipulation',
                            isActive ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700',
                          ].join(' ')}
                          onClick={() => setOpenMobileCategoryHref((prev) => (prev === category.href ? null : category.href))}
                          aria-expanded={isOpen}
                        >
                          <span className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            {category.name}
                          </span>
                          <ChevronDown className={['h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform', isOpen ? 'rotate-180' : ''].join(' ')} />
                        </button>
                        {isOpen ? (
                          <div className="px-2 pb-3">
                            <div className="grid grid-cols-1 gap-1">
                              {category.subcategories.map((sub) => {
                                const subcategoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
                                  'Living Room': Sofa,
                                  'Bedroom': BedDouble,
                                  'Kitchen': UtensilsCrossed,
                                  'Bathroom': Bath,
                                  'Outdoor': Trees,
                                  "Valentine's Day": Heart,
                                }
                                const SubIcon = subcategoryIcons[sub.name]
                                return (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    className="rounded-xl px-3 py-2.5 min-h-[44px] text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 touch-manipulation"
                                    onClick={() => {
                                      setMobileMenuOpen(false)
                                      setOpenMobileCategoryHref(null)
                                    }}
                                  >
                                    {SubIcon && <SubIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
                                    {sub.name}
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
