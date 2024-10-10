'use client'

import { ResumeAnalysisReport } from './ResumeAnalysisReport'
import { ResumeAnalysis } from '@/types/resumeAnalysis'

export function ResumeDetails({ resumeDetails }: { resumeDetails: ResumeAnalysis }) {

  if (!resumeDetails?.analysis) return <div>No resume details found</div>

  console.log(resumeDetails);

  if (!resumeDetails?.analysis) return <div>No resume details found</div>

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Resume Details</h2>
      {/* Render resumeDetails here */}
      <ResumeAnalysisReport analysis={resumeDetails.analysis} /> 
    </div>
  )
}