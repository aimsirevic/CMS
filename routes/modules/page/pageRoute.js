var router = require('express').Router();
const fs = require('fs');
var filesController = require('../fileManager/fileManagerController');
var Page = require('./pageModel');
var controller = require('./pageController');
var _ = require('lodash');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
//v3 - async/await version
router.get('/', async function (req, res) {
    var parents = [];
    try {
        var pages = await Page.find({});
        pages.forEach(async function (page) {
            if (page.parent !== null) {
                var parent = await Page.getPageById(page.parent);
                //add new parent with childs if it is not null and if it doesnt already exist in parents array
                console.log("IF COND");
                if (parent != null && !_.find(parents, ['_id', parent._id])) {
                    parent = parent.toJSON();
                    var parentChilds = await Page.getPagesByParentId(parent._id);
                    var thumb = "";
                    var childs = [];
                    parentChilds.forEach(function (child) {
                        child = child.toJSON();
                        if (child.image) {
                            child.thumb = controller.getThumbnailByImagePath(child.image);
                        }
                        childs.push(child);
                    });
                    if (parent.image) {
                        thumb = controller.getThumbnailByImagePath(parent.image);
                    }
                    console.log("ADDED PAGE");
                    parents.push(controller.mergeObjects(parent, { "childs": childs, "thumb": thumb }));
                }
            } else {
                var count = await Page.isParent(page._id);
                console.log("Countttt " + count);
                if (count === 0) {
                    var thumb = "";
                    if (page.image) {
                        thumb = controller.getThumbnailByImagePath(page.image);
                    }
                    parents.push(controller.mergeObjects(page.toJSON(), { "thumb": thumb }));
                }
            }
        });
        console.log(parents)
        res.render('modules/pages/index', { text: "List pages", pages: pages, parents: parents });
    } catch (err) {
        return console.error(err);
    }
});

//v2 - promises version
/* router.get('/', function (req, res) {
    var parents = [];
    var _pages = [];
    Page.find({})
        .then((pages) => {
            var jobQueries = [];
            _pages = pages;
            pages.forEach(function (page) {
                if (page.parent !== null) {
                    var promise = Page.findById(page.parent)
                        .then((p) => { //p
                            console.log("Async sucks");
                            if (p != null && !_.find(parents, ['_id', p.parent])) {
                                Page.getPagesByParentId(page.parent)
                                    .then((pChilds) => {
                                        var thumb = "";
                                        var childs = [];
                                        pChilds.forEach(function (child) {
                                            child = child.toJSON();
                                            if (child.image) {
                                                child.thumb = controller.getThumbnailByImagePath(child.image);
                                            }
                                            childs.push(child);
                                        });
                                        if (p.image) {
                                            thumb = controller.getThumbnailByImagePath(p.image);
                                        }
                                        console.log("Adding parent " + p._id);
                                        parents.push(controller.mergeObjects(p.toJSON(), { "childs": childs, "thumb": thumb }));
                                    });
                            }
                        });
                    jobQueries.push(promise);
                } else {
                    var p1 = Page.isParent(page._id).then(function (count) {
                        console.log("Countttt " + count);
                        if (count === 0) {
                            var thumb = "";
                            if (page.image) {
                                thumb = controller.getThumbnailByImagePath(page.image);
                            }
                            parents.push(controller.mergeObjects(page.toJSON(), { "thumb": thumb }));
                        }
                    })
                    jobQueries.push(p1);
                }
            });

            return Promise.all(jobQueries);
        }).then(function () {
            res.render('modules/pages/index', { text: "List pages", pages: _pages, parents: parents });
        }).catch((err) => {
            console.log(err);
            throw err;
        });

}); */


//version 1 callback hell !! 
/* router.get('/', function (req, res) {
    var parents = [];
    var allPages = Page.getPages();
    allPages.then(function (pages) {
        pages.forEach(function (page) {
            if (page.parent !== null) {
                Page.getPageById(page.parent).then(function (p) {
                    if(!_.find(parents, ['_id', p.parent])){
                        Page.getPagesByParentId(page.parent).then(function (pChilds) {
                            var thumb = "";
                            var childs = [];
                            pChilds.forEach(function (child) {
                                child = child.toJSON();
                                if (child.image) {
                                    child.thumb = controller.getThumbnailByImagePath(child.image);
                                }
                                childs.push(child);
                            });
                            if (p.image) {
                                thumb = controller.getThumbnailByImagePath(p.image);
                            }
                            console.log("Adding parent " + p._id);
                            parents.push(controller.mergeObjects(p.toJSON(), { "childs": childs, "thumb": thumb }));
                        }).catch(function (error) {
                            console.error(error);
                            res.render(error, { error: error })
                        });
                    }
                }).catch(function (error) {
                    console.error(error);
                    res.render(error, { error: error })
                });
            } else {
                Page.isParent(page._id, function (err, count) {
                    console.log("Countttt " + count);
                    if (count === 0) {
                        var thumb = "";
                        if (page.image) {
                            thumb = controller.getThumbnailByImagePath(page.image);
                        }
                        parents.push(controller.mergeObjects(page.toJSON(), { "thumb": thumb }));
                    }
                });
            }
        });
        res.render('modules/pages/index', { text: "List pages", pages: pages, parents: parents });
    }).catch(function (error) {
        console.error(error);
        res.render(error, { error: error })
    });
}); */

router.get('/delete/:pageID', function (req, res) {
    var pageID = req.params.pageID;
    Page.removePageById(pageID, function (err, page) {
        if (err) {
            console.log(err);
            req.flash('error_msg', "Error while deleting file. - " + page.name);
        } else {
            req.flash('success_msg', "Succesfully deleted page. - " + page.name);
        }
    });
    res.redirect('/pages');
});

