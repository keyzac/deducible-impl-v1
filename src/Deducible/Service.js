const { Logger } = require('@rimac/common');
const ServiceSupport = require('./Supports/ServiceSupport');

module.exports = {

  async obtenerDeducibleService(payload) {
    Logger.info('----- Service.obtenerDeducible -----');
    Logger.info(payload);

    const { text } = payload;
    const response = [];

    const tallerExpRegular = /taller[\w\s%.,á-ú]+(US\$|S\/.)\s*[\d]+|(marca[\w\s.,:á-ú]+)*[\d]+[.\d]*%[\w\s.,á-ú]+(US\$|S\/.)\s*[\d]+[\w\s.,á-ú(]+taller[\w \t.,á-ú)]+(\n|$)/gi;
    const textoTalleres = text.match(tallerExpRegular);

    for (const textoTaller of textoTalleres) {
      const deducible = ServiceSupport.obtenerDeducible(textoTaller);
      const copago = ServiceSupport.obtenerCopago(textoTaller);
      const tipo = ServiceSupport.obtenerTipo(textoTaller);
      const taller = ServiceSupport.obtenerTaller(textoTaller);
      const marca = ServiceSupport.obtenerMarca(textoTaller);
      const moneda = ServiceSupport.obtenerMoneda(textoTaller);

      const variables = {
        deducible,
        copago,
        moneda,
        tipo,
        marca,
        taller
      };
      response.push(variables);
    }
    return response;
  }

};
