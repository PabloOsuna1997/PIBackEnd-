const db = require('../../src/dataBase/conexion');
module.exports = function (router) {

    router.post('/', async (req, res) => {
        try {
            const entradaRegistro = require('../../src/mapeoObjetos/usuario/entradaRegistro');

            //insercion a la base de datos
            console.log(entradaRegistro(req.body).data);
            const result = await db.query('INSERT INTO USUARIO set ?', [entradaRegistro(req.body).data]);

            console.log(result);
            if (result.affectedRows == 1) {
                //insertar rol_usuario
                const entradaRolUSuario = require('../../src/mapeoObjetos/usuario/entradaRolUsuario');
                const data = await db.query('INSERT INTO ROL_USUARIO set ?', [entradaRolUSuario(req.body).data]);
                if (data.affectedRows > 0) {
                    res.status(200).send({ mensaje: "Usuario Registrado." });
                } else {
                    res.status(400).send({ mensaje: "Usuario Registrado pero no se le asigno un rol." });
                }
            }
        } catch (error) {
            res.message = error;
            if (error.code == 'ER_DUP_ENTRY') {
                res.status(400).send({ mensaje: 'El correo ya se encuentran en uso.' });
            } else {
                res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
            }
        }
    });
};