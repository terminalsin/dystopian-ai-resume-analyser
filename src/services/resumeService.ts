import { ResumeAnalysis } from '@/types/resumeAnalysis'
import axios from 'axios'

export const resumeService = {
  uploadResume: async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await axios.post('/api/resume/upload', formData)
    return response.data.id
  },

  getResumeAnalysis: async (id: string): Promise<ResumeAnalysis> => {
    const response = await axios.get(`/api/resume/${id}`)
    return response.data
  }
}