import { useState, useEffect } from 'react';
import { useDogContext } from '../context/DogContext';

// types -------------------------------------------------------------

export interface DogData {
  name: string;
  breed: string;
  age: number;
}

// component -------------------------------------------------------------
function DogForm() {
  const { addDog, dogs } = useDogContext();
  const [dogData, setDogData] = useState<DogData>({
    name: '',
    breed: '',
    age: 0,
  });

  // form handlers -------------------------------------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setDogData((prev) => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addDog(dogData);
    // reset form
    setDogData({ name: '', breed: '', age: 0 });
  };

  // useEffect -------------------------------------------------------------
  useEffect(() => {
    console.log('DOGZZZZ========', dogs);
  }, [dogs]);

  // render -------------------------------------------------------------
  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
      aria-label="Add new dog"
      action="submit"
      onSubmit={handleSubmit}>
      <label htmlFor="dog-name">Dog name</label>
      <input
        onChange={handleChange}
        value={dogData.name}
        type="text"
        id="name"
        name="name"
      />

      <label htmlFor="dog-breed">Dog breed</label>
      <input
        onChange={handleChange}
        value={dogData.breed}
        type="text"
        id="breed"
        name="breed"
      />

      <label htmlFor="dog-age">Age</label>
      <input
        onChange={handleChange}
        value={dogData.age}
        type="number"
        id="age"
        name="age"
        min={0}
      />

      <button type="submit">Add dog</button>
    </form>
  );
}

export default DogForm;
