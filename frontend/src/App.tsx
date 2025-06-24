import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// types ---------------------------------------------------------------------

interface Dog {
  message: string;
}

type statusOptions = 'idle' | 'loading' | 'success' | 'error';

interface Status {
  singleDogStatus: statusOptions;
  multipleDogsStatus: statusOptions;
}

// console.log('🌍🌍🌍🌍 dogImage', dogImage);

function App() {
  const [singleDogUrl, setSingleDogUrl] = useState<string | null>(null);
  const [singleDogBreed, setSingleDogBreed] = useState<string | null>(null);
  const [multipleDogs, setMultipleDogs] = useState<Dog[]>([]);
  const [status, setStatus] = useState<Status>({
    singleDogStatus: 'idle',
    multipleDogsStatus: 'idle',
  });

  // handleGetSingleDog ---------------------------------------------------------

  // to do - turn into custom hook
  const handleGetSingleDog = async (): Promise<void> => {
    setStatus({ ...status, singleDogStatus: 'loading' });
    try {
      // fetch from backend
      const response = await axios.get(`/api/random-dog`);
      const dogImage: Dog = response.data;

      setSingleDogUrl(dogImage.message);
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
      const multipleDogs: Dog[] = response.data.message;

      console.log('🌍🌍🌍🌍 multipleDogs', multipleDogs);

      setMultipleDogs(multipleDogs);
      setStatus({ ...status, multipleDogsStatus: 'success' });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error fetching single dog:', error.response?.data);
      } else {
        console.error('Unexpected error fetching single dog:', error);
      }
      setStatus({ ...status, multipleDogsStatus: 'error' });
    }
  };

  // useEffect: extract dog breed form url -------------------------------------------------------------

  useEffect(() => {
    // extract breed from url
    const handleGetDogBreed = (): void => {
      const breed = singleDogUrl?.split('/');
      const breedName = breed?.[4];

      if (breedName) {
        const formattedBreedName = breedName.replace('-', ' ');

        setSingleDogBreed(formattedBreedName);
      }
    };
    if (singleDogUrl) {
      handleGetDogBreed();
    }
  }, [singleDogUrl]);
  // note: useEffect cleanup is unnecessary here because it is a synchronous operation
  // note: useCallback is also unnecessary because the function is not passed as a dependency and is simple

  //useEffect: keep track of status -------------------------------------------------------------

  useEffect(() => {
    console.log('🌍🌍🌍🌍 status', status);
  }, [status]);

  // RENDER --------------------------------------------------------------------------------------

  return (
    <>
      {/* GET SINGLE DOG SECTION */}
      <section>
        <h2>Get one random dog</h2>
        <button
          disabled={status.singleDogStatus === 'loading'}
          onClick={handleGetSingleDog}>
          Get dog
        </button>
      </section>
      {status.singleDogStatus === 'loading' && (
        <p
          style={{
            width: '400px',
            height: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Loading...
        </p>
      )}
      {singleDogUrl ? (
        <>
          <img src={singleDogUrl} loading="lazy" alt="Random dog" width={400} />
          {singleDogBreed && <p>{singleDogBreed}</p>}
        </>
      ) : (
        <p>No dog selected yet.</p>
      )}
      {/* MULTIPLE DOGS SECTION */}
      <section>
        <h2>Get multiple dogs</h2>
        <div>
          <input type="number" min={1} max={10} />
          <button
            disabled={status.multipleDogsStatus === 'loading'}
            onClick={() => handleGetMultipleDogs(3)}>
            Get dogs
          </button>
        </div>
      </section>
    </>
  );
}

export default App;
