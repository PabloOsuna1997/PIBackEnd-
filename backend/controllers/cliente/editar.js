const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.put('/:id', async (req, res) => {

        try {
            const entradaEditarCliente = require('../../src/mapeoObjetos/cliente/entradaEditar');
            
            const result = await db.query('UPDATE CLIENTE set ? WHERE nit = ?', [entradaEditarCliente(req.body).data, req.params.id]);

            console.log(result);
            if (result.affectedRows > 0) {
                res.status(200).send({ mensaje: 'Cliente actualizado.' });
            } else {
                res.status(400).send({ mensaje: 'Datos incorrectos o el cliente no existe.' });
            }
        } catch (error) {
            res.mensaje = error;
            console.log(error);
            res.status(500).send({mensaje: 'No se pudo completar la solicitud.'});
        }
    });
};