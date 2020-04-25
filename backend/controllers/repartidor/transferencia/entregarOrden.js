const db = require('../../../src/dataBase/conexion');

module.exports = function (router) {
    router.put('/:correo/:transferencia', async (req, res) => {
        try {
            //estado de la transferencia es entregada
            const result = await db.query('UPDATE TRANSFERENCIA set estado_transferencia = 2 WHERE repartidor = ? AND estado_transferencia = 1 AND codigo_transferencia = ?', [req.params.correo,req.params.transferencia]);
            if (result.affectedRows > 0) {
                //actualizar el inventario
                res.status(200).send({ mensaje: 'Transferencia entragada.' });
            } else {
                res.status(400).send({ mensaje: 'La transferencia aun no se ha aceptado o el correo indicado no existe' });
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud.' });
        }
    });
};