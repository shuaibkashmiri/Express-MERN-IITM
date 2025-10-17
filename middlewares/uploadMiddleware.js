import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        file.mimetype.startsWith('image/') 
            ? cb(null, true) 
            : cb(new Error('Please upload only images'), false);
    }
});

export default upload;