# Blog Images Directory

This directory contains all images for blog articles.

## Folder Structure

Each article should have its own folder named after the article slug:

```
/images/blog/
  /article-slug-name/
    - featured-image.jpg    (Hero background image - 1200x800px recommended)
    - image-1.jpg           (Content images)
    - image-2.jpg
    - ...
```

## Example

For an article with slug `modern-living-room-ideas`, create:

```
/images/blog/
  /modern-living-room-ideas/
    - featured-image.jpg
    - living-room-1.jpg
    - living-room-2.jpg
    - furniture-detail.jpg
```

## Image Guidelines

- **File naming**: Use lowercase with hyphens (e.g., `modern-living-room.jpg`)
- **Formats**: `.jpg` or `.webp` for photos, `.png` for graphics
- **Featured image**: 1200x800px recommended
- **Content images**: 800-1200px width recommended
- **Optimization**: Compress images before uploading (use tools like TinyPNG)
- **Alt text**: Always include descriptive alt text in markdown

## Usage in Markdown

Reference images in your markdown content like this:

```markdown
![Description of image](/images/blog/article-slug/image-1.jpg)
```

## Notes

- The `example-article` folder is just for reference and can be deleted
- Keep image file sizes optimized for web performance
- All images in `/public` are automatically served by Next.js

