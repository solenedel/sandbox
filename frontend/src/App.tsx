import { useState, useEffect } from 'react';
import './App.css';
import { useFetchDogData } from './hooks/useFetchDogData';

function App() {
  const [count, setCount] = useState<number | null>(null);

  const {
    handleGetSingleDog,
    handleGetMultipleDogs,
    singleDogUrl,
    multipleDogs,
    status,
  } = useFetchDogData();

  // handleCountInput -------------------------------------------------------------

  const handleCountInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);

    if (value >= 1 && value <= 10) {
      setCount(value);
    }
  };

  // useEffect: extract dog breed from url -------------------------------------------------------------

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

  // useEffect(() => {
  //   console.log('🌍🌍🌍🌍 status', status);
  // }, [status]);

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
          <img src={singleDogUrl} loading="lazy" alt="Random dog" width={200} />
          {singleDogBreed && <p>{singleDogBreed}</p>}
        </>
      ) : (
        <p>No dog selected yet.</p>
      )}
      {/* MULTIPLE DOGS SECTION */}
      <section>
        <h2>Get multiple dogs</h2>
        <div>
          <label htmlFor="count">Number of dogs: </label>
          <input
            id="count"
            type="number"
            value={count ?? ''}
            onChange={handleCountInput}
            min={1}
            max={10}
          />
          <button
            disabled={status.multipleDogsStatus === 'loading'}
            onClick={() => count && handleGetMultipleDogs(count)}>
            Get dogs
          </button>
        </div>
      </section>
      {multipleDogs.length ? (
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '10px',
          }}>
          {multipleDogs.map((url: string, index: number) => (
            <img
              loading="lazy"
              src={url}
              key={url}
              alt={`Random dog ${index + 1}`}
              width={200}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}

export default App;
