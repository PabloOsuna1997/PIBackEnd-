const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.get('/', async (req, res) => {
        const result = await db.query('SELECT * FROM SEDE;');
        if (result.length > 0) {
            res.status(200).send({ sedes: result });
        } else {
            res.status(500).send({ mensaje: 'En este momento no se pueden consultar las sedes, intente mas tarde.' });
        }
    });
};