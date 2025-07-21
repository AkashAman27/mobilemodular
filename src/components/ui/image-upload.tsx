'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, X, Image as ImageIcon, Loader2, ExternalLink } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  label?: string
  bucketName?: string
  folder?: string
  acceptedTypes?: string[]
  maxSizeMB?: number
  preview?: boolean
  className?: string
}

export function ImageUpload({
  value = '',
  onChange,
  label = 'Image',
  bucketName = 'images',
  folder = 'uploads',
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  maxSizeMB = 5,
  preview = true,
  className = ''
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const generateFileName = (originalName: string) => {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = originalName.split('.').pop()
    return `${timestamp}-${randomString}.${extension}`
  }

  const uploadFile = async (file: File) => {
    if (!file) return

    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      alert(`Please select a valid image file. Accepted types: ${acceptedTypes.join(', ')}`)
      return
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSizeMB) {
      alert(`File size must be less than ${maxSizeMB}MB. Current size: ${fileSizeMB.toFixed(2)}MB`)
      return
    }

    setUploading(true)
    
    try {
      const fileName = generateFileName(file.name)
      const filePath = `${folder}/${fileName}`

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        // Silent error handling - removed console.error
        
        // Handle different types of upload errors
        if (error.message.includes('Bucket not found')) {
          alert(`Storage bucket "${bucketName}" not found. Please check your Supabase storage configuration.`)
          return
        }
        
        if (error.message.includes('not authorized')) {
          alert('Upload failed: Not authorized. Please make sure you are logged in and have upload permissions.')
          return
        }
        
        if (error.message.includes('size')) {
          alert(`Upload failed: File too large. Maximum size is ${maxSizeMB}MB.`)
          return
        }
        
        alert(`Upload failed: ${error.message}`)
        return
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath)

      if (urlData.publicUrl) {
        onChange(urlData.publicUrl)
        // Silent logging - removed console.log
      } else {
        alert('Failed to get public URL for uploaded image')
      }

    } catch (error) {
      // Silent error handling - removed console.error
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      uploadFile(file)
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setDragOver(false)
    
    const file = event.dataTransfer.files[0]
    if (file) {
      uploadFile(file)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setDragOver(false)
  }

  const removeImage = () => {
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor="image-upload">{label}</Label>
      
      {/* Current Image Display */}
      {value && preview && (
        <div className="relative inline-block">
          <div className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              sizes="128px"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-1 right-1 h-6 w-6 p-0"
              onClick={removeImage}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* URL Input Field */}
      <div className="space-y-2">
        <Label className="text-sm text-gray-600">Image URL</Label>
        <div className="flex space-x-2">
          <Input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com/image.jpg or upload file below"
            className="flex-1"
          />
          {value && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => window.open(value, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Upload Area */}
      <div className="space-y-2">
        <Label className="text-sm text-gray-600">Or Upload New Image</Label>
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${uploading ? 'pointer-events-none opacity-50' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={openFileDialog}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <Upload className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Drop image here or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  {acceptedTypes.map(type => type.split('/')[1]).join(', ').toUpperCase()} • Max {maxSizeMB}MB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Manual URL Option */}
      <div className="text-xs text-gray-500">
        You can either upload a new image or paste an existing image URL above.
      </div>
    </div>
  )
}

export default ImageUpload