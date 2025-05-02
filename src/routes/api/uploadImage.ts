import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const originalImagesDir = path.resolve(__dirname, '../../../images/original');

// Configure multer disk storage: define destination and filename
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    // Save uploaded files in /images/original so they appear with the other existing thumbnails.
    cb(null, originalImagesDir); 
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Filter only .jpg and .jpeg files for upload
const fileFilter = (_req: Request,file: Express.Multer.File,cb: multer.FileFilterCallback,) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (['.jpg', '.jpeg'].includes(ext)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only .jpg, .jpeg files are allowed.')); // Reject invalid file type
  }
};

// Initialize multer with storage and filter
const upload = multer({ storage, fileFilter });

const uploadImage = express.Router();

// Route: POST /upload
// Accept and store uploaded image file
uploadImage.post('/', (req: Request, res: Response) => {
  upload.single('image')(req, res, (err: any) => {
    // Handle upload errors from multer or validation
    if (err instanceof multer.MulterError || err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }

    // Check if file was provided
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Respond with success message and filename
    return res.status(200).json({
      message: 'Image uploaded successfully!',
      filename: req.file.filename,
    });
  });
});

export default uploadImage;
