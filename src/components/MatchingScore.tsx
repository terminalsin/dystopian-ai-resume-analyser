'use client'

import { useMatchingScore } from '@/hooks/useMatchingScore'

export function MatchingScore() {
  const { score, isLoading, error } = useMatchingScore()

  if (isLoading) return <div>Calculating matching score...</div>
  if (error) return <div>Error calculating matching score: {error}</div>

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Matching Score</h2>
      <p className="text-3xl font-bold">{score}%</p>
    </div>
  )
}