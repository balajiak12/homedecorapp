import { getBlogPostsByCategory } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import AdSlot from '@/components/blog/AdSlot'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface PageProps {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: PageProps): Metadata {
  const categoryName = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${categoryName} Decor Ideas & Inspiration`,
    description: `Discover the latest ${categoryName.toLowerCase()} decor ideas, design tips, and inspiration for creating beautiful spaces.`,
  }
}

export default function CategoryPage({ params }: PageProps) {
  const posts = getBlogPostsByCategory(params.slug)
  const categoryName = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  if (posts.length === 0) {
    notFound()
  }

  // Build breadcrumb items - match the URL structure (just Home → Category)
  const isHolidayCategory = params.slug === 'holidays' || params.slug === 'valentines-day'
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: isHolidayCategory ? categoryName : `${categoryName} Decor` },
  ]

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 py-12 sm:py-16">
        <div className="container-custom">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {categoryName} Decor
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Discover inspiring {categoryName.toLowerCase()} decor ideas, design tips, and expert advice to transform your space.
          </p>
        </div>
      </section>

      {/* Ad Slot */}
      <div className="container-custom py-6 sm:py-8">
        <AdSlot position="header" size="banner" />
      </div>

      {/* Posts Grid */}
      <section className="py-8 sm:py-12 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Ad Slot - Inline */}
          <div className="mt-8 sm:mt-12">
            <AdSlot position="inline" size="rectangle" />
          </div>
        </div>
      </section>
    </>
  )
}

