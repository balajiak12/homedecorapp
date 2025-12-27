import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://modernlifemaven.com'

  const blogPostEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const categoryEntries: MetadataRoute.Sitemap = [
    'home-decor',
    'living-room',
    'bedroom',
    'kitchen',
    'bathroom',
    'outdoor',
  ].map((category) => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: category === 'home-decor' ? 0.9 : 0.7,
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

