import { useState } from 'react';

interface DogData {
  name: string;
  breed: string;
  age: number;
}

function DogForm() {
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

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  // };

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
      aria-label="Add new dog"
      action="submit
    ">
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
