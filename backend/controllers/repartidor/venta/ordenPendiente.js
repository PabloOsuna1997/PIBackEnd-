const db = require('../../../src/dataBase/conexion');

module.exports = function (router) {
    router.get('/:correo', async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM VENTA WHERE repartidor = ? AND estado_repartidor = 0', [req.params.correo]);
            if (result.length > 0) {
                res.status(200).send({ ventas: result });
            } else {
                res.status(200).send({ mensaje: 'El repartidor indicado no tiene entregas pendientes.' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ mensaje: 'No se puede completar la solicitud.' });

        }
    });
};