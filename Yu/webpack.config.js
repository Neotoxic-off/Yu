const path = require('path');

module.exports = {
    entry: './content.js', // Entry point for your content script
    output: {
        filename: 'bundle.js', // Output file
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production'
};