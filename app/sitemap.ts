import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://modernlifemaven.com'

  const blogPostEntries: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const isHolidayCategory = post.category === 'Valentines Day' || post.category.toLowerCase().includes('holiday')
    const categoryPrefix = isHolidayCategory ? '/holidays' : '/home-decor'
    return {
      url: `${baseUrl}${categoryPrefix}/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  })

  // Map categories to their parent category paths
  const getCategoryPath = (categorySlug: string): string => {
    const isHolidayCategory = categorySlug === 'holidays' || categorySlug === 'valentines-day'
    if (isHolidayCategory) {
      return categorySlug === 'holidays' ? '/holidays' : `/holidays/${categorySlug}`
    }
    // Home decor subcategories
    const homeDecorSubcategories = ['living-room', 'bedroom', 'kitchen', 'bathroom', 'outdoor']
    if (homeDecorSubcategories.includes(categorySlug)) {
      return `/home-decor/${categorySlug}`
    }
    // Default to home-decor main category
    return '/home-decor'
  }
  
  // Get all unique categories from blog posts
  const allCategories = Array.from(
    new Set(blogPosts.map(post => post.category.toLowerCase().replace(/\s+/g, '-')))
  )
  
  // Add parent categories
  const parentCategories = ['home-decor', 'holidays']
  
  // Combine and deduplicate
  const allCategorySlugs = Array.from(new Set([...parentCategories, ...allCategories]))
  
  const categoryEntries: MetadataRoute.Sitemap = allCategorySlugs.map((category) => ({
    url: `${baseUrl}${getCategoryPath(category)}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: category === 'home-decor' ? 0.9 : category === 'holidays' ? 0.8 : 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...blogPostEntries,
    ...categoryEntries,
  ]
}

