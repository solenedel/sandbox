import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// types ---------------------------------------------------------------------

type Dog = {
  message: string;
};

// console.log('🌍🌍🌍🌍 dogImage', dogImage);

function App() {
  const [singleDogUrl, setSingleDogUrl] = useState<string | null>(null);
  const [singleDogBreed, setSingleDogBreed] = useState<string | null>(null);

  // handleGetSingleDog ---------------------------------------------------------

  const handleGetSingleDog = async (): Promise<void> => {
    try {
      // fetch from backend
      const response = await axios.get(`/api/random-dog`);
      const dogImage: Dog = response.data;

      setSingleDogUrl(dogImage.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error fetching single dog:', error.response?.data);
      } else {
        console.error('Unexpected error fetching single dog:', error);
      }
    }
  };

  // useEffect: extract dog breed form url --------------------------------------

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

  return (
    <>
      {/* GET SINGLE DOG SECTION */}
      <section>
        <h2>Get one random dog</h2>
        <button onClick={handleGetSingleDog}>Get dog</button>
      </section>
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
