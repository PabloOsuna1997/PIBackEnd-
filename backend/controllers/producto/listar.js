const db = require('../../src/dataBase/conexion');

module.exports = function (router) {

    router.get('/', async (req, res) => {

        try {
            const result = await db.query('SELECT * FROM PRODUCTO;');

            for (let index = 0; index < result.length; index++) {
                var product = Object.assign({}, result[index]);
                const datos = await db.query(`SELECT DISTINCT b.sede, b.codigo_bodega, di.inventario 
                FROM DETALLE_INVENTARIO di INNER JOIN INVENTARIO i 
                ON di.inventario = i.codigo_inventario 
                INNER JOIN BODEGA b 
                ON b.codigo_bodega = i.bodega WHERE producto = ?`, [product.sku]);
                result[index] = {
                    ...product,
                    datos

                }
            }
            if (result.length > 0) {
                res.status(200).send({ productos: result });
            } else {
                res.status(200).send({ mensaje: 'Actualmente no existen productos.' });
            }
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
}