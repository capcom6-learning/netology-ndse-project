const fs = require('fs');
const multer = require('multer');

const imageTypes = ['image/jpeg', 'image/png', 'image/gif'];

const fileFilter = (req, file, cb) => {
    if (!imageTypes.includes(file.mimetype)) {
        cb(new Error('Only images are allowed'));
    }

    cb(null, true);
};

const upload = (path) => {
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            const user = req.user;

            if (!user) {
                return cb(new Error("User is not authorized"));
            }

            uploadPath = `${path}/${user.id}`

            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath);
            }

            cb(null, uploadPath);
        },
        filename(req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`);
        },

    });

    return multer({ storage, fileFilter });
};

module.exports = upload;