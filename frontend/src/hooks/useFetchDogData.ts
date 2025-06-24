import { useState } from 'react';
import axios from 'axios';
import type { Status } from '../types/types';

export const useFetchDogData = () => {
  const [singleDogUrl, setSingleDogUrl] = useState<string | null>(null);
  const [multipleDogs, setMultipleDogs] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>({
    singleDogStatus: 'idle',
    multipleDogsStatus: 'idle',
  });

  // handleGetSingleDog ---------------------------------------------------------

  const handleGetSingleDog = async (): Promise<void> => {
    setStatus({ ...status, singleDogStatus: 'loading' });
    try {
      // fetch from backend
      const response = await axios.get(`/api/random-dog`);
      const dogImage: string = response.data.message;

      setSingleDogUrl(dogImage);
      setStatus({ ...status, singleDogStatus: 'success' });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error fetching single dog:', error.response?.data);
      } else {
        console.error('Unexpected error fetching single dog:', error);
      }
      setStatus({ ...status, singleDogStatus: 'error' });
    }
  };

  // handleGetMultipleDogs ---------------------------------------------------------

  const handleGetMultipleDogs = async (count: number): Promise<void> => {
    setStatus({ ...status, multipleDogsStatus: 'loading' });

    try {
      const response = await axios.get(`/api/multiple-dogs?count=${count}`);
      const multipleDogs: string[] = response.data.message;

      setMultipleDogs(multipleDogs);
      setStatus({ ...status, multipleDogsStatus: 'success' });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Axios error fetching multiple dogs:',
          error.response?.data
        );
      } else {
        console.error('Unexpected error fetching multiple dogs:', error);
      }
      setStatus({ ...status, multipleDogsStatus: 'error' });
    }
  };

  return {
    handleGetSingleDog,
    handleGetMultipleDogs,
    singleDogUrl,
    multipleDogs,
    status,
  };
};
