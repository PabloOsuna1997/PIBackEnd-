const db = require('../../src/dataBase/conexion');
module.exports = function(router){

    router.delete('/:id', async( req , res ) => {

        try{
            console.log(req.params);
            const result = await db.query('DELETE FROM SEDE WHERE codigo_sede = ?',[req.params.id]);

            if(result.affectedRows > 0){
                res.status(200).send({mensaje: 'Sede eliminada.'});
            }else{
                res.status(400).send({mensaje: 'Sede no existe.'});
            }
        }catch(error){
            res.mensaje = error;
            res.status(500).send({mensaje: 'No se pudo completar la operacion.'});
        }

    });
};