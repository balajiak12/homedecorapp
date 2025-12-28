import { blogPosts } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import AdSlot from '@/components/blog/AdSlot'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Holidays Decor Ideas & Inspiration | Modern Life Maven',
  description: 'Discover inspiring holiday decor ideas, seasonal design tips, and expert advice for celebrating throughout the year.',
}

export default function HolidaysCategoryPage() {
  // Filter to only holiday posts
  const posts = blogPosts.filter(post => {
    const category = post.category.toLowerCase()
    return category.includes('holiday') || category === 'valentines day'
  })

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Holidays' },
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
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Holidays
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Discover inspiring holiday decor ideas, seasonal design tips, and expert advice to celebrate throughout the year.
          </p>
        </div>
      </section>

      {/* Ad Slot */}
      <div className="container-custom py-8">
        <AdSlot position="header" size="banner" />
      </div>

      {/* Posts Grid */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Ad Slot - Inline */}
          <div className="mt-12">
            <AdSlot position="inline" size="rectangle" />
          </div>
        </div>
      </section>
    </>
  )
}

