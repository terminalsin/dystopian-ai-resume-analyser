'use client'

import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('@/components/PDFViewer').then(mod => mod.PDFViewer), {
  ssr: false,
  loading: () => <p>Loading PDF viewer...</p>
});

import { ResumeDetails } from '@/components/ResumeDetails'
import { JobDescriptionUpload } from '@/components/JobDescriptionUpload'
import { MatchingScore } from '@/components/MatchingScore'
import { useResumeAnalysis } from '@/hooks/useResumeAnalysis';

export default function ReportPage({ params }: { params: { id: string } }) {

    const { resumeDetails, isLoading, error } = useResumeAnalysis(params.id);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="flex h-screen">
            <div className="w-1/4 p-4">
                <JobDescriptionUpload />
                <MatchingScore />
            </div>
            <div className="w-1/2 p-4">
                {resumeDetails && (
                    <PDFViewer file={`/api/resume/${params.id}/pdf`} />
                )}
            </div>
            <div className="w-1/4 p-4">
                {resumeDetails && (
                    <ResumeDetails resumeDetails={resumeDetails} />
                )}
            </div>
        </div>
    )
}