const db = require('../../../src/dataBase/conexion');

module.exports = function (router) {
    router.get('/:correo', async (req, res) => {
        try {
            //verifico que la solicitud primero este en estado aceptada
            const result = await db.query('SELECT * FROM TRANSFERENCIA WHERE repartidor = ? AND estado_transferencia = 1 AND tipo_transferencia = \'E\'', [req.params.correo]);

            for (let index = 0; index < result.length; index++) {
                var trans = Object.assign({}, result[index]);
                const nombreOrigen = await db.query('SELECT alias FROM SEDE WHERE codigo_sede = ?', [trans.sede_origen]);
                const nombreOrigen_ = Object.assign({}, nombreOrigen[0]);
                const nombreDestino = await db.query('SELECT alias FROM SEDE WHERE codigo_sede = ?', [trans.sede_destino]);
                const nombreDestino_ = Object.assign({}, nombreDestino[0]);
                const bodegaOrigen = await db.query('SELECT nombre FROM BODEGA WHERE codigo_bodega = ?', [trans.bodega_origen]);
                const bodegaOrigen_ = Object.assign({}, bodegaOrigen[0]);
                const bodegaDestino = await db.query('SELECT nombre FROM BODEGA WHERE codigo_bodega = ?', [trans.bodega_destino]);
                const bodegaDestino_ = Object.assign({}, bodegaDestino[0]);
                
                const nombreSedeOrigen = nombreOrigen_.alias;
                const nombreSedeDestino = nombreDestino_.alias;
                const nombreBodegaOrigen = bodegaOrigen_.nombre;
                const nombreBodegaDestino = bodegaDestino_.nombre;
                result[index] = {
                    ...trans,
                    nombreSedeOrigen,
                    nombreSedeDestino,
                    nombreBodegaOrigen,
                    nombreBodegaDestino
                }
            }

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