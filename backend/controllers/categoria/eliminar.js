const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.delete('/:id', async (req, res) => {
        try {
            const result = await db.query('DELETE FROM CATEGORIA  WHERE categoria = ?' , [req.params.id]);
            if(result.affectedRows > 0){
                res.status(200).send({mensaje: 'Categoria eliminada.'});
            }else{
                res.status(200).send({mensaje: 'categoria no existe.'});
            }
        }catch(error){
            res.status(500).send({mensaje: 'No se pudo completar la solicitud.'});
        }
    });
};