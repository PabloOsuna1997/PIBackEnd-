const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.get('/', async (req, res) => {
        try {   
            const result = await db.query('SELECT * FROM SEDE;');
            for (let index = 0; index < result.length; index++) { 
                var sede = Object.assign({}, result[index]);
                const bodegas = await db.query('SELECT * FROM BODEGA WHERE sede = ?',[sede.codigo_sede]);
                result[index] = {
                    ...sede,
                    bodegas
                }               
            } 
            if (result.length > 0) {
                res.status(200).send({ sedes: result });
            } else {
                res.status(200).send({ mensaje: 'Actualmente no existen sedes.' });
            }
        } catch (error) {
            res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
        }
    });
};