const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.get('/:correo', async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM USUARIO WHERE correo = ?;',[req.params.correo]);
            for (let index = 0; index < result.length; index++) {
                var user = Object.assign({}, result[index]);
                const roles = await db.query(`SELECT r.rol, ro.nombre 
                FROM ROL_USUARIO r INNER JOIN ROL ro 
                ON r.rol = ro.rol WHERE correo = ?`, [user.correo]);
                result[index] = {
                    ...user,
                    roles
                }
            }
            if (result.length > 0) {
                res.status(200).send({ usuarios: result });
            } else {
                res.status(200).send({ mensaje: 'Actualmente no existen Usuarios.' });
            }
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};