'use client'

import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

interface PreviewButtonProps {
  href: string
  label?: string
  variant?: 'default' | 'outline' | 'secondary'
  size?: 'sm' | 'default' | 'lg'
  className?: string
}

export default function PreviewButton({ 
  href, 
  label = "Preview Live Page",
  variant = "outline",
  size = "default",
  className = ""
}: PreviewButtonProps) {
  const handlePreview = () => {
    // Open the preview URL in a new tab
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <Button
      onClick={handlePreview}
      variant={variant}
      size={size}
      className={`${className}`}
    >
      <ExternalLink className="h-4 w-4 mr-2" />
      {label}
    </Button>
  )
}