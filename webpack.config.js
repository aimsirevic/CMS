const path = require('path');
module.exports = {
    entry: {
        main: './public/javascripts/main.js',
        fileManager: './public/javascripts/fileManager/fileManager.js',
        page: './public/javascripts/pages/page.js'
      },
      output: {
        filename: '[name].js',
        path: __dirname + '/public/javascripts/dist'
      }
};