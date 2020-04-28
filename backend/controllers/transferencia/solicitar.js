const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.post('/', async (req, res) => {
        try {
            const entradaSolicitar = require('../../src/mapeoObjetos/transferencia/entradaSolicitar');
            //verificar si es interna que las bodegas pertenezcan a la misma sede
            const result = await db.query('INSERT INTO TRANSFERENCIA set ?', [entradaSolicitar(req.body).data]);
            if (result.affectedRows > 0) {
                res.status(200).send({ mensaje: 'Transferencia solicitada.' });
            } else {
                res.status(400).send({ mensaje: 'La transferencia no se pudo solicitar.' });
            }
        } catch (error) {
            console.log(error);
            if (error.code == 'ER_BAD_NULL_ERROR') {
                res.status(400).send({ mensaje: 'Alguno de los atributos no puede ser nulo.' });
            } else {
                res.status(500).send({ mensaje: 'No se pudo completar la solicitud.' });
            }
        }
    });
};