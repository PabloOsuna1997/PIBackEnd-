const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.get('/', async (req, res) => {
        const result = await db.query('SELECT * FROM ROL;');
        console.log(result);
        if (result.length > 0) {
            res.status(200).send({ roles: result });
        } else if (result.length == 0) {
            res.status(200).send({ mensaje: 'No existen roles en este momento' });
        } else {
            res.status(500).send({ mensaje: 'En este momento no se pueden consultar los roles existentes.' });
        }
    });
};