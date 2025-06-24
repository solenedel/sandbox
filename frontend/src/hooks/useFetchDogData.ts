import type { Status } from '../types/types';
import { useState, useCallback } from 'react';
import axios from 'axios';

export const useFetchDogData = () => {
  const [singleDogUrl, setSingleDogUrl] = useState<string | null>(null);
  const [multipleDogs, setMultipleDogs] = useState<string[]>([]);
  const [singleDogBreed, setSingleDogBreed] = useState<string | null>(null);
  const [multipleDogBreeds, setMultipleDogBreeds] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>({
    singleDogStatus: 'idle',
    multipleDogsStatus: 'idle',
  });

  // handleGetSingleDog ---------------------------------------------------------

  const handleGetSingleDog = async (): Promise<void> => {
    setStatus({ ...status, singleDogStatus: 'loading' });
    setSingleDogBreed(null);
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
    setMultipleDogBreeds([]);

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

  // handleGetDogBreed ---------------------------------------------------------

  // this function can take in EITHER a single dog url string OR an array of dog urls
  const handleGetDogBreedImplementation = async <T extends string | string[]>(
    dogUrl: T
  ): Promise<void> => {
    try {
      // array case
      if (Array.isArray(dogUrl) && dogUrl.length > 0) {
        const dogBreedPromises = dogUrl.map((url: string) =>
          axios.get(`/api/dog-breed?dogUrl=${url}`)
        );
        const responses = await Promise.all(dogBreedPromises);
        const dogBreeds = responses.map((resp) => resp.data.dogBreed);
        setMultipleDogBreeds(dogBreeds);
      } else {
        // string case
        const response = await axios.get(`/api/dog-breed?dogUrl=${dogUrl}`);
        const dogBreed: string = response.data.dogBreed;
        setSingleDogBreed(dogBreed);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Axios error getting dog breed(s):',
          error.response?.data
        );
      } else {
        console.error('Unexpected error getting dog breed(s):', error);
      }
    }
  };

  const handleGetDogBreed = useCallback(handleGetDogBreedImplementation, [
    setSingleDogBreed,
    setMultipleDogBreeds,
  ]);

  return {
    handleGetSingleDog,
    handleGetMultipleDogs,
    handleGetDogBreed,
    singleDogUrl,
    multipleDogs,
    status,
    singleDogBreed,
    multipleDogBreeds,
  };
};
