import * as React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ hover = false, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl ${hover ? 'hover:bg-white/8 hover:border-white/20 transition-all duration-300 cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
