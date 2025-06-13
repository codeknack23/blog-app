import express from 'express';
import { getBlogs, createBlog, getBlogById } from '../controllers/blogController';
import { protect } from '../middleware/authMiddleware';
import multer from 'multer';

const router = express.Router();

// ✅ Use memory storage instead of disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', protect, upload.single('image'), createBlog);

export default router;
