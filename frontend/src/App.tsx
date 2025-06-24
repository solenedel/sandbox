import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DogGallery from './pages/DogGallery';
import YourDogs from './pages/YourDogs';
import './App.css';
import { DogProvider } from './context/DogContext';

function App() {
  return (
    <DogProvider>
      <BrowserRouter>
        {/* NAVIGATION */}
        <nav
          style={{
            padding: '1rem',
            marginBottom: '2rem',
            display: 'flex',
            gap: '1rem',
          }}>
          <Link to="/">Dog Gallery</Link>
          <Link to="/your-dogs">Your Dogs</Link>
        </nav>

        {/* ROUTES */}
        <main>
          <Routes>
            <Route path="/" element={<DogGallery />} />
            <Route path="/your-dogs" element={<YourDogs />} />
          </Routes>
        </main>
      </BrowserRouter>
    </DogProvider>
  );
}

export default App;
