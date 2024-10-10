import React from 'react'
import { Star, StarHalf } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface StarRatingProps {
  score: number
  reasoning: string
  maxStars?: number
}

export const StarRating: React.FC<StarRatingProps> = ({ score, reasoning, maxStars = 5 }) => {
  const fullStars = Math.floor(score / 2)
  const hasHalfStar = score % 2 >= 1

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex">
            {[...Array(maxStars)].map((_, index) => {
              if (index < fullStars) {
                return <Star key={index} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              } else if (index === fullStars && hasHalfStar) {
                return <StarHalf key={index} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              } else {
                return <Star key={index} className="w-4 h-4 text-gray-300" />
              }
            })}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{reasoning}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}