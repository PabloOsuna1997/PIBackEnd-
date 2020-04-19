const db = require('../../src/dataBase/conexion');

module.exports = function(router){
    router.post('/', async(req, res) => {
        try{
            const entradaCrearSede = require('../../src/mapeoObjetos/sede/entradaCrear');

            console.log(entradaCrearSede(req.body));
            const result = await db.query('INSERT INTO SEDE set ?',[entradaCrearSede(req.body).data]);

            if(result.affectedRows == 1){
                res.status(200).send({mensaje: 'Sede Registrada.'});
            }else{
                res.status(400).send({mensaje: 'No se pudo registrar la sede.'})
            }

        }catch(error){
            res.status(500).send({mensaje: 'No se pudo completar la solicitud.'});
        }   
    });
};