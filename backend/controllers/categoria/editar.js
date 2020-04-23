const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.put('/:id', async (req, res) => {
        try {
            const result = await db.query('UPDATE CATEGORIA set ? WHERE categoria = ?' , [req.body.nombre, req.params.id]);
            if(result.affectedRows > 0){
                res.status(200).send({mensaje: 'Categoria Editada.'});
            }else{
                res.status(200).send({mensaje: 'categoria no existe.'});
            }
        }catch(error){
            res.status(500).send({mensaje: 'No se pudo completar la solicitud.'});
        }
    });
};