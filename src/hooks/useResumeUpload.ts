import { useState } from 'react'
import { resumeService } from '@/services/resumeService'

export function useResumeUpload() {
  const [isUploading, setIsUploading] = useState(false)

  const uploadResume = async (file: File): Promise<string> => {
    setIsUploading(true)
    try {
      const id = await resumeService.uploadResume(file)
      return id
    } finally {
      setIsUploading(false)
    }
  }

  return { uploadResume, isUploading }
}