import express from 'express'
import { createBlog } from '../controllers/blogController.js'
import upload from '../middlewares/uploadMiddleware.js'
import { protect } from '../middlewares/auth.js'

const router =express.Router()

router.post("/create",upload.single("image"),createBlog)

export default router