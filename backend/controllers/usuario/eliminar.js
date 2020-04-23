const db = require('../../src/dataBase/conexion');
module.exports = function(router){

    router.delete('/:dpi', async( req , res ) => {

        try{
            console.log(req.params);
            const result = await db.query('DELETE FROM USUARIO WHERE dpi = ?',[req.params.dpi]);

            if(result.affectedRows > 0){
                res.status(200).send({mensaje: 'Usuario eliminado.'});
            }else{
                res.status(400).send({mensaje: 'Usuario no existe.'});
            }
        }catch(error){
            res.mensaje = error;
            res.status(500).send({mensaje: 'No se pudo completar la operacion.'});
        }

    });
};