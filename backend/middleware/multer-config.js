//configuration de multer 
const multer = require('multer');

//générer extension fichier 
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//création objet de configuration pour multer

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './images');
    },
    filename: (req, file, callback) => {
      const name = file.fieldname.split(' ').filter(n => n).join('_');
      const extension = MIME_TYPES[file.mimetype];
      if (!extension) return callback("Type de fichier non accepté")
      callback(null, `${name}_${Date.now()}.${extension}`);
    }
});
  
//exporter middleware multer configuré
module.exports = multer({storage: storage}).single('file');