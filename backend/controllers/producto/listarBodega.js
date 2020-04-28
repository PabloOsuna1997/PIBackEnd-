const db = require('../../src/dataBase/conexion');

module.exports = function (router) {

    router.get('/:idBodega', async (req, res) => {

        try {
            const result = await db.query(`SELECT  p.sku, p.codigo_barras, p.nombre, p.descripcion, precio, di.cantidad_nueva as cantidadDisponible
                FROM PRODUCTO p INNER JOIN DETALLE_INVENTARIO di
                ON p.sku = di.producto
                INNER JOIN INVENTARIO i
                ON i.codigo_inventario = di.inventario
                INNER JOIN BODEGA b
                ON b.codigo_bodega = i.bodega
                WHERE b.codigo_bodega = ?;`, [req.params.idBodega]);
            if (result.length > 0) {
                res.status(200).send({ productos: result });
            } else {
                res.status(200).send({ mensaje: 'Actualmente no existen productos en esta bodega.' });
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
}