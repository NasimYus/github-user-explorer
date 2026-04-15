import type { CSSProperties } from 'react'

interface SkeletonBlockProps {
  className?: string
  style?: CSSProperties
}

export function SkeletonBlock({ className, style }: SkeletonBlockProps) {
  const classes = ['skeleton', className].filter(Boolean).join(' ')
  return <div className={classes} style={style} aria-hidden="true" />
}

