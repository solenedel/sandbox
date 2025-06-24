import express from 'express';
import { Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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

// ------------------------------ ROUTES ------------------------------

// get one random dog from dogService API
router.get('/random-dog', getRandomDog);

// get multiple dogs from dogService API
router.get('/multiple-dogs', getMultipleDogs);
// this one should take in a number param for the number of dogs to get (between 1 and 10)

// -------------------------------------------------------------------

export default router;
