import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [singleDogUrl, setSingleDogUrl] = useState<string | null>(null);

  const handleGetSingleDog = async (): Promise<void> => {
    try {
      // fetch from backend
      const response = await axios.get(`/api/random-dog`);
      console.log('🌍🌍🌍🌍 response in front end!!!!!!', response);
      setSingleDogUrl(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error fetching single dog:', error.response?.data);
      } else {
        console.error('Unexpected error fetching single dog:', error);
      }
    }
  };

  return (
    <>
      {/* GET SINGLE DOG SECTION */}
      <section>
        <h2>Get one random dog</h2>
        <button onClick={handleGetSingleDog}>Get dog</button>
        {singleDogUrl ? (
          <img src={singleDogUrl} alt="Random dog" />
        ) : (
          <p>No dog selected yet.</p>
        )}
      </section>
      {/* <section>
        <h2>Get multiple dogs</h2>

      </section> */}
    </>
  );
}

export default App;
