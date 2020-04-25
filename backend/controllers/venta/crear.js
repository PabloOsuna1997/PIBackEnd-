const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.post('/', async (req, res) => {
        try {
            
            const entradaVenta = require('../../src/mapeoObjetos/venta/entradaCrear');
            //validar usuario repartidor
            if (req.body.correoRepartidor != '') {
                const repartidor = await db.query('SELECT rol FROM ROL_USUARIO WHERE correo = ?', [req.body.correoRepartidor]);
                if (repartidor.length <= 0) {
                    res.status(400).send({ mensaje: 'El repartidor no existe.' });
                }
            }else{
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
                    const ress = await db.query('INSERT INTO DETALLE_VENTA set ?', [entradaVentaProducto(element,venta.insertId).data]);

                    if (ress.affectedRows > 0) {
                        status = 200;
                    } else {
                        status = 400;
                    }
                }
                if (status == 200) {
                    //actualizar el inventario
                    res.status(200).send({ mensaje: 'Venta Agregada con exito.' });
                } else {
                    res.status(400).send({ mensaje: 'Venta Agregada con exito pero alguno de sus productos no pudo registrarse.' });
                }
            } else {
                res.status(400).send({ mensaje: 'Datos incorrectos.' });
            }
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud.' });
        }
    });
};