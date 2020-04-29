const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.post('/', async (req, res) => {

        try {
            const entradaAutenticar = require('../../src/mapeoObjetos/usuario/entradaRegistro');

            const result = await db.query('UPDATE USUARIO set ? WHERE correo = ?', [entradaAutenticar(req.body).data, req.body.correo]);

            if (result.affectedRows > 0) {
                res.status(200).send({ mensaje: 'Usuario actualizado.' });
            } else {
                res.status(400).send({ mensaje: 'Datos incorrectos o el usuario no existe.' });
            }
        } catch (error) {
            res.mensaje = error;
            res.status(500).send({mensaje: 'No se pudo completar la solicitud.'});
        }
    });
};