const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.put('/:id', async (req, res) => {

        try {
            const entradaEditarSede = require('../../src/mapeoObjetos/sede/entradaEditar');
            const result = await db.query('UPDATE SEDE set ? WHERE codigo_sede = ?', [entradaEditarSede(req.body).data, req.params.id]);

            if (result.affectedRows > 0) {
                res.status(200).send({ mensaje: 'Sede actualizada.' });
            } else {
                res.status(400).send({ mensaje: 'Datos incorrectos o la sede no existe.' });
            }
        } catch (error) {
            res.mensaje = error;
            res.status(500).send({mensaje: 'No se pudo completar la solicitud.'});
        }
    });
};