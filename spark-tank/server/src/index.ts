import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db'; // Import the MongoDB connection function

dotenv.config(); // Load environment variables from .env file

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Initialize database and start the server
(async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
})();
