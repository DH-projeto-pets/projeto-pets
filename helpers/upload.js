const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = ( req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/gif'
  ];
  if(allowedMimes.includes(file.mimetype)){
    cb(null, true);
  } else {
    cb('Arquivo do tipo inválido');
  }
 
}


module.exports = multer({  storage:storage, fileFilter: fileFilter, limits: {fileSize: 1024 * 1024 * 2} } );
