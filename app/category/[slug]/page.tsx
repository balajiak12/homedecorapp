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

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Home Decor', href: '/category/home-decor' },
    { label: `${categoryName} Decor` },
  ]

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            {categoryName} Decor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Discover inspiring {categoryName.toLowerCase()} decor ideas, design tips, and expert advice to transform your space.
          </p>
        </div>
      </section>

      {/* Ad Slot */}
      <div className="container-custom py-8">
        <AdSlot position="header" size="banner" />
      </div>

      {/* Posts Grid */}
      <section className="py-12 bg-white">
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

