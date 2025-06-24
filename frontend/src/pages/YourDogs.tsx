import DogForm from '../components/DogForm';

function YourDogs() {
  return (
    <section aria-labelledby="page-title">
      <h1 id="page-title">Your dogs</h1>

      <div>
        <DogForm />
      </div>
    </section>
  );
}

export default YourDogs;
