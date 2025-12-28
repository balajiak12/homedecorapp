import { getBlogPost, getBlogPostsByCategory, blogPosts } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import AdSlot from '@/components/blog/AdSlot'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BlogPostPageContent from '@/components/blog/BlogPostPageContent'

interface PageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  // Generate params for category pages: [category-slug]
  const categorySlugs = ['valentines-day'].map(slug => ({ 
    slug: [slug] 
  }))
  
  // Generate params for blog posts: [category, post-slug]
  const holidayPosts = blogPosts.filter(post => {
    const isHolidayCategory = post.category === 'Valentines Day' || post.category.toLowerCase().includes('holiday')
    return isHolidayCategory
  })
  
  const blogPostParams = holidayPosts.map(post => {
    const categorySlug = post.category.toLowerCase().replace(/\s+/g, '-')
    return {
      slug: [categorySlug, post.slug],
    }
  })
  
  return [...categorySlugs, ...blogPostParams]
}

export function generateMetadata({ params }: PageProps): Metadata {
  // If slug is an array with 2 elements, it's a blog post: [category, post-slug]
  if (params.slug.length === 2) {
    const [category, postSlug] = params.slug
    const post = getBlogPost(postSlug)
    
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
        },
        twitter: {
          card: 'summary_large_image',
          title: post.title,
          description: post.excerpt,
          images: [post.featuredImage],
        },
      }
    }
  }
  
  // Category page metadata
  const categorySlug = params.slug[0]
  const categoryName = categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${categoryName} Decor Ideas & Inspiration`,
    description: `Discover the latest ${categoryName.toLowerCase()} decor ideas, design tips, and inspiration.`,
  }
}

export default function HolidaysPage({ params }: PageProps) {
  // If slug is an array with 2 elements, it's a blog post: [category, post-slug]
  if (params.slug.length === 2) {
    const [category, postSlug] = params.slug
    const post = getBlogPost(postSlug)
    
    if (!post) {
      notFound()
    }
    
    // Verify the category matches
    const postCategorySlug = post.category.toLowerCase().replace(/\s+/g, '-')
    if (postCategorySlug !== category) {
      notFound()
    }
    
    // Verify it's a holiday post
    const isHolidayCategory = post.category === 'Valentines Day' || post.category.toLowerCase().includes('holiday')
    if (!isHolidayCategory) {
      notFound()
    }
    
    // Build breadcrumb items
    const categoryLabel = post.category
    
    const breadcrumbItems = [
      { label: 'Home', href: '/' },
      { label: 'Holidays', href: '/holidays' },
      { label: categoryLabel, href: `/holidays/${category}` },
      { label: post.title },
    ]
    
    return <BlogPostPageContent post={post} breadcrumbItems={breadcrumbItems} />
  }
  
  // Otherwise it's a category page: [category-slug]
  const categorySlug = params.slug[0]
  const posts = getBlogPostsByCategory(categorySlug)
  const categoryName = categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  if (posts.length === 0) {
    notFound()
  }

  // Build breadcrumb items - match the URL structure
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Holidays', href: '/holidays' },
    { label: categoryName },
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
            {categoryName}
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

