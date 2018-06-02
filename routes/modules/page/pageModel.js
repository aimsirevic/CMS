var mongoose = require('mongoose');
const _ = require('lodash');
var ObjectID = require('mongodb').ObjectID;

var PageSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page',
        default: null
    },
    main: {
        type: Boolean
    },
    template: {
        type: String
    },
    image: {
        type: String
    },
    text: {
        type: String
    },
    URL: {
        type: String,
        unique: true,
        required: true
    },
    keywords: {
        type: String
    },
    description: {
        type: String
    }
});

var Page = module.exports = mongoose.model('Page', PageSchema);

module.exports.createPage = function (newPage, callback) {
    newPage.save(callback);
}
module.exports.isURLUnique = function (url, pageid, callback) {
    console.log(pageid + " jebem ti stromajku proradiiiii URL !!!!!");
    if (pageid !== undefined && pageid !== null) {
        console.log("uuuuuuuuuuuuuslaaa sama aaaaa a");
        Page.find({ URL: url, _id: { $ne: pageid } }, callback);
    } else {
        console.log("fffffffffffffffff");
        Page.find({ URL: url }, callback);
    }
}
module.exports.doesMainPageExist = function (pageid, callback) {
    console.log(pageid + " jebem ti stromajku proradiiii MAIN i!!!!!");
    if (pageid !== undefined && pageid !== null) {
        console.log("uuuuuuuuuuuuuslaaa sama aaaaa a");
        Page.find({ main: true, _id: { $ne: pageid } }, callback);
    } else {
        console.log("fffffffffffffffff");
        Page.find({ main: true }, callback);
    }
}
module.exports.thisPageIsMain = function (id, callback) {
    Page.find({ main: true, _id: id }, callback);
}
module.exports.getPages = function () {
    return Page.find({});
}
module.exports.removePageById = function (id, callback) {
    Page.findByIdAndRemove(id, callback);
}
module.exports.getPageById = function (id) {
    return Page.findById(id);
}
module.exports.getMainPage = function () {
    return Page.findOne({ main: true });
}
module.exports.unsetMainPage = function (callback) {
    Page.update({ main: true }, { $set: { main: false } }, callback);
}
module.exports.updatePage = function (id, page, callback) {
    Page.findOneAndUpdate({ _id: id }, page, {
        upsert: true,
        new: true,
        overwrite: true
    }, callback);
}
module.exports.getPagesThatHasParent = function () {
    return Page.find({ parent: { $ne: null } });
}
module.exports.getPagesByParentId = function (parentid) {
    let id = new ObjectID(parentid);
    return Page.find({ parent: id });
}
module.exports.isParent = function (pageid) {
    let id = new ObjectID(pageid);
    return Page.count({ parent: id });
}
