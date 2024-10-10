'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useResumeUpload } from '@/hooks/useResumeUpload'

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()
  const { uploadResume, isUploading } = useResumeUpload()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (file) {
      const reportId = await uploadResume(file)
      router.push(`/report/${reportId}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4"
      />
      <Button type="submit" disabled={!file || isUploading}>
        {isUploading ? 'Uploading...' : 'Upload and Analyze'}
      </Button>
    </form>
  )
}
