const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.put('/:id', async (req, res) => {
        try {
            const entradaAceptarTransferencia = require('../../src/mapeoObjetos/transferencia/entradaAceptarTransferencia');
            const transferencia = await db.query('SELECT * FROM TRANSFERENCIA WHERE codigo_transferencia = ?',[req.params.id]);
            var trans = Object.assign({}, transferencia[0]);
            //vericar si es aceptacion interna o externa
            const result = await db.query('UPDATE TRANSFERENCIA set ? WHERE codigo_transferencia = ?',[entradaAceptarTransferencia(req.body,trans).data, req.params.id]);
            if(result.affectedRows > 0){
                res.status(200).send({mensaje: 'Transferencia aceptada'});
            }else{
                res.status(400).send({mensaje: 'No se pudo aceptar la tranferencia'});
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({mensaje: 'No se pudo completar la solicitud.'});
        }
    });
};