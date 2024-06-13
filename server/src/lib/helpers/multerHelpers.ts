import multer from "multer";

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload: multer.Multer = multer({ storage });

export { upload };
