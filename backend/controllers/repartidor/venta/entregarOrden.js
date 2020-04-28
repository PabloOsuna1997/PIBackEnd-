const db = require('../../../src/dataBase/conexion');

module.exports = function (router) {
    router.put('/:correo/:venta', async (req, res) => {
        try {
            const result = await db.query('UPDATE VENTA set estado_repartidor = 1 WHERE repartidor = ? AND codigo_venta = ? AND estado_repartidor = 0', [req.params.correo, req.params.venta]);
            if (result.affectedRows > 0) {
                //actualizar el inventario

                const productos = await db.query('SELECT * FROM DETALLE_VENTA WHERE venta = ?', [req.params.venta]);

                for (var index = 0; index < productos.length; index++) {
                    var element = Object.assign({}, productos[index]);
                    //venta local debo actualizar el invetario de inmediato
                    var updateOrigen = await db.query('UPDATE DETALLE_INVENTARIO SET cantidad_antigua = cantidad_nueva, cantidad_nueva = cantidad_nueva - 1 WHERE inventario = ? AND producto = ?',
                        [element.codigo_inventario, element.producto]);

                    var det = await db.query('SELECT * FROM DETALLE_INVENTARIO  WHERE inventario = ? AND producto = ?',
                        [element.codigo_inventario, element.producto]);
                    di = Object.assign({}, det[0]);

                    //insertamos el log
                    req.body.correoUsuario = req.params.correo;
                    req.body.motivo = "Venta a domicilio.";
                    req.body.skuProducto = element.producto;
                    req.body.cantidadNueva = di.cantidad_nueva;
                    //log de actualizacion de inventario
                    //origen
                    const logInventario = require('../../../src/mapeoObjetos/bodega/inventario/logInventario');
                    var log = await db.query('INSERT INTO LOG_ACTUALIZACION set ?', [logInventario(req.body, element.bodega, element.codigo_inventario, di.cantidad_antigua).data]);
                }

                res.status(200).send({ mensaje: 'Venta entregada' });
            } else {
                res.status(400).send({ mensaje: 'El correo indicado no existe o la venta no existe, o esta orden ya fue entregada.' });
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud.' });
        }
    });
};