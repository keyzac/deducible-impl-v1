const { AppFactory } = require('@rimac/core');
const controller = require('./controller');

module.exports.handler = AppFactory.bootstrap(controller);
