const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.put('/:id', async (req, res) => {
        try {
            if (req.body.correoRepartidor == undefined) {           //aceptacion interna
                req.body.correoRepartidor = null
            }
            const entradaAceptarTransferencia = require('../../src/mapeoObjetos/transferencia/entradaAceptarTransferencia');
            const transferencia = await db.query('SELECT * FROM TRANSFERENCIA WHERE codigo_transferencia = ?', [req.params.id]);
            var trans = Object.assign({}, transferencia[0]);
            //vericar si es aceptacion interna o externa
            const result = await db.query('UPDATE TRANSFERENCIA set ? WHERE codigo_transferencia = ?', [entradaAceptarTransferencia(req.body, trans).data, req.params.id]);
            if (result.affectedRows > 0) {

                if (trans.tipo_transferencia == 'I') {
                    //transferencia interna se debe actualizar el inventario de inmediato                    
                    const invOrigen = await db.query('SELECT codigo_inventario FROM INVENTARIO WHERE bodega = ?', [trans.bodega_origen]);
                    const invDestino = await db.query('SELECT codigo_inventario FROM INVENTARIO WHERE bodega = ?', [trans.bodega_destino]);

                    var inventarioOrigen = Object.assign({}, invOrigen[0]);
                    var inventarioDestino = Object.assign({}, invDestino[0]);

                    //verificar que la cantidad saliente cumpla con la cantidad existente
                    var detalle = await db.query('SELECT * FROM DETALLE_INVENTARIO WHERE inventario = ? AND producto = ?',
                        [inventarioOrigen.codigo_inventario, trans.producto]);
                    var di = Object.assign({}, detalle[0]);

                    if (di.cantidad_nueva >= trans.cantidad_saliente) {
                        const updateOrigen = await db.query('UPDATE DETALLE_INVENTARIO SET cantidad_antigua = cantidad_nueva, cantidad_nueva = ? WHERE inventario = ? AND producto = ?',
                            [(di.cantidad_nueva - trans.cantidad_saliente), inventarioOrigen.codigo_inventario, trans.producto]);

                        //verificar que la cantidad saliente cumpla con la cantidad existente
                        //verificar si existe el producto si no hay que crearlo
                        detalle1 = await db.query('SELECT * FROM DETALLE_INVENTARIO WHERE inventario = ? AND producto = ?',
                            [inventarioDestino.codigo_inventario, trans.producto]);
                        di1 = Object.assign({}, detalle1[0]);
                        if (detalle1.length < 1) {
                            //creamos ese detalle de inventario
                            const entradaInvProducto = require('../../src/mapeoObjetos/producto/entradaInventarioProducto');
                            const insert = await db.query('INSERT INTO DETALLE_INVENTARIO set ?;', [entradaInvProducto(trans.producto, trans.cantidad_saliente, inventarioDestino.codigo_inventario).data]);

                            if (insert.affectedRows > 0) {
                                res.status(200).send({ mensaje: 'Transferencia realizada con exito' });
                            } else {
                                res.status(200).send({ mensaje: 'La bodega destino no acepta productos en este momento.' });
                            }
                        } else {
                            const updateDestino = await db.query('UPDATE DETALLE_INVENTARIO SET cantidad_antigua = cantidad_nueva, cantidad_nueva = ? WHERE inventario = ? AND producto = ?',
                                [(di1.cantidad_nueva + trans.cantidad_saliente), inventarioDestino.codigo_inventario, trans.producto]);

                            if (updateDestino.affectedRows > 0) {
                                const logInventario = require('../../src/mapeoObjetos/bodega/inventario/logInventario');
                                req.body.correoUsuario = req.body.usuarioBodegueroAcepta;
                                req.body.motivo = "Transferencia interna.";
                                req.body.skuProducto = trans.producto;
                                req.body.cantidadNueva = di.cantidad_nueva - trans.cantidad_saliente;
                                //log de actualizacion de inventario
                                //origen
                                var log = await db.query('INSERT INTO LOG_ACTUALIZACION set ?',[logInventario(req.body,trans.bodega_origen,inventarioOrigen.codigo_inventario,di.cantidad_nueva).data]);
                               
                                //destino
                                req.body.cantidadNueva = di1.cantidad_nueva + trans.cantidad_saliente;
                                var log1 = await db.query('INSERT INTO LOG_ACTUALIZACION set ?',[logInventario(req.body,trans.bodega_destino,inventarioDestino.codigo_inventario,di1.cantidad_nueva).data]);
                                
                                res.status(200).send({ mensaje: 'Transferencia realizada con exito' });
                            } else {
                                res.status(200).send({ mensaje: 'La bodega destino no acepta productos en este momento.' });
                            }
                        }
                    } else {
                        //rolback a transferencia.
                        const result = await db.query('UPDATE TRANSFERENCIA set estado_transferencia = 0 WHERE codigo_transferencia = ?', [req.params.id]);
                        res.status(500).send({ mensaje: 'La cantidad disponible no es suficiente para hacer la transferencia' });
                    }
                }else{
                    //transferencia externa
                }
            } else {
                res.status(400).send({ mensaje: 'No se pudo aceptar la tranferencia' });
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud.' });
        }
    });
};