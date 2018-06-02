var Page = require('./pageModel');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
var _ = require('lodash');
var ObjectID = require('mongodb').ObjectID;

module.exports.getThumbnailByImagePath = function (imagePath) {
    var imageName = "thumb_" + imagePath.substr(imagePath.lastIndexOf("/") + 1);
    return imagePath.substr(0, imagePath.lastIndexOf("/") + 1) + imageName;
}

module.exports.validation = [
    check('pageName').trim().isLength({ min: 1, max: 255 }).withMessage('The page name is too long or too short.').custom(value => {
        var format = /[!@#$%^&*()~+\=\[\]{};':"\\|,.<>\/?]/;
        return !format.test(value);
    }).withMessage("The name cannot conatin special characters."),
    check('pageMain').custom((value, { req }) => {
        if (value == 'true') {
            let id = new ObjectID(req.body.pageID);
            return new Promise((resolve, reject) => {
                Page.doesMainPageExist(id, function (err, pages) {
                    if (err) throw err;
                    console.log(pages);
                    console.log("I got the result of " + pages.length + " inside pageMain validation");
                    if (_.isEmpty(pages)) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        } else {
            return true;
        }
    }).withMessage("Main Page already exists."),
    check('pageText').escape().trim(),
    check('pageURL').trim().isLength({ min: 1, max: 100 }).withMessage('The URL should contain at least 1 and at most 100 characters.').custom(value => {
        var format = /[!@#$%^&*()~+\=\[\]{};':"\\|,.<>\/?]/;
        return !format.test(value);
    }).withMessage("The URL cannot conatin special characters.").custom((value, { req }) => {
        let id = new ObjectID(req.body.pageID);
        return new Promise((resolve, reject) => {
            Page.isURLUnique(value, id, function (err, pages) {
                if (err) throw err;
                console.log(pages);
                if (_.isEmpty(pages)) {
                    console.log("This array is empty" + pages.length);
                    resolve();
                } else {
                    console.log("This array is not empty" + pages.length);
                    reject();
                }
            });
        });
    }).withMessage("This URL already exists in database. Please write another one."),
    check('pageKeywords').trim().escape().isLength({ min: undefined, max: 100 }).withMessage('The page keywords is too long or too short.'),
    check('pageDescription').trim().escape().isLength({ min: undefined, max: 100 }).withMessage('The page description is too long or too short.')
];

module.exports.mergeObjects = function(obj, src){
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}