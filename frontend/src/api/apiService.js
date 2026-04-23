import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiService {
  /**
   * Health ping to wake up backend during cold starts
   */
  async wakeupBackend() {
    try {
      await axios.get(`${API_URL}/health`);
    } catch (err) {
      // Background wake-up ping error handling
    }
  }

  /**
   * Submit query to the RAG integration layer
   */
  async askLegalQuery(input, history) {
    try {
      const response = await axios.post(`${API_URL}/api/ask`, {
        query: input,
        history: history
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ApiService();
