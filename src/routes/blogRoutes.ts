import express from 'express';
import { getBlogs, createBlog, getBlogById } from '../controllers/blogController';
import { protect } from '../middleware/authMiddleware';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

// Routes
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', protect, upload.single('image'), createBlog);

export default router;