router.get('/edit/:pageID', function (req, res) {
    var pageID = req.params.pageID;
    var promise = Page.getPageById(pageID);
    promise.then(function (dbPage) {
        var templates = [];
        var dir = './views/templates/';
        fs.readdir(dir, (err, files) => {
            files.forEach(file => {
                if (fs.statSync(dir + '/' + file).isFile()) {
                    var templateName = file.slice(0, -4);
                    var template = { name: templateName, selected: false };
                    if (templateName === dbPage.template) {
                        template.selected = true;
                    }
                    templates.push(template);
                }
            });
        });
        var promise = Page.getPages();
        promise.then(function (pages) {
            var counter = 0;
            pages.forEach(p => {
                if (p._id.equals(dbPage.parent)) {
                    p.selected = true;
                }
                if (p.name == dbPage.name) {
                    delete pages[counter]
                }
                counter++;
            })
            res.render('modules/pages/page', { mode: 'edit', text: "Edit page", scripts: ["page.js"], page: dbPage, templates: templates, pages: pages });
        }).catch(function (error) {
            console.error(error);
            res.render(error, { error: error })
        });

    }).catch(function (err) {
        console.log(err);
        req.flash('error_msg', "Could not find this page.");
        res.redirect('/pages');
    });
});


router.get('/add', function (req, res) {
    var templates = [];
    var dir = './views/templates/';
    fs.readdir(dir, (err, files) => {
        files.forEach(file => {
            if (fs.statSync(dir + '/' + file).isFile()) {
                var templateName = file.slice(0, -4);
                var template = { name: templateName, selected: false };
                templates.push(template);
            }
        });
    });
    var promise = Page.getPages();
    promise.then(function (pages) {
        res.render('modules/pages/page', { mode: 'add', text: "Add page", templates: templates, scripts: ["page.js"], pages: pages });
    }).catch(function (error) {
        console.error(error);
        res.render(error, { error: error })
    });
});

router.get('/add/:path', function (req, res) {
    var path = req.params.path.split(":").join("/");
    var files = filesController.getFilesInCurrentFolder(path, "/pages/add/");
    var folderSettings = filesController.currentFolderSettings(path, "/pages/add/");
    var folderInfo = {};
    folderInfo.files = files;
    folderInfo.folderSettings = folderSettings;
    res.send(folderInfo);
});

router.post('/add', controller.validation, function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validation_errors', errors.mapped());
        res.redirect('/pages/add');
    } else {
        var newPage = new Page({
            name: req.body.pageName,
            main: req.body.pageMain,
            template: req.body.pageTemplate,
            image: req.body.pageImage,
            text: req.body.pageText,
            URL: req.body.pageURL,
            keywords: req.body.pageKeywords,
            description: req.body.pageDescription
        });
        if (!_.isEmpty(req.body.pageParent)) {
            newPage.parent = req.body.pageParent;
        }
        console.log(newPage)
        Page.createPage(newPage, function (err, page) {
            if (err) {
                throw err;
            }
            console.log("SUCCCESSSSFULLY ADDED PAGE " + page.name);
            req.flash('success_msg', "Sucessfully added page. - " + newPage.name); //Question??? Why isnt this appearing in view?
        });
        req.flash('success_msg', "Sucessfully added page. - " + newPage.name); // But this is appearing in view.. ??? Maybe req is not available inside Page.createPage
        res.redirect('/pages');
    }
});

router.post('/edit', controller.validation, function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validation_errors', errors.mapped());
        res.redirect('/pages/edit/' + req.body.pageID);
    } else {
        var updatedPage = {
            name: req.body.pageName,
            main: req.body.pageMain,
            template: req.body.pageTemplate,
            image: req.body.pageImage,
            text: req.body.pageText,
            URL: req.body.pageURL,
            keywords: req.body.pageKeywords,
            description: req.body.pageDescription
        };
        if (!_.isEmpty(req.body.pageParent)) {
            updatedPage.parent = req.body.pageParent;
        }
        console.log(updatedPage)
        Page.updatePage(req.body.pageID, updatedPage, function (err, page) {
            if (err) {
                throw err;
            }
            console.log("SUCCCESSSSFULLY EDITED PAGE " + page.name);
            req.flash('success_msg', "Sucessfully edited page. - " + updatedPage.name); //Question??? Why isnt this appearing in view?
        });
        req.flash('success_msg', "Sucessfully edited page. - " + updatedPage.name); // But this is appearing in view.. ??? Maybe req is not available inside Page.createPage
        res.redirect('/pages');
    }
});

router.get('/mainPage', function (req, res) {
    Page.doesMainPageExist(null, function (err, pages) {
        if (err) throw err;
        console.log(pages);
        console.log("I got the result of " + pages.length + " inside pageMain validation");
        if (_.isEmpty(pages)) {
            res.send(false);
        } else {
            res.send(true);
        }
    });
});

router.post('/mainPage/:id', function (req, res) {
    let id = req.params.id;
    Page.getMainPage().then(function (page) {
        if (page) {
            if (page._id == id) {
                res.send(true);
            } else {
                res.send(false);
            }
        } else {
            res.send(false);
        }
    }).catch(function (error) {
        console.error(error);
    });
});

router.get('/mainPage/unset', function (req, res) {
    Page.unsetMainPage(function (err, page) {
        if (err) throw err;
        res.send("OK");
    });
});

module.exports = router;