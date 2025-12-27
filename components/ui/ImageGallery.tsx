import Image from 'next/image'

interface ImageGalleryProps {
  images: string[]
  alt: string
  className?: string
}

export default function ImageGallery({ images, alt, className = '' }: ImageGalleryProps) {
  if (images.length === 0) return null

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 my-8 ${className}`}>
      {images.map((image, index) => (
        <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={`${alt} - Image ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ))}
    </div>
  )
}

