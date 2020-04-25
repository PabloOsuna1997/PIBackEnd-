const db = require('../../../src/dataBase/conexion');

module.exports = function (router) {
    router.get('/:correo', async (req, res) => {
        try {
            //verifico que la solicitud primero este en estado aceptada
            const result = await db.query('SELECT * FROM TRANSFERENCIA WHERE repartidor = ? AND estado_transferencia = 1 AND tipo_transferencia = \'E\'', [req.params.correo]);
            if (result.length > 0) {
                res.status(200).send({ transferencias: result });
            } else {
                res.status(200).send({ mensaje: 'El repartidor indicado no tiene entregas pendientes.' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ mensaje: 'No se puede completar la solicitud.' });

        }
    });
};