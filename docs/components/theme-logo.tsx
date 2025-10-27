'use client'

import NextImage from 'next/image'
import cn from 'clsx'

const commonImageProps = {
  alt: 'RegulacionIA',
  width: 104,
  height: 104,
  sizes: '(max-width: 768px) 90px, 104px',
  className: cn(
    'h-[90px] w-[90px] md:h-[104px] md:w-[104px] object-contain shrink-0',
    'hover:transition-all hover:duration-1000 motion-reduce:hover:transition-none',
    '[mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-position:0] [mask-size:400%]',
    'hover:[mask-position:100%]'
  ),
  priority: true
}

export const ThemeAwareLogo = () => {
  return (
    <>
      <NextImage
        {...commonImageProps}
        src="/logo_b.svg"
        className={cn(commonImageProps.className, 'inline-block dark:hidden')}
      />
      <NextImage
        {...commonImageProps}
        src="/logo_w.svg"
        className={cn(commonImageProps.className, 'hidden dark:inline-block')}
      />
    </>
  )
}
