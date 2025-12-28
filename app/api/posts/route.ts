import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog'

export async function GET() {
  const posts = getAllPosts()
  
  // Return only metadata needed for search (exclude full content)
  const postsForSearch = posts.map(({ content, ...rest }) => rest)
  
  return NextResponse.json(postsForSearch)
}

