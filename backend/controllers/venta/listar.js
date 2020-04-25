const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.get('/', async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM VENTA;');

            if (result.length > 0) {
                res.status(200).send({ ventas: result });
            } else {
                res.status(200).send({ mensaje: 'Actualmente no existen ventas.' });
            }
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};