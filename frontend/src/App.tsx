import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// types ---------------------------------------------------------------------

interface Dog {
  message: string;
}

interface Status {
  singleDogStatus: 'idle' | 'loading' | 'success' | 'error';
  multipleDogsStatus: 'idle' | 'loading' | 'success' | 'error';
}

// console.log('🌍🌍🌍🌍 dogImage', dogImage);

function App() {
  const [singleDogUrl, setSingleDogUrl] = useState<string | null>(null);
  const [singleDogBreed, setSingleDogBreed] = useState<string | null>(null);
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

  // RENDER -------------------------------------------------------------------------------

  return (
    <>
      {/* GET SINGLE DOG SECTION */}
      <section>
        <h2>Get one random dog</h2>
        <button onClick={handleGetSingleDog}>Get dog</button>
      </section>
      {status.singleDogStatus === 'loading' && <p>Loading...</p>}
      {singleDogUrl ? (
        <>
          <img src={singleDogUrl} alt="Random dog" width={400} />
          {singleDogBreed && <p>{singleDogBreed}</p>}
        </>
      ) : (
        <p>No dog selected yet.</p>
      )}
      {/* <section>
        <h2>Get multiple dogs</h2>

      </section> */}
    </>
  );
}

export default App;
