const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.post('/', async (req, res) => {
        try {

            const entradaVenta = require('../../src/mapeoObjetos/venta/entradaCrear');
            //validar usuario repartidor
            const vendedor = await db.query('SELECT rol FROM ROL_USUARIO WHERE correo = ?', [req.body.correoVendedor]);
            if (vendedor.length <= 0) {
                res.status(400).send({ mensaje: 'El vendedor no existe.' });
            }

            if (req.body.correoRepartidor != '') {
                const repartidor = await db.query('SELECT rol FROM ROL_USUARIO WHERE correo = ?', [req.body.correoRepartidor]);
                if (repartidor.length <= 0) {
                    res.status(400).send({ mensaje: 'El repartidor no existe.' });
                }
            } else {
                req.body.correoRepartidor = null;
                req.body.fechaEntrega = null;
                req.body.tipoVenta = 0;
                req.body.sobreCargo = 0;
            }

            const result = await db.query('INSERT INTO VENTA set ?', [entradaVenta(req.body).data]);
            const venta = Object.assign({}, result);

            if (result.affectedRows > 0) {
                //insertar detalle venta
                var status = 0;
                for (const element of req.body.productos) {
                    const entradaVentaProducto = require('../../src/mapeoObjetos/venta/entradaVentaProducto');
                    const ress = await db.query('INSERT INTO DETALLE_VENTA set ?', [entradaVentaProducto(element, venta.insertId).data]);

                    if (ress.affectedRows > 0) {
                        //actualizar el inventario
                        if (req.body.tipoVenta == 0) {
                            //venta local debo actualizar el invetario de inmediato
                            const updateOrigen = await db.query('UPDATE DETALLE_INVENTARIO SET cantidad_antigua = cantidad_nueva, cantidad_nueva = cantidad_nueva - 1 WHERE inventario = ? AND producto = ?',
                                [element.idInventario, element.skuProducto]);

                            const det = await db.query('SELECT * FROM DETALLE_INVENTARIO  WHERE inventario = ? AND producto = ?',
                                [element.idInventario, element.skuProducto]);
                            di = Object.assign({}, det[0]);

                            //insertamos el log
                            req.body.correoUsuario = req.body.correoVendedor;
                            req.body.motivo = "Venta local.";
                            req.body.skuProducto = element.skuProducto;
                            req.body.cantidadNueva = di.cantidad_nueva;
                            //log de actualizacion de inventario
                            //origen
                            const logInventario = require('../../src/mapeoObjetos/bodega/inventario/logInventario');
                            var log = await db.query('INSERT INTO LOG_ACTUALIZACION set ?', [logInventario(req.body, element.idBodega, di.inventario, di.cantidad_antigua).data]);


                        }
                        status = 200;
                    } else {
                        status = 400;
                    }
                }
                if (status == 200) {


                    res.status(200).send({ mensaje: 'Venta Agregada con exito.' });
                } else {
                    res.status(400).send({ mensaje: 'Venta Agregada con exito pero alguno de sus productos no pudo registrarse.' });
                }
            } else {
                res.status(400).send({ mensaje: 'Datos incorrectos.' });
            }
        } catch (error) {
            console.log(error)
            if (error.code == 'ER_NO_REFERENCED_ROW_2') {
                res.status(400).send({ mensaje: 'El nit del cliente no se encuentra registrado en ninguna de nuestras sedes.' });
            } else {
                res.status(500).send({ mensaje: 'No se pudo completar la solicitud.' });
            }
        }
    });
};