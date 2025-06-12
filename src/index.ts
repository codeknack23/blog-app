import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import blogRoutes from './routes/blogRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();
const app = express();

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// Middleware
app.use(cors());
app.use(express.json()); // for JSON requests
app.use(express.urlencoded({ extended: true })); // ✅ needed for form-data (key-value)

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);

// MongoDB connection + server start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
