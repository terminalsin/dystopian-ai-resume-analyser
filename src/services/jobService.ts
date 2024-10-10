import axios from 'axios'

export const jobService = {
  uploadJob: async (file: File): Promise<void> => {
    const formData = new FormData()
    formData.append('file', file)
    await axios.post('/api/job/upload', formData)
  },

  getMatchingScore: async (): Promise<number> => {
    const response = await axios.get('/api/job/match')
    return response.data.score
  }
}