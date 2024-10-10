import { useState } from 'react'
import { jobService } from '@/services/jobService'

export function useJobUpload() {
  const [isUploading, setIsUploading] = useState(false)

  const uploadJob = async (file: File): Promise<void> => {
    setIsUploading(true)
    try {
      await jobService.uploadJob(file)
    } finally {
      setIsUploading(false)
    }
  }

  return { uploadJob, isUploading }
}