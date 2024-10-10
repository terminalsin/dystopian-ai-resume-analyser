'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useJobUpload } from '@/hooks/useJobUpload'

export function JobDescriptionUpload() {
  const [file, setFile] = useState<File | null>(null)
  const { uploadJob, isUploading } = useJobUpload()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (file) {
      await uploadJob(file)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="mb-4"
      />
      <Button type="submit" disabled={!file || isUploading}>
        {isUploading ? 'Uploading...' : 'Upload Job Description'}
      </Button>
    </form>
  )
}