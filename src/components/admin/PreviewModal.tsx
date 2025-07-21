'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export default function PreviewModal({ isOpen, onClose, title, children }: PreviewModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="bg-gray-50 rounded-lg p-1">
              <div className="bg-white rounded shadow-sm">
                {children}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-end p-6 border-t bg-gray-50">
            <p className="text-sm text-gray-500 mr-4">
              This is how the content will appear on your website
            </p>
            <Button onClick={onClose} className="bg-navy-600 hover:bg-navy-700">
              Close Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}