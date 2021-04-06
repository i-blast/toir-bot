const nconf = require('nconf');
const path = require('path');

nconf
    .env()
    .file({file: path.join(__dirname, '../../config/config.json')});

module.exports = nconf;
