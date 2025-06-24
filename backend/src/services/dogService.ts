import axios from 'axios';

// INTERFACES ------------------------------------------------------------

interface SingleDogApiResponse {
  message: string;
  status: string;
}

interface MultipleDogsApiResponse {
  message: string[];
  status: string;
}
// SERVICE FUNCTIONS ----------------------------------------------------

// 🔵 getRandomDog ----------------------------------------------------------
// returns a single random dog image

export const getRandomDog = async (): Promise<SingleDogApiResponse> => {
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

// 🔵 getMultipleDogs --------------------------------------------------------

export const getMultipleDogs = async (
  count: number
): Promise<MultipleDogsApiResponse> => {
  try {
    const response = await axios.get(
      `https://dog.ceo/api/breeds/image/random/${count}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error fetching multiple dogs:',
        error.response?.data
      );
    } else {
      console.error('Unexpected error fetching multiple dogs:', error);
    }
    throw new Error('Failed to fetch multiple dogs');
  }
};
