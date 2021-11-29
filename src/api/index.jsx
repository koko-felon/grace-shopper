import axios from 'axios';

// Sample function to call our backend API
export async function getMessage() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}