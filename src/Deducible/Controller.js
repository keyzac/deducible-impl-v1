const { Logger } = require('@rimac/common');
const Service = require('./Service');

module.exports = {

  async obtenerDeducible(payload) {
    Logger.info('----- Controller.obtenerDeducible -----');
    Logger.info(payload);

    return Service.obtenerDeducibleService(payload);
  }

};
