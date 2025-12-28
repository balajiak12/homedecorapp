import { getBlogPostsByCategory, getBlogPost } from '@/lib/blog'
import { blogPosts } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import AdSlot from '@/components/blog/AdSlot'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BlogPostPageContent from '@/components/blog/BlogPostPageContent'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  // Generate params for both blog posts and category pages
  const blogPostSlugs = blogPosts
    .filter(post => {
      const isHolidayCategory = post.category === 'Valentines Day' || post.category.toLowerCase().includes('holiday')
      return !isHolidayCategory // Only home decor posts
    })
    .map(post => ({ slug: post.slug }))
  
  // Add category slugs
  const categorySlugs = ['living-room', 'bedroom', 'kitchen', 'bathroom', 'outdoor'].map(slug => ({ slug }))
  
  return [...blogPostSlugs, ...categorySlugs]
}

export function generateMetadata({ params }: PageProps): Metadata {
  // Check if it's a blog post first
  const post = getBlogPost(params.slug)
  if (post) {
    return {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      keywords: post.seo?.keywords || post.tags,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [post.featuredImage],
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author.name],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.featuredImage],
      },
    }
  }

  // Otherwise it's a category page
  const categoryName = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${categoryName} Decor Ideas & Inspiration`,
    description: `Discover the latest ${categoryName.toLowerCase()} decor ideas, design tips, and inspiration for creating beautiful spaces.`,
  }
}

export default function HomeDecorSubcategoryPage({ params }: PageProps) {
  // Check if it's a blog post first
  const post = getBlogPost(params.slug)
  if (post) {
    // Verify it's a home decor post (not holiday)
    const isHolidayCategory = post.category === 'Valentines Day' || post.category.toLowerCase().includes('holiday')
    if (isHolidayCategory) {
      // This should be handled by /holidays/[slug]
      notFound()
    }
    
    // Render blog post page
    const parentCategory = { label: 'Home Decor', href: '/home-decor' }
    const breadcrumbItems = [
      { label: 'Home', href: '/' },
      parentCategory,
      { label: post.title },
    ]

    return <BlogPostPageContent post={post} breadcrumbItems={breadcrumbItems} />
  }

  // Otherwise it's a category page
  const posts = getBlogPostsByCategory(params.slug)
  const categoryName = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  if (posts.length === 0) {
    notFound()
  }

  // Build breadcrumb items - match the URL structure
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Home Decor', href: '/home-decor' },
    { label: `${categoryName} Decor` },
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
            {categoryName} Decor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Discover inspiring {categoryName.toLowerCase()} decor ideas, design tips, and expert advice to transform your space.
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

