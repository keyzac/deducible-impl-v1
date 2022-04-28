const { Logger } = require('@rimac/common');
const DomainConstants = require('./DomainConstant');


module.exports = {

  obtenerDeducible(textoTaller) {
    Logger.info('----- ServiceSupport.obtenerDeducible -----');
    Logger.info(textoTaller);

    const textoDeducible = textoTaller.match(/\d{2}(\.\d{2})?%/gi)[0];
    const deducible = parseInt(textoDeducible.replace('%', ''), 10);

    return deducible;
  },

  obtenerCopago(textoTaller) {
    Logger.info('----- ServiceSupport.obtenerCopago -----');
    Logger.info(textoTaller);

    const textoCopago = textoTaller.match(/(US\$|S\/.)\s*\d+(.\d+)?/gi)[0];
    const copago = parseInt(textoCopago.replace(/(US\$|S\/.)\s*/gi, ''), 10);

    return copago;
  },

  obtenerTipo(textoTaller) {
    Logger.info('----- ServiceSupport.obtenerTipo -----');
    Logger.info(textoTaller);

    const expresionRegular = DomainConstants.TIPOS.join('|');
    const filtro = new RegExp(expresionRegular, 'gi');
    let tipo = textoTaller.match(filtro);

    tipo = tipo ? (tipo[0][0].toUpperCase() + tipo[0].slice(1)) : (DomainConstants.TIPO_DEFECTO);

    return tipo;
  },

  obtenerTaller(textoTaller) {
    Logger.info('----- ServiceSupport.obtenerTaller -----');
    Logger.info(textoTaller);

    const filtroTaller = textoTaller.match(/(otro(s)? )?taller[\wá-ú\t, ]+(\d+(.\d+)?%|\n|$|\)|\.)/gi)[0];
    const palabraFiltroEncontrada = filtroTaller.search(/preferencia|especial|afiliado|otro/gi);
    let taller = filtroTaller.replace(/(\s*taller(es)?\s+|,\s+\d+(.\d+)?%)/gi, '');

    taller = palabraFiltroEncontrada === -1 ? taller.replace(/(\s*taller(es)?\s+|,\s+\d+(.\d+)?%)/gi, '').trimEnd() : DomainConstants.TALLER_DEFECTO;

    return taller;
  },

  obtenerMarca(textoTaller) {
    Logger.info('----- ServiceSupport.obtenerMarca -----');
    Logger.info(textoTaller);

    const textoMarca = textoTaller.match(/marca\s+[\wá-ú, ]+:/gi);
    const expresionRegular = DomainConstants.MARCAS.join('|');
    const filtro = new RegExp(expresionRegular, 'gi');

    let marcas = textoMarca ? textoMarca[0].match(filtro) : DomainConstants.MARCA_DEFECTO;
    if (typeof marcas === 'object') {
      marcas = marcas.map((element) => element.toUpperCase());
      marcas = marcas.join(', ');
    }

    return marcas;
  },

  obtenerMoneda(textoTaller) {
    Logger.info('----- ServiceSupport.obtenerMoneda -----');
    Logger.info(textoTaller);

    const textoMoneda = textoTaller.match(/US\$|S\/./gi);
    const moneda = DomainConstants.MONEDAS[textoMoneda[0]];

    return moneda;
  }

};
