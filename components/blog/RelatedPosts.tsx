import BlogCard from './BlogCard'
import type { BlogPost } from '@/types/blog'

interface RelatedPostsProps {
  posts: BlogPost[]
  currentPostId: string
}

export default function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3)

  if (relatedPosts.length === 0) return null

  return (
    <section className="mt-12 sm:mt-16">
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {relatedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}

