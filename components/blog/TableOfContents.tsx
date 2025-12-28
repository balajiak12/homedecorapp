'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm
    const matches = Array.from(content.matchAll(headingRegex))
    const extractedHeadings: Heading[] = matches.map((match, index) => ({
      id: `heading-${index}`,
      text: match[2],
      level: match[1].length,
    }))
    setHeadings(extractedHeadings)
  }, [content])

  if (headings.length === 0) return null

  return (
    <nav className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8" aria-label="Table of contents">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 2 ? '' : 'ml-4'}>
            <a
              href={`#${heading.id}`}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

