import { useState, useEffect } from 'react'
import { jobService } from '@/services/jobService'

export function useMatchingScore() {
  const [score, setScore] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMatchingScore = async () => {
      try {
        const matchingScore = await jobService.getMatchingScore()
        setScore(matchingScore)
      } catch (err) {
        setError('Failed to fetch matching score')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatchingScore()
  }, [])

  return { score, isLoading, error }
}