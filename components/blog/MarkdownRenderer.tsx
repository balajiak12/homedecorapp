import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import Image from 'next/image'
import { ReactNode } from 'react'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose-custom max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeUnwrapImages]}
        components={{
          // Custom image renderer with Next.js Image component
          img: ({ node, ...props }) => {
            const { src, alt } = props as { src?: string; alt?: string }
            if (!src) return null

            // URL-encode the image path to handle spaces and special characters
            // Only encode the path segments, not the slashes
            const encodedSrc = src.split('/').map((segment, index) => {
              // Don't encode the first empty segment (leading slash) or protocol segments
              if (index === 0 && segment === '') return segment
              if (segment.includes('://')) return segment
              // Encode each path segment to handle spaces
              return encodeURIComponent(segment)
            }).join('/')

            // Check if it's an external URL or local path
            const isExternal = src.startsWith('http://') || src.startsWith('https://')

            if (isExternal) {
              // For external images, use regular img tag
              // Check if it's a Pinterest pin style image
              const isPinterestPin = src.toLowerCase().includes('pinterest') || 
                                     src.toLowerCase().includes('pin') ||
                                     src.toLowerCase().includes('valentine')
              
              // eslint-disable-next-line @next/next/no-img-element
              return (
                <div className="my-8">
                  <div className={`relative w-full rounded-lg overflow-hidden ${
                    isPinterestPin 
                      ? 'aspect-[2/3] max-w-md mx-auto bg-transparent' // Pinterest pin aspect ratio, no background
                      : 'aspect-video bg-gray-100' // Standard 16:9
                  }`}>
                    <img
                      src={encodedSrc}
                      alt={alt || 'Article image'}
                      className={isPinterestPin ? 'object-contain w-full h-full' : 'object-cover w-full h-full'}
                    />
                  </div>
                  {alt && (
                    <p className="text-sm text-gray-500 italic mt-2 text-center">{alt}</p>
                  )}
                </div>
              )
            }

            // For local images, use Next.js Image component
            // Check if image is in Valentine's Day article folder (all are Pinterest pin style)
            // or if filename suggests Pinterest pin (tall/vertical image)
            const isPinterestPin = src.toLowerCase().includes('15-unique-valentines') ||
                                   src.toLowerCase().includes('valentines-day') ||
                                   src.toLowerCase().includes('pinterest') || 
                                   src.toLowerCase().includes('pin')
            
            return (
              <div className="my-8">
                <div className={`relative w-full rounded-lg overflow-hidden ${
                  isPinterestPin 
                    ? 'aspect-[2/3] max-w-md mx-auto bg-transparent' // Pinterest pin aspect ratio (2:3), no background
                    : 'aspect-video bg-gray-100' // Standard 16:9 for other images
                }`}>
                  <Image
                    src={encodedSrc}
                    alt={alt || 'Article image'}
                    fill
                    className={isPinterestPin ? 'object-contain' : 'object-cover'}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
                  />
                </div>
                {alt && (
                  <p className="text-sm text-gray-500 italic mt-2 text-center">{alt}</p>
                )}
              </div>
            )
          },
          // Custom heading styles
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-serif font-bold text-gray-900 mt-12 mb-6 first:mt-0">
              {props.children as ReactNode}
            </h1>
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl font-serif font-bold text-gray-900 mt-10 mb-4">
              {props.children as ReactNode}
            </h2>
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-3">
              {props.children as ReactNode}
            </h3>
          ),
          // Paragraph styling
          p: ({ node, ...props }) => (
            <p className="text-gray-700 leading-relaxed my-4">
              {props.children as ReactNode}
            </p>
          ),
          // List styling
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside my-4 space-y-2 text-gray-700">
              {props.children as ReactNode}
            </ul>
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside my-4 space-y-2 text-gray-700">
              {props.children as ReactNode}
            </ol>
          ),
          li: ({ node, ...props }) => (
            <li className="text-gray-700">{props.children as ReactNode}</li>
          ),
          // Bold text
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-gray-900">
              {props.children as ReactNode}
            </strong>
          ),
          // Links
          a: ({ node, ...props }) => {
            const { href } = props as { href?: string }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                {props.children as ReactNode}
              </a>
            )
          },
          // Blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary-500 pl-4 my-6 italic text-gray-600">
              {props.children as ReactNode}
            </blockquote>
          ),
          // Code blocks
          code: ({ node, ...props }) => {
            const { className } = props as { className?: string }
            // Inline code doesn't have className, code blocks do
            const isInline = !className
            if (isInline) {
              return (
                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                  {props.children as ReactNode}
                </code>
              )
            }
            return (
              <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                {props.children as ReactNode}
              </code>
            )
          },
          // Horizontal rule
          hr: () => <hr className="my-8 border-gray-200" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

