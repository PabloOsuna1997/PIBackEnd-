const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.put('/:bodega', async (req, res) => {
        try {
            //bodega
            //motivo
            //fecha
            //correoUsuario
            //producto
            //cantidadAntigua
            //cantidadNueva
            //calcular inventario

            //encontrar el id del inventario
            const inv = await db.query('SELECT codigo_inventario FROM INVENTARIO WHERE bodega = ?', [req.params.bodega]);
            var inventario = Object.assign({}, inv[0]);
            console.log(inventario);
            if (inv.length > 0) {
                //hacer la modificacion a inventario
                const entradaActualizarInventario = require('../../src/mapeoObjetos/bodega/inventario/entradaActualizarInventario');
                console.log(entradaActualizarInventario(req.body, req.params.bodega).data);
                const result = await db.query('UPDATE INVENTARIO set ? WHERE bodega = ?', [entradaActualizarInventario(req.body, req.params.bodega).data, req.params.bodega]);
                if (result.affectedRows > 0) {
                    //actualizar el detalle de inventario
                    const cantAntigua = await db.query('SELECT * FROM DETALLE_INVENTARIO WHERE inventario = ? AND producto = ?', [inventario.codigo_inventario, req.body.skuProducto]);
                    var cantidad = Object.assign({}, cantAntigua[0]);
                    if (cantAntigua.length > 0) {
                        const entradaActualizarDetalleInventario = require('../../src/mapeoObjetos/bodega/inventario/entradaActualizarDetalleInventario');
                        const resultDetalle = await db.query('UPDATE DETALLE_INVENTARIO set ? WHERE inventario = ? AND producto = ? ',
                            [entradaActualizarDetalleInventario(req.body, cantidad.cantidad_nueva, inventario.codigo_inventario).data, inventario.codigo_inventario, req.body.skuProducto]);

                        if (resultDetalle.affectedRows > 0) {
                            //insercion al log
                            const logInventario = require('../../src/mapeoObjetos/bodega/inventario/logInventario');
                            const log = await db.query('INSERT INTO LOG_ACTUALIZACION set ?',[logInventario(req.body,req.params.bodega,inventario.codigo_inventario,cantidad.cantidad_nueva).data]);
                            res.status(200).send({ mensaje: 'Actualizacion de inventario se ha realizado correctamente.' });
                        } else {
                            res.status(400).send({ mensaje: 'No se pudo actualizar el producto de esta bodega.' });
                        }
                    } else {
                        res.status(400).send({ mensaje: 'No se encontro el producto en el inventario.' });
                    }
                } else {
                    res.status(400).send({ mensaje: 'No se puede actualizar el inventario de esta bodega.' });
                }
            } else {
                res.status(400).send({ mensaje: 'No se encuentra esa bodega.' });
            }

            //insertar en el log de actualizaciones de inventario

        } catch (error) {
            console.log(error);
            res.status(500).send({ mensje: 'No se pudo completar la solicitud' });
        }
    });
};