import { useState, useEffect } from 'react'
import { resumeService } from '@/services/resumeService'
import { ResumeAnalysis } from '@/types/resumeAnalysis'

export function useResumeAnalysis(id: string) {
  const [resumeDetails, setResumeDetails] = useState<ResumeAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResumeAnalysis = async () => {
      try {
        const data = await resumeService.getResumeAnalysis(id)
        setResumeDetails(data)
      } catch (err) {
        setError('Failed to fetch resume analysis')
      } finally {
        setIsLoading(false)
      }
    }

    fetchResumeAnalysis()
  }, [id])

  return { resumeDetails, isLoading, error }
}
