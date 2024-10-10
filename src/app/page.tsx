import { FileUpload } from '@/components/FileUpload'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resume Analyzer</h1>
      <FileUpload />
    </div>
  )
}