import { notFound } from 'next/navigation'
import { getBlogPost, blogPosts } from '@/lib/blog'
import Image from 'next/image'
import { format } from 'date-fns'
import { Clock, Calendar } from 'lucide-react'
import AdSlot from '@/components/blog/AdSlot'
import RelatedPosts from '@/components/blog/RelatedPosts'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import MarkdownRenderer from '@/components/blog/MarkdownRenderer'
import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://modernlifemaven.com'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords || post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
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

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }


  // Build breadcrumb items
  // Determine parent category based on post category
  const isHolidayCategory = post.category === 'Valentines Day' || post.category.toLowerCase().includes('holiday')
  
  // Convert category name to slug for subcategory link
  const categorySlug = post.category.toLowerCase().replace(/\s+/g, '-')
  const categoryLabel = post.category
  
  const breadcrumbItems = isHolidayCategory
    ? [
        { label: 'Home', href: '/' },
        { label: 'Holidays', href: '/holidays' },
        { label: categoryLabel, href: `/holidays/${categorySlug}` },
        { label: post.title },
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Home Decor', href: '/home-decor' },
        { label: categoryLabel, href: `/home-decor/${categorySlug}` },
        { label: post.title },
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
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative container-custom py-12 sm:py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="mb-4 sm:mb-6">
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-600 text-white rounded-full text-xs sm:text-sm font-medium">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 text-balance">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-8 sm:py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Ad Slot - After Hero */}
              <AdSlot position="inline" size="banner" className="mb-8" />

              {/* Article Content */}
              <MarkdownRenderer content={post.content} />

              {/* Ad Slot - Mid Content */}
              <AdSlot position="inline" size="rectangle" className="my-12" />

              {/* Tags */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Ad Slot - Sidebar */}
                <AdSlot position="sidebar" size="skyscraper" />
                <AdSlot position="sidebar" size="square" />
              </div>
            </aside>
          </div>

          {/* Related Posts */}
          <RelatedPosts posts={blogPosts} currentPostId={post.id} />
        </div>
      </article>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title || '',
            image: post.featuredImage || '',
            datePublished: post.publishedAt || '',
            dateModified: post.updatedAt || post.publishedAt || '',
            publisher: {
              '@type': 'Organization',
              name: 'Modern Life Maven',
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`,
              },
            },
            description: post.excerpt || '',
            articleSection: post.category || '',
            keywords: (post.tags || []).join(', '),
          }),
        }}
      />
    </>
  )
}

