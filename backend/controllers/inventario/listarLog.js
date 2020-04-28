const db = require('../../src/dataBase/conexion');

module.exports = function (router) {

    router.get('/', async (req, res) => {

        try {
            const result = await db.query('SELECT * FROM LOG_ACTUALIZACION;');

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