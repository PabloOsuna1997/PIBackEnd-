const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.get('/', async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM USUARIO u INNER JOIN ROL_USUARIO ro ON u.correo = ro.correo INNER JOIN ROL r ON ro.rol = r.rol WHERE r.nombre = \'Repartidor\';');
            
            if (result.length > 0) {
                res.status(200).send({ repartidores: result });
            } else {
                res.status(200).send({ mensaje: 'Actualmente no existen Usuarios.' });
            }
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};