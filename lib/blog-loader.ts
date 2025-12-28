import 'server-only'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost } from '@/types/blog'

const contentDirectory = path.join(process.cwd(), 'content', 'blog')

// Map category names to directory paths
function getCategoryPath(category: string): string {
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-')
  
  // Holiday categories
  if (category.toLowerCase().includes('holiday') || category === 'Valentines Day') {
    if (category === 'Valentines Day') {
      return path.join('holidays', 'valentines-day')
    }
    return path.join('holidays', categorySlug)
  }
  
  // Home decor subcategories
  const homeDecorSubcategories: Record<string, string> = {
    'living room': 'living-room',
    'bedroom': 'bedroom',
    'kitchen': 'kitchen',
    'bathroom': 'bathroom',
    'outdoor': 'outdoor',
  }
  
  const subcategorySlug = homeDecorSubcategories[category.toLowerCase()]
  if (subcategorySlug) {
    return path.join('home-decor', subcategorySlug)
  }
  
  // Default to home-decor root
  return path.join('home-decor', categorySlug)
}

// Get all markdown files recursively from a directory
function getAllMarkdownFiles(dir: string): string[] {
  let files: string[] = []
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory()) {
        files = files.concat(getAllMarkdownFiles(fullPath))
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath)
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read
    console.warn(`Warning: Could not read directory ${dir}`)
  }
  
  return files
}

// Parse a single markdown file into a BlogPost
function parseMarkdownFile(filePath: string): BlogPost | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Validate required fields
    if (!data.id || !data.slug || !data.title) {
      console.warn(`Warning: Missing required fields in ${filePath}`)
      return null
    }
    
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || '',
      content: content.trim(),
      featuredImage: data.featuredImage || '',
      author: data.author ? { name: data.author.name || 'Unknown' } : undefined,
      publishedAt: data.publishedAt || new Date().toISOString(),
      updatedAt: data.updatedAt,
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      readTime: data.readTime || 5,
      seo: data.seo,
    }
  } catch (error) {
    console.error(`Error parsing markdown file ${filePath}:`, error)
    return null
  }
}

// Load all blog posts from markdown files
export function loadBlogPosts(): BlogPost[] {
  const allFiles = getAllMarkdownFiles(contentDirectory)
  const posts: BlogPost[] = []
  
  for (const filePath of allFiles) {
    const post = parseMarkdownFile(filePath)
    if (post) {
      posts.push(post)
    }
  }
  
  return posts
}

// Cache the loaded posts
let cachedPosts: BlogPost[] | null = null

// Get all blog posts (with caching)
export function getAllBlogPosts(): BlogPost[] {
  if (cachedPosts === null) {
    cachedPosts = loadBlogPosts()
  }
  return cachedPosts
}

