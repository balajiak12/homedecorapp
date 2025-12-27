# Modern Life Maven

Modern Life Maven is a modern, SEO-optimized affiliate blog website for the home decor niche. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-friendly interface
- 🔍 SEO optimized
- 💰 Affiliate marketing ready
- 📝 Structured blog post template
- 🖼️ Image galleries and backgrounds
- 📊 Ad placement slots
- ⚡ Fast performance

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app              - Next.js app router pages
/components       - React components
/lib              - Utilities and helpers
/types            - TypeScript definitions
/public           - Static assets
```

## Blog Post Structure

All blog posts follow a consistent pattern:
- Hero section with featured image
- Title and metadata
- Introduction
- Content sections with headings
- Strategic ad placements
- Image galleries
- Call-to-action sections
- Related posts

## Adding New Articles

### Step 1: Prepare Your Content

1. Get your article content in Markdown format from ChatGPT/Claude
2. Prepare your images:
   - **Featured Image**: Hero background image (recommended: 1200x800px)
   - **Article Images**: Images referenced in your markdown content

### Step 2: Organize Images

Create a folder structure in `/public/images/blog/`:

```
/public/images/blog/your-article-slug/
  - featured-image.jpg
  - image-1.jpg
  - image-2.jpg
  - ...
```

**Image Best Practices:**
- Use lowercase filenames with hyphens (e.g., `modern-living-room.jpg`)
- Formats: `.jpg` or `.webp` for photos, `.png` for graphics
- Optimize images before uploading (use tools like TinyPNG)
- Featured image: 1200x800px recommended
- Content images: 800-1200px width recommended

### Step 3: Write Markdown with Images

In your markdown content, reference images like this:

```markdown
# Your Article Title

Introduction paragraph here...

## Section 1

Content here...

![Description of image](/images/blog/your-article-slug/image-1.jpg)

More content...
```

**Note:** 
- Local images: Use paths starting with `/images/` (e.g., `/images/blog/article/image.jpg`)
- External images: Use full URLs (e.g., `https://example.com/image.jpg`)

### Step 4: Add Article to `lib/blog.ts`

Open `lib/blog.ts` and add a new article object to the `blogPosts` array:

```typescript
{
  id: '4', // Unique ID (increment from last article)
  title: 'Your Article Title Here',
  slug: 'your-article-slug-here', // URL-friendly (lowercase, hyphens)
  excerpt: 'A brief 1-2 sentence description for previews.',
  content: `YOUR MARKDOWN CONTENT HERE`,
  featuredImage: '/images/blog/your-article-slug/featured-image.jpg',
  author: {
    name: 'Your Author Name',
  },
  publishedAt: '2024-01-20', // Format: YYYY-MM-DD
  category: 'Living Room', // Match existing categories
  tags: ['tag1', 'tag2', 'tag3'],
  readTime: 8, // Estimated reading time in minutes
  seo: {
    metaTitle: 'SEO Optimized Title (optional)',
    metaDescription: 'SEO description (optional)',
    keywords: ['keyword1', 'keyword2'], // Optional
  },
}
```

### Step 5: Test Your Article

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Visit: `http://localhost:3000/blog/your-article-slug`

### Markdown Features Supported

The blog now supports full Markdown rendering including:
- Headings (H1, H2, H3)
- Paragraphs
- **Bold text**
- *Italic text*
- Lists (ordered and unordered)
- Links
- Images (local and external)
- Blockquotes
- Code blocks (inline and code blocks)
- Horizontal rules

All images are automatically optimized using Next.js Image component for local images.

## SEO Features

- Semantic HTML5
- Meta tags optimization
- Structured data (JSON-LD)
- Image optimization
- Fast page loads
- Mobile-first responsive design

## Build

```bash
npm run build
```

## License

MIT

