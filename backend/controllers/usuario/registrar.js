const db = require('../../src/dataBase/conexion');
module.exports = function (router) {

    router.post('/', async(req, res) => {
       try{
           const  entradaRegistro = require('../../src/mapeoObjetos/usuario/entradaRegistro');
        
            //insercion a la base de datos
            const result = await db.query('INSERT INTO USUARIO set ?',[entradaRegistro(req.body).data]);

            console.log(result);
            if(result.affectedRows == 1){
                res.status(200).send({ mensaje: "Usuario Registrado" });     
            }else{

            } 
        }catch(error){
            if(error.code == 'ER_DUP_ENTRY'){
                res.message = error;
                res.status(400).send({ mensaje: 'El dpi o el numero de cuenta ya se encuentran en uso.' }); 
            }else{
                res.message = error;
                res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
            }
        }
    });
};