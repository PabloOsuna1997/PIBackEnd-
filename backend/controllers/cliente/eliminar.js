const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.delete('/:id', async (req, res) => {
        try {
            const result = await db.query('DELETE FROM CLIENTE WHERE nit = ?', [req.params.id]);
            if (result.affectedRows > 0) {
                res.status(200).send({ mensaje: 'Cliente eliminado.' });
            } else {
                res.status(400).send({ mensaje: 'Cliente no existe.' });
            }
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud.' });
        }
    });
};