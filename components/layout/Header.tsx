'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Bath, BedDouble, ChevronDown, Heart, Home, Menu, Sofa, Trees, UtensilsCrossed, X } from 'lucide-react'
import SearchAutosuggest from '@/components/ui/SearchAutosuggest'

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
        href: '/category/home-decor',
        icon: Home,
        subcategories: [
          { name: 'Living Room', href: '/category/living-room' },
          { name: 'Bedroom', href: '/category/bedroom' },
          { name: 'Kitchen', href: '/category/kitchen' },
          { name: 'Bathroom', href: '/category/bathroom' },
          { name: 'Outdoor', href: '/category/outdoor' },
        ],
      },
      {
        name: 'Holidays',
        href: '/category/holidays',
        icon: Heart,
        subcategories: [
          { name: "Valentine's Day", href: '/category/valentines-day' },
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
      className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70"
    >
      <nav className="container-custom" aria-label="Global">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-serif font-bold text-primary-600">
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
                      'group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                      isActive
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50',
                    ].join(' ')}
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenCategoryHref((prev) => (prev === category.href ? null : category.href))
                    }}
                  >
                    <Icon className="h-4 w-4 text-gray-500 group-hover:text-primary-700 transition-colors" />
                    <span className="whitespace-nowrap">{category.name}</span>
                    <ChevronDown
                      className={[
                        'h-4 w-4 text-gray-400 transition-transform',
                        isOpen ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Search + Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:flex-1 lg:justify-end">
            <div className="hidden lg:block w-80">
              <SearchAutosuggest />
            </div>
            <div className="lg:hidden w-48 sm:w-56">
              <SearchAutosuggest />
            </div>
            <button
              type="button"
              className="lg:hidden p-2 rounded-full text-gray-700 hover:bg-gray-50"
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
              <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                      {openCategory.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      Explore ideas, guides, and product picks.
                    </p>
                  </div>
                  <Link
                    href={openCategory.href}
                    className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors"
                    onClick={() => setOpenCategoryHref(null)}
                  >
                    View all
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 xl:grid-cols-3 gap-2">
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
                        className="rounded-xl px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        onClick={() => setOpenCategoryHref(null)}
                      >
                        {SubIcon && <SubIcon className="h-4 w-4 text-gray-500" />}
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
          <div className="lg:hidden border-t border-gray-200 py-5">
            <div className="space-y-6">
              <div className="px-2">
                <p className="px-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Categories
                </p>
                <div className="mt-3 space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon
                    const isOpen = openMobileCategoryHref === category.href
                    const isActive = getActiveCategory?.href === category.href
                    return (
                      <div key={category.href} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                        <button
                          type="button"
                          className={[
                            'w-full flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold transition-colors',
                            isActive ? 'bg-primary-50 text-primary-800' : 'text-gray-800 hover:bg-gray-50',
                          ].join(' ')}
                          onClick={() => setOpenMobileCategoryHref((prev) => (prev === category.href ? null : category.href))}
                          aria-expanded={isOpen}
                        >
                          <span className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-gray-500" />
                            {category.name}
                          </span>
                          <ChevronDown className={['h-4 w-4 text-gray-400 transition-transform', isOpen ? 'rotate-180' : ''].join(' ')} />
                        </button>
                        {isOpen ? (
                          <div className="px-2 pb-3">
                            <Link
                              href={category.href}
                              className="block rounded-xl px-3 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50 transition-colors"
                              onClick={() => {
                                setMobileMenuOpen(false)
                                setOpenMobileCategoryHref(null)
                              }}
                            >
                              View all {category.name}
                            </Link>
                            <div className="mt-1 grid grid-cols-1 gap-1">
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
                                    className="rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                    onClick={() => {
                                      setMobileMenuOpen(false)
                                      setOpenMobileCategoryHref(null)
                                    }}
                                  >
                                    {SubIcon && <SubIcon className="h-4 w-4 text-gray-500" />}
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
