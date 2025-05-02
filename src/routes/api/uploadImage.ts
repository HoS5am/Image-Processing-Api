import express, { Request, Response, NextFunction } from 'express';
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
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
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
uploadImage.post('/', upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  return res.status(200).json({
    message: 'Image uploaded successfully!',
    filename: req.file.filename,
  });
});

// Error-handling middleware for Multer and other errors
uploadImage.use(
  (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError || err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  },
);

export default uploadImage;
