import { Request, Response } from 'express';
import Blog from '../models/Blog';

export const getBlogs = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const blogs = await Blog.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
  const total = await Blog.countDocuments();

  res.json({ blogs, totalPages: Math.ceil(total / limit) });
};

export const createBlog = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  const blog = new Blog({ title, content, image });
  await blog.save();

  res.status(201).json(blog);
};

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};