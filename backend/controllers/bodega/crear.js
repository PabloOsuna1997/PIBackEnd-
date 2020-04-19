const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.post('/', async (req, res) => {
        try {
            const entradaCrearBodega = require('../../src/mapeoObjetos/bodega/entradaCrear');
            const result = await db.query('INSERT INTO BODEGA set ?', [entradaCrearBodega(req.body).data]);
            if (result.affectedRows > 0) {
                res.status(200).send({ mensaje: 'Bodega Registrada.' });
            } else {
                res.status(400).send({ mensaje: 'Datos incorrectos.' });
            }
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud.' });
        }
    });
};