const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.post('/', async (req, res) => {
        try {
            const entradaCrearBodega = require('../../src/mapeoObjetos/bodega/entradaCrear');
            const result = await db.query('INSERT INTO BODEGA set ?', [entradaCrearBodega(req.body).data]);
            if (result.affectedRows > 0) {
                //insertar un inventario
                const entradaCrearinventario = require('../../src/mapeoObjetos/bodega/inventario/entradaCrear');
                const inventario = await db.query(' INSERT INTO INVENTARIO set ?', [entradaCrearinventario(result.insertId, req.body.correoEncargado).data]);
                res.status(200).send({ mensaje: 'Bodega Registrada.' });
            } else {
                res.status(400).send({ mensaje: 'Datos incorrectos.' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud.' });
        }
    });
};