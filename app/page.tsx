import { getRecentPosts } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import AdSlot from '@/components/blog/AdSlot'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Modern Life Maven | Lifestyle Tips & Inspiration',
  description: 'Discover practical money-saving tips, home decor inspiration, and lifestyle advice to help you live better. Expert tips on budgeting, interior design, and creating a beautiful, affordable lifestyle.',
  openGraph: {
    title: 'Modern Life Maven | Lifestyle Tips & Inspiration',
    description: 'Discover practical money-saving tips, home decor inspiration, and lifestyle advice to help you live better.',
    images: ['/og-image.jpg'],
  },
}

export default function Home() {
  const posts = getRecentPosts(6)

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20 md:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6 text-balance">
                Live Better, Smarter, and More Beautifully
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover practical money-saving tips, home decor inspiration, and lifestyle advice to help you create a beautiful, affordable life. From budgeting strategies to interior design, we&apos;ve got you covered.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#featured-posts" className="btn-primary">
                  Explore Articles
                </a>
                <a href="/about" className="btn-secondary">
                  Learn More
                </a>
              </div>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&q=80"
                alt="Modern lifestyle - beautiful home with plants, natural light, and cozy living space"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ad Slot - Header */}
      <div className="container-custom">
        <AdSlot position="header" size="banner" />
      </div>

      {/* Featured Posts */}
      <section id="featured-posts" className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our collection of lifestyle tips, money-saving strategies, home decor inspiration, and expert advice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                featured={index === 0}
              />
            ))}
          </div>

          {/* Ad Slot - Inline */}
          <AdSlot position="inline" size="rectangle" />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Stay Inspired
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Get the latest lifestyle tips, money-saving strategies, and home decor inspiration delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button type="submit" className="px-6 py-3 bg-white text-primary-600 rounded-md font-semibold hover:bg-primary-50 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

