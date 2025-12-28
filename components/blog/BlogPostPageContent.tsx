import Image from 'next/image'
import { format } from 'date-fns'
import { Clock, Calendar, User } from 'lucide-react'
import AdSlot from '@/components/blog/AdSlot'
import RelatedPosts from '@/components/blog/RelatedPosts'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import MarkdownRenderer from '@/components/blog/MarkdownRenderer'
import type { BlogPost } from '@/types/blog'
import { blogPosts } from '@/lib/blog'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BlogPostPageContentProps {
  post: BlogPost
  breadcrumbItems: BreadcrumbItem[]
}

export default function BlogPostPageContent({ post, breadcrumbItems }: BlogPostPageContentProps) {
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
        <div className="relative container-custom py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-balance">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Ad Slot - After Hero */}
              <AdSlot position="inline" size="banner" className="mb-8" />

              {/* Article Content */}
              <MarkdownRenderer content={post.content} />

              {/* Ad Slot - Mid Content */}
              <AdSlot position="inline" size="rectangle" className="my-12" />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-primary-200 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{post.author.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Interior design enthusiast and home decor expert with years of experience creating beautiful living spaces.
                    </p>
                  </div>
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
    </>
  )
}

