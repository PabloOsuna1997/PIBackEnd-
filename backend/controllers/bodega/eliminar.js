const db = require('../../src/dataBase/conexion');
module.exports = function (router) {

    router.delete('/:id', async (req, res) => {

        try {
            const result = await db.query('UPDATE BODEGA SET estado = 0 WHERE codigo_bodega = ?', [req.params.id]);

            if (result.affectedRows > 0) {
                res.status(200).send({ mensaje: 'Bodega se ha cambiado a inactiva.' });
            } else {
                res.status(400).send({ mensaje: 'Bodega no existe.' });
            }
        } catch (error) {
            res.mensaje = error;
            res.status(500).send({ mensaje: 'No se pudo completar la operacion.' });
        }

    });
};