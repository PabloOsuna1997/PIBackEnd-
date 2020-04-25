const db = require('../../../src/dataBase/conexion');

module.exports = function (router) {
    router.put('/:correo/:venta', async (req, res) => {
        try {
            const result = await db.query('UPDATE VENTA set estado_repartidor = 1 WHERE repartidor = ? AND codigo_venta = ?', [req.params.correo,req.params.venta]);
            if (result.affectedRows > 0) {
                //actualizar el inventario
                res.status(200).send({ mensaje: 'Venta entregada' });
            } else {
                res.status(400).send({ mensaje: 'El correo indicado no existe o la venta no existe' });
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud.' });
        }
    });
};