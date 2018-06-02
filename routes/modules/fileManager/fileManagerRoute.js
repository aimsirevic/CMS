var router = require('express').Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
var controller = require('./fileManagerController');
var multer = require('multer')
const sharp = require('sharp');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, controller.getCurrentFolder());
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
var onErrorMulter = function (err, next) {
    console.log('error', err);
    next(err);
};
var upload = multer({ storage: storage, fileFilter: controller.fileFilter }).array('fileToUpload', 10);
router.get('/', function (req, res) {
    var files = controller.getFilesInCurrentFolder();
    var folderSettings = controller.currentFolderSettings();
    res.render('modules/fileManager/index', { text: "File Manager", files: files, settings: folderSettings, scripts: ["fileManager.js"] });
});

router.get('/:path', function (req, res) {
    var path = req.params.path.split(":").join("/");
    controller.setCurrentFolder(path);
    res.redirect('/fileManager');
});

router.get('/delete/:fileName', function (req, res) {
    var fileName = req.params.fileName;
    controller.deleteFile(fileName, req);
    res.redirect('/fileManager');
});

router.get('/download/:fileName', function (req, res) {
    var fileName = controller.getCurrentFolder() + "/" + req.params.fileName;
    res.download(fileName);
});

router.post('/file/upload', function (req, res) {
    upload(req, res, function (err) {
        console.log(req.files);
        if (err) {
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                req.flash('error_msg', "You can select only 10 files at a time.");
            } else {
                req.flash('error_msg', err.message);
            }
        } else {
            req.files.forEach(function (file) {
                if (file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
                    var thumb = controller.getCurrentFolder() + "/thumb_" + file.originalname;
                    if (fs.existsSync(thumb)) {
                        fs.unlink(thumb);
                    }
                    sharp(file.path).resize(100, 100).max().toBuffer(function (err, buffer) {
                        fs.writeFileSync(thumb, buffer);
                    });
                }
            });
            req.flash('success_msg', "Successfuly uploaded files.");
        }
        res.redirect('/fileManager');
    })
})

router.post('/', [
    check('folderName')
        .custom(value => {
            return value.trim();
        }).withMessage('Empty field. Please enter folder name.')
        .custom(value => {
            return !controller.fileExists(value);
        }).withMessage('This folder already exists. Please enter different name.'),
    sanitize('folderName')
        .escape()
        .trim()
], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validation_errors', errors.mapped().folderName.msg);
    } else {
        controller.createFolder(req.body.folderName);
        req.flash('success_msg', "Successfuly added folder.");
    }
    res.redirect('/fileManager');
});

module.exports = router;