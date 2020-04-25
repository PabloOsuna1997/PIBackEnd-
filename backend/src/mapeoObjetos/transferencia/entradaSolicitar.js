module.exports = (body) => {
    return {
        data: {
            tipo_transferencia: body.tipoTransferencia,             //I:interna, E: externa
            estado_Transferencia: 0,                                //0:estado en solicitud, 1:aceptada, 2: entregada
            producto: body.skuProducto,
            cantidad_saliente: body.cantidadSaliente,
            usuario_acepta: null,           //se asigna hasta que se acepte
            repartidor: null,               //se asigna hasta que se acepte
            sede_origen: body.sedeOrigen,
            sede_destino: body.sedeDestino,
            bodega_origen: body.bodegaOrigen,
            bodega_destino: body.bodegaDestino
        }
    }
}