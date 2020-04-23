const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.post('/', async (req, res) => {
        try {
            const result = await db.query('INSERT INTO CATEGORIA set ? ', [req.body.nombre]);
            if(result.affectedRows > 0){
                res.status(200).send({mensaje: 'Categoria creada.'});
            }else{
                res.status(200).send({mensaje: 'No se pudo ingresar la categoria.'});
            }
        }catch(error){
            res.status(500).send({mensaje: 'No se pudo completar la solicitud.'});
        }
    });
};