const db = require('../../src/dataBase/conexion');

module.exports = function (router) {

    router.get('/', async (req, res) => {

        try {
            const result = await db.query('SELECT * FROM LOG_ACTUALIZACION;');

            for (let index = 0; index < result.length; index++) { 
                var log = Object.assign({}, result[index]);
                const nombre = await db.query('SELECT nombre FROM PRODUCTO WHERE sku = ?',[log.skuProducto]);
                const nameP = Object.assign({}, nombre[0]);
                result[index].nombre = nameP.nombre;              
            } 
            if (result.length > 0) {
                res.status(200).send({ clientes: result });
            } else {
                res.status(200).send({ mensaje: 'Actualmente no existen actualizaciones en los inventarios.' });
            }
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
}