const db = require('../../src/dataBase/conexion');
module.exports = function (router) {

    router.post('/', async(req, res) => {
       try{
           const entradaAutenticar = require('../../src/mapeoObjetos/usuario/entradaAutenticar');

            const data = entradaAutenticar(req.body).data;
            const result = await db.query('SELECT * FROM USUARIO WHERE noCuenta = ? AND contrasena = ?;',[data.noCuenta,data.contrasena]);
           
            if(result.length > 0){
                res.status(200).send({ mensaje: 'Bienvenido' });
            }else{
                res.status(400).send({ mensaje: 'Credenciales no validas' });
            }

        
        }catch(error){
            res.message = error;
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};