const fs = require('fs');
var thumb = require('node-thumbnail').thumb;
var currentFolder = "FileManager";

module.exports.setCurrentFolder = function (newCurrentFolder) {
    currentFolder = newCurrentFolder;
}
module.exports.getCurrentFolder = function (newCurrentFolder) {
    return currentFolder;
}
module.exports.getFilesInCurrentFolder = function (folderName, mainPath) {
    var folderName = folderName || currentFolder;
    var mainPath = mainPath || "/fileManager/";
    var files_ = [];
    var files = fs.readdirSync(folderName);
    for (var i in files) {
        var name = folderName + "/" + files[i];
        var deletePath = mainPath + "delete/" + files[i];
        if (!files[i].startsWith("thumb_")) {
            if (fs.statSync(name).isDirectory()) {
                var link = name.split("/").join(":");
                link = mainPath + link;
                files_.push({ path: name, name: files[i], type: "folder", parent: folderName, delete: deletePath, link: link });
            } else {
                var downloadPath = mainPath + "download/" + files[i];
                var parentWithoutHome = folderName.replace("FileManager", "");
                var extension = files[i].substring(files[i].indexOf('.') + 1);
                var fileType = "image";
                if (name.toLowerCase().match(/\.(doc|docx)$/)) {
                    fileType = "document";
                } else if (name.toLowerCase().match(/\.(pdf)$/)) {
                    fileType = "pdf";
                }
                files_.push({ path: name, name: files[i], type: "file", parent: folderName, delete: deletePath, parentWithoutHome: parentWithoutHome, download: downloadPath, extension: extension, fileType: fileType });
            }
        }
    }
    return files_;
}

module.exports.currentFolderSettings = function (folderName, mainPath) {
    var folderName = folderName || currentFolder;
    var mainPath = mainPath || "/fileManager/";
    var settings = {};
    var pathArray = folderName.split("/");
    settings.backButton = { text: "Back", link: "" }
    settings.breadcrumb = [];
    if (pathArray.length === 1) {
        settings.backButton = { text: "", link: "" }
        settings.breadcrumb.push({ text: "Home", link: mainPath + "FileManager" });
    } else {
        var initialPath = mainPath;
        var backLink = initialPath;
        for (i = 0; i < pathArray.length; i++) {
            var breadcrumbLink = initialPath;
            var breadcrumbText = "Home";
            for (j = 0; j <= i; j++) {
                if (j === i) {//if last link in row dont add :
                    breadcrumbLink += pathArray[j];
                } else {
                    breadcrumbLink += pathArray[j] + ":";
                }
                if (pathArray[i] !== "FileManager") {
                    breadcrumbText = pathArray[i];
                }
            }
            settings.breadcrumb.push({ text: breadcrumbText, link: breadcrumbLink });
            if (i < pathArray.length - 1) {
                if (i === pathArray.length - 2) { //if last link in row dont add :
                    backLink += pathArray[i];
                } else {
                    backLink += pathArray[i] + ":";
                }
            }
        }
        settings.backButton.link = backLink;
    }
    return settings;
}

module.exports.fileExists = function (fileName) {
    return fs.existsSync(currentFolder + "/" + fileName)
}

module.exports.createFolder = function (folderName) {
    fs.mkdir(currentFolder + "/" + folderName, function (err) {
        if (err) {
            console.log('failed to create directory', err);
        }
    });
}

module.exports.fileFilter = function (req, file, cb) {
    if (req.files.length > 10) {
        return cb(new Error('You can upload only 10 files at a time.'));
    } else if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif|pdf|docx|doc)$/)) {
        return cb(new Error('You can choose only jpg|jpeg|png|gif|pdf|docx|doc files'));
    } else if (fs.existsSync(currentFolder + '/' + file.originalname)) {
        return cb(new Error('[' + file.originalname + '] This file already exists. Rename it and upload again.'));
    }
    cb(null, true);
}
module.exports.deleteFile = function (fileName, req) {
    var file = currentFolder + '/' + fileName;
    if (fs.existsSync(file)) {
        if (fs.statSync(file).isDirectory()) {
            deleteFolderRecursive(file);
            req.flash('success_msg', 'successfully deleted ' + fileName + ' folder and its contents');
        } else {
            if (fileName.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
                deleteFile(currentFolder + '/thumb_' + fileName, req);
            }
            deleteFile(file, req);
            req.flash('success_msg', 'successfully deleted ' + fileName + ' file.');
        }
    } else {
        req.flash('error_msg', 'Could not find ' + fileName + ' file.');
    }
};

var deleteFolderRecursive = function (path) {
    fs.readdirSync(path).forEach(function (file, index) {
        var curPath = path + "/" + file;
        if (fs.lstatSync(curPath).isDirectory()) { // recurse
            deleteFolderRecursive(curPath);
        } else { // delete file
            fs.unlinkSync(curPath, function (err) {
                if (err) {
                    req.flash('error_msg', 'error while deleting ' + curPath + ' file.');
                    throw err;
                }
            });
        }
    });
    fs.rmdirSync(path);
};
var deleteFile = function (path, req) {
    fs.unlink(path, function (err) {
        if (err) {
            req.flash('error_msg', 'error while deleting ' + path + ' file.');
            throw err;
        }
    });
}

module.exports.fileWalker = function (dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(dir + file).isDirectory()) {
            filelist.push({ path: dir + file, name: file, type: "folder", parent: dir });
            filelist = module.exports.fileWalker(dir + file + '/', filelist);
        }
        else {
            filelist.push({ path: dir + file, name: file, type: "file", parent: dir });
        }
    });
    return filelist;
};