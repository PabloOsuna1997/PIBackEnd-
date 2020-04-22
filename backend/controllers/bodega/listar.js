const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.get('/', async (req, res) => {
        const result = await db.query('SELECT * FROM BODEGA;');
        if (result.length > 0) {
            res.status(200).send({ bodegas: result });
        } else if (result.length == 0) {
            res.status(200).send({ mensaje: 'Actualmente no existen bodegas.' });
        } else {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud.' });
        }
    });
};