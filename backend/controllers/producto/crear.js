const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.post('/', async (req, res) => {

        try {

            const entradaProducto = require('../../src/mapeoObjetos/producto/entradaCrear');
            const result = await db.query('INSERT INTO PRODUCTO set ?', [entradaProducto(req.body).data]);

            if (result.affectedRows > 0) {
                //insercion de categorias idProducto = req.body.sku
                var status = 0;
                for (const element of req.body.categorias) {
                    const entradaProductoCategoria = require('../../src/mapeoObjetos/producto/entradaCategoriaProducto');
                    const ress = await db.query('INSERT INTO CATEGORIA_PRODUCTO set ?', [entradaProductoCategoria(element.id, req.body.sku).data]);

                    if (ress.affectedRows > 0) {
                        status = 200;
                    } else {
                        status = 400;
                    }
                }

                if (status == 200) {
                    //insertar en inventario de la bodega especificada
                    const inv = await db.query('SELECT * FROM INVENTARIO WHERE bodega = ?', [req.body.idBodega]);
                    var inventario = Object.assign({}, inv[0]);
                    const entradaInvProducto = require('../../src/mapeoObjetos/producto/entradaInventarioProducto');
                    const invProducto = await db.query('INSERT INTO DETALLE_INVENTARIO set ?', [entradaInvProducto(req.body.sku, req.body.cantidad, inventario.codigo_inventario).data]);

                    if (invProducto.affectedRows > 0) {
                        res.status(200).send({ mensaje: 'Producto Agregado con exito.' });
                    } else {
                        res.status(400).send({ mensaje: 'Producto Agregado con exito pero no se pudo agregar al inventario' });
                    }
                } else {
                    res.status(400).send({ mensaje: 'Producto Agregado con exito pero no se pudo asociar a una categoria.' });
                }
            } else {
                res.status(400).send({ mensaje: 'Datos incorrectos.' });
            }
        } catch (error) {
            console.log(error);
            if (error.code == 'ER_DUP_ENTRY') {
                res.status(400).send({ mensaje: 'SKU ya se encuentra en uso.' });
            } else {
                res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
            }
        }
    });
};