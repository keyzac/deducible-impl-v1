const { AppFactory } = require('@rimac/core');
const controller = require('./Controller');

module.exports.handler = AppFactory.bootstrap(controller);
