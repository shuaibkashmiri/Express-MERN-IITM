// import multer from 'multer';

// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//     fileFilter: (req, file, cb) => {
//         file.mimetype.startsWith('image/') 
//             ? cb(null, true) 
//             : cb(new Error('Please upload only images'), false);
//     }
// });

// export default upload;

import multer from 'multer';


const upload = multer({
    storage: multer.diskStorage({
        destination: 'uploads/',              // temporary folder
        filename: (req, file, cb) => cb(null, file.originalname) // no unique name
    }),
    limits: { fileSize: 5 * 1024 * 1024 }      // 5MB max
});

export default upload;
