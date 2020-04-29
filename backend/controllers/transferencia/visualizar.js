const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.get('/', async (req, res) => {
        try {
            //en estado de solicitud
            const result = await db.query('SELECT * FROM TRANSFERENCIA WHERE estado_transferencia = 0;');
            
            for (let index = 0; index < result.length; index++) { 
                var trans = Object.assign({}, result[index]);
                const nombre = await db.query('SELECT nombre FROM PRODUCTO WHERE sku = ?',[trans.producto]);
                const nameP = Object.assign({}, nombre[0]);
                result[index].nombre = nameP.nombre;              
            } 
            if (result.length > 0) {
                res.status(200).send({ transferencias: result });
            } else {
                res.status(200).send({ mensaje: 'En este momento existen transferencias pendientes' });
            }
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud.' });
        }
    });
};