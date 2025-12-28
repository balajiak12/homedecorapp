import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { Clock } from 'lucide-react'
import type { BlogPost } from '@/types/blog'
import { getBlogPostUrl } from '@/lib/blog'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article className={`group ${featured ? 'md:col-span-2' : ''}`}>
      <Link href={getBlogPostUrl(post)} className="block">
        <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 aspect-video mb-4">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs font-medium">
              {post.category}
            </span>
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), 'MMM d, yyyy')}
            </time>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
          <h2 className={`font-serif font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </article>
  )
}
