export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  author: {
    name: string
    avatar?: string
  }
  publishedAt: string
  updatedAt?: string
  category: string
  tags: string[]
  readTime: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  image?: string
}

