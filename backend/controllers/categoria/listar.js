const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.get('/', async (req, res) => {
        const result = await db.query('SELECT * FROM CATEGORIA;');
        if (result.length > 0) {
            res.status(200).send({ categorias: result });
        } else if (result.length == 0) {
            res.status(200).send({ mensaje: 'Actualmente no existen categorias.' });
        } else {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud.' });
        }
    });
};