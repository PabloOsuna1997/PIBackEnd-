module.exports = (body,transferencia) => {
    return {
        data: {
            //se solicita solo:
            //bodeguero que acepta
            //repartidor asignado
            tipo_transferencia: transferencia.tipo_transferencia,             //I:interna, E: externa
            estado_Transferencia: 1,                                            //0:estado en solicitud, 1:aceptada, 2:entregada
            producto: transferencia.producto,
            cantidad_saliente: transferencia.cantidad_saliente,
            usuario_acepta: body.usuarioBodegueroAcepta,
            repartidor: body.correoRepartidor,
            sede_origen: transferencia.sede_origen,
            sede_destino: transferencia.sede_destino,
            bodega_origen: transferencia.bodega_origen,
            bodega_destino: transferencia.bodega_destino
        }
    }
};