import express from 'express'
import { createBlog, deleteBlog, getAllBlogs } from '../controllers/blogController.js'
import upload from '../middlewares/uploadMiddleware.js'
import { protect } from '../middlewares/auth.js'

const router =express.Router()

router.post("/create",protect,upload.single("image"),createBlog)
router.get("/all",getAllBlogs)
router.delete("/delete/:blogId",protect,deleteBlog)

export default router