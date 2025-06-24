import express from 'express';
import { Router, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getRandomDog, getMultipleDogs } from './services/dogService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// create express router instance and mount at /api
const router = Router();
app.use('/api', router);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// ------------------------------ ROUTES ---------------------------------

// 🔵 get random dog --------------------------------------------------------

// route handler for getRandomDog
const getRandomDogHandler = async (req: Request, res: Response) => {
  try {
    const randomDog = await getRandomDog();
    res.json(randomDog); // no explicit return needed when using res.json
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random dog' });
  }
};

// route for getRandomDog: /api/random-dog
router.get('/random-dog', getRandomDogHandler);

// 🔵 get multiple dogs -----------------------------------------------------

// route handler for getMultipleDogs
const getMultipleDogsHandler = async (req: Request, res: Response) => {
  // turn string query param into number
  const count = Number(req.query.count);
  try {
    const multipleDogs = await getMultipleDogs(count);
    res.json(multipleDogs); // no explicit return needed when using res.json
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch multiple dogs' });
  }
};

// route for getMultipleDogs: /api/multiple-dogs
router.get(`/multiple-dogs`, getMultipleDogsHandler);

// -------------------------------------------------------------------

export default router;
