const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.put('/:id', async (req, res) => {

        try {
            const entradaEditarSede = require('../../src/mapeoObjetos/bodega/entradaEditar');
            
            const result = await db.query('UPDATE BODEGA set ? WHERE codigo_bodega = ?', [entradaEditarSede(req.body).data, req.params.id]);

            console.log(result);
            if (result.affectedRows > 0) {
                res.status(200).send({ mensaje: 'Bodega actualizada.' });
            } else {
                res.status(400).send({ mensaje: 'Datos incorrectos o la bodega no existe.' });
            }
        } catch (error) {
            res.mensaje = error;
            console.log(error);
            res.status(500).send({mensaje: 'No se pudo completar la solicitud.'});
        }
    });
};