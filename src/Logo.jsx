import { forwardRef } from 'react'
import './Logo.css'

const LETTERS = ['T', 'E', 'M', 'N', 'Y', 'Y']

const Logo = forwardRef(function Logo({ size = 'sm', className = '' }, ref) {
  return (
    <div ref={ref} className={`logo logo-${size} ${className}`}>
      {LETTERS.map((letter, i) => (
        <span key={i} className="logo-letter-wrapper">
          <span className="logo-letter" data-index={i}>
            {letter}
          </span>
        </span>
      ))}
    </div>
  )
})

export default Logo
