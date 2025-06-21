const listDebt = async(inputDdebs) => {
  const labelGestion = 'gestion';
  const labelCodMoneda = 'codMoneda';
  const labelMonto = 'monto';
  const labelDescripcion = 'descripcion';
  const labelTituloAgrupacion = 'tituloAgrupacion';
  const labelPrioridad = 'prioridad';
  const labelMontoAcumulado = 'montoAcumulado';
  const labelMesPeriodo = 'mesPeriodo';
  const labelAnioPeriodo = 'anioPeriodo';
  const labelCodSubServicio = 'codSubServicio';
  const labelNroLlave = 'nroLlave';
  const labelMontoMinimo = 'montoMinimo';
  const labelIdDeudaExterna = 'idDeudaExterna';
  const labelIdItemDependencia = 'idItemDependencia';
  const labelCuenta = 'cuenta';
  const labelServicio = 'servicio';
  const labelNit = 'nit';
  const labelRazonSocial = 'razonSocial';
  const labelDirecEnvio = 'direcEnvio';
  const labelComplemento = 'complemento';
  const labelNombreDeudor = 'nombreDeudor';
  const labelModificaNit = 'modificaNit';
  const labelIndice = 'indice';

  return inputDdebs.map(function(item, index) {
    const groupDeuda = 'deuda';
    const groupFiltro = 'filtro';
    index = index + 1;
    return {
      deuda: [
        { label: labelGestion, value: item.anioPeriodo, mandatory: false, editable: 'N', grupo: groupDeuda, code: labelGestion, tipoDato: 'N', indice: index },
        { label: labelCodMoneda, value: '0', mandatory: false, editable: 'N', grupo: groupDeuda, code: labelCodMoneda, tipoDato: 'N', indice: index },
        { label: labelMonto, value: item.monto, mandatory: false, editable: 'N', grupo: groupDeuda, code: labelMonto, tipoDato: 'D', indice: index },
        { label: labelDescripcion, value: item.descItem, mandatory: false, editable: 'N', grupo: groupDeuda, code: labelDescripcion, tipoDato: 'C', indice: index },
        { label: labelTituloAgrupacion, value: '', mandatory: false, editable: 'N', grupo: groupDeuda, code: labelTituloAgrupacion, tipoDato: 'C', indice: index },
        { label: labelPrioridad, value: '0', mandatory: false, editable: 'N', grupo: groupDeuda, code: labelPrioridad, tipoDato: 'N', indice: index },
        { label: labelMontoAcumulado, value: '0', mandatory: false, editable: 'N', grupo: groupDeuda, code: labelMontoAcumulado, tipoDato: 'D', indice: index },
        { label: labelMesPeriodo, value: item.mesPeriodo, mandatory: false, editable: 'N', grupo: groupDeuda, code: labelMesPeriodo, tipoDato: 'N', indice: index },
        { label: labelAnioPeriodo, value: item.anioPeriodo, mandatory: false, editable: 'N', grupo: groupDeuda, code: labelAnioPeriodo, tipoDato: 'N', indice: index },
        { label: labelCodSubServicio, value: '0', mandatory: false, editable: 'N', grupo: groupDeuda, code: labelCodSubServicio, tipoDato: 'C', indice: index },
        { label: labelNroLlave, value: '0', mandatory: false, editable: 'N', grupo: groupDeuda, code: labelNroLlave, tipoDato: 'N', indice: index },
        { label: labelMontoMinimo, value: '0', mandatory: false, editable: 'N', grupo: groupDeuda, code: labelMontoMinimo, tipoDato: 'D', indice: index },
        { label: labelIdDeudaExterna, value: item.idDependencia, mandatory: false, editable: 'N', grupo: groupDeuda, code: labelIdDeudaExterna, tipoDato: 'C', indice: index },
        { label: labelIdItemDependencia, value: item.idDependencia, mandatory: false, editable: 'N', grupo: groupDeuda, code: labelIdItemDependencia, tipoDato: 'C', indice: index },
        { label: labelCuenta, value: item.cuenta, mandatory: true, editable: 'N', grupo: groupFiltro, code: labelCuenta, tipoDato: 'C', indice: index },
        { label: labelServicio, value: item.servicio, mandatory: true, editable: 'N', grupo: groupFiltro, code: labelServicio, tipoDato: 'N', indice: index },
        { label: labelNit, value: item.numeroNit, mandatory: true, editable: 'N', grupo: groupFiltro, code: labelNit, tipoDato: 'N', indice: index },
        { label: labelRazonSocial, value: '0', mandatory: true, editable: 'N', grupo: groupFiltro, code: labelRazonSocial, tipoDato: 'C', indice: index },
        { label: labelDirecEnvio, value: '0', mandatory: true, editable: 'N', grupo: groupFiltro, code: labelDirecEnvio, tipoDato: 'C', indice: index },
        { label: labelComplemento, value: '0', mandatory: false, editable: 'N', grupo: '', code: labelComplemento, tipoDato: 'C', indice: index },
        { label: labelNombreDeudor, value: item.nombre, mandatory: false, editable: 'N', grupo: '', code: labelNombreDeudor, tipoDato: 'C', indice: index },
        { label: labelModificaNit, value: 'S', mandatory: false, editable: 'N', grupo: '', code: labelModificaNit, tipoDato: 'C', indice: index },
        { label: labelIndice, value: item.indice, mandatory: true, editable: 'N', grupo: groupDeuda, code: labelIndice, tipoDato: 'G', indice: index }
      ]
    };
  });
};

module.exports = {
  listDebt
};