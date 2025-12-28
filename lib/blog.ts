import type { BlogPost } from '@/types/blog'

// Helper function to get blog post URL based on category
export function getBlogPostUrl(post: BlogPost): string {
  const isHolidayCategory = post.category === 'Valentines Day' || post.category.toLowerCase().includes('holiday')
  const categoryPrefix = isHolidayCategory ? '/holidays' : '/home-decor'
  const categorySlug = post.category.toLowerCase().replace(/\s+/g, '-')
  return `${categoryPrefix}/${categorySlug}/${post.slug}`
}

// Lazy load blog posts (only on server side)
let cachedBlogPosts: BlogPost[] | null = null

function loadBlogPosts(): BlogPost[] {
  if (cachedBlogPosts !== null) {
    return cachedBlogPosts
  }
  
  // Import blog loader only on server side
  // Using dynamic import to prevent webpack from bundling it for client
  if (typeof window === 'undefined') {
    const { getAllBlogPosts } = require('./blog-loader')
    cachedBlogPosts = getAllBlogPosts()
  } else {
    // On client side, we can't load posts directly
    // Client components should receive posts as props or via API
    cachedBlogPosts = []
  }
  
  return cachedBlogPosts || []
}

// Get all blog posts (loaded from markdown files)
// NOTE: This will be empty on client side. Client components should use props or API
export function getAllPosts(): BlogPost[] {
  return loadBlogPosts()
}

// Export blogPosts for server-side use only
// For client components, use getAllPosts() or pass posts as props
export const blogPosts: BlogPost[] = getAllPosts()

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
  )
}

export function getRecentPosts(limit: number = 6): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}
