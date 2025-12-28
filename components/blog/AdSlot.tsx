interface AdSlotProps {
  position: 'header' | 'sidebar' | 'inline' | 'footer'
  size?: 'banner' | 'rectangle' | 'square' | 'skyscraper'
  className?: string
}

const sizeClasses = {
  banner: 'w-full h-24 md:h-32',
  rectangle: 'w-full h-60 md:h-80',
  square: 'w-full aspect-square max-w-sm mx-auto',
  skyscraper: 'w-full h-[600px] max-w-[160px] mx-auto',
}

export default function AdSlot({ position, size = 'rectangle', className = '' }: AdSlotProps) {
  const baseClasses = 'bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center'
  const positionClasses = {
    header: 'mb-8',
    sidebar: 'sticky top-24',
    inline: 'my-8',
    footer: 'mt-8',
  }

  return (
    <div
      className={`${baseClasses} ${sizeClasses[size]} ${positionClasses[position]} ${className}`}
      role="complementary"
      aria-label={`Advertisement ${position}`}
    >
      <div className="text-center text-gray-400 dark:text-gray-500 text-sm p-4">
        <p className="font-medium">Advertisement</p>
        <p className="text-xs mt-1">
          {size === 'banner' && '728x90'}
          {size === 'rectangle' && '300x250'}
          {size === 'square' && '250x250'}
          {size === 'skyscraper' && '160x600'}
        </p>
      </div>
    </div>
  )
}

