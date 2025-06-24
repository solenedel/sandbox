import { createContext, useContext, useState, type ReactNode } from 'react';
import type { DogData } from '../components/DogForm';

// types -------------------------------------------------------------

interface MyDog extends DogData {
  readonly id: string;
}

interface DogContextType {
  dogs: MyDog[];
  addDog: (dog: DogData) => void;
}

// context -------------------------------------------------------------

const DogContext = createContext<DogContextType | null>(null);

// provider -------------------------------------------------------------

interface DogProviderProps {
  children: ReactNode;
}

export function DogProvider({ children }: DogProviderProps) {
  const [dogs, setDogs] = useState<MyDog[]>([]);

  const addDog = (dog: DogData) => {
    setDogs((prev) => [...prev, { ...dog, id: crypto.randomUUID() }]);
  };

  return (
    <DogContext.Provider value={{ dogs, addDog }}>
      {children}
    </DogContext.Provider>
  );
}

// hook -------------------------------------------------------------

export const useDogContext = () => {
  const context = useContext(DogContext);
  if (!context) {
    throw new Error('useDogContext must be used within a DogProvider');
  }
  return context;
};

// export -------------------------------------------------------------

export default DogContext;
