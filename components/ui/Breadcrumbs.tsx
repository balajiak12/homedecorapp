import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 text-sm ${className}`}
    >
      <ol className="flex items-center space-x-2" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isFirst = index === 0

          return (
            <li
              key={index}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isFirst ? (
                <Link
                  href={item.href || '/'}
                  className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  itemProp="item"
                >
                  <Home className="h-4 w-4" />
                  <span className="sr-only" itemProp="name">Home</span>
                </Link>
              ) : isLast ? (
                <span
                  className="text-gray-900 dark:text-white font-medium"
                  itemProp="name"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 1)} />
              {!isLast && (
                <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 mx-2 flex-shrink-0" aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

