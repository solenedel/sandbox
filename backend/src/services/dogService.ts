import axios from 'axios';

// INTERFACES ------------------------------------------------------------

interface DogApiResponse {
  message: string;
  status: string;
}
// SERVICE FUNCTIONS ----------------------------------------------------

// getRandomDog ----------------------------------------------------------
// returns a single random dog image

export const getRandomDog = async (): Promise<DogApiResponse> => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching random dog:', error.response?.data);
    } else {
      console.error('Unexpected error fetching random dog:', error);
    }
    throw new Error('Failed to fetch random dog');
  }
};

// getMultipleDogs --------------------------------------------------------
