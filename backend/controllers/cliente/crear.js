const db = require('../../src/dataBase/conexion');

module.exports = function (router) {
    router.post('/', async (req, res) => {

        try {
            const entradaCliente = require('../../src/mapeoObjetos/cliente/entradaCrear');
            const result = await db.query('INSERT INTO CLIENTE set ?', [entradaCliente(req.body).data]);

            if (result.affectedRows > 0) {
                //insercion a sede_cliente.
                const entradaClienteSede = require('../../src/mapeoObjetos/cliente/entradaSedeCliente');
                const ress = await db.query('INSERT INTO SEDE_CLIENTE set ?', [entradaClienteSede(req.body).data]);

                if (ress.affectedRows > 0) {
                    res.status(200).send({ mensaje: 'Cliente registrado.' });
                } else {
                    res.status(400).send({ mensaje: 'Cliente registrado pero no se pudo relacionar con la sede.' });
                }

            } else {
                res.status(400).send({ mensaje: 'Datos incorrectos.' });
            }
        } catch (error) {
            if (error.code == 'ER_DUP_ENTRY') {

                const data = await db.query('SELECT sede FROM SEDE_CLIENTE WHERE nit = ?', [req.body.nit]);
                var existe = false;

                for (const element of data) { //recorremos todas las sedes en las que se encuentra el cliente

                    var sede = Object.assign({}, element);
                    console.log(sede);
                    if (sede.sede == req.body.idSede) { //verifico que no sea la misma sede a la que quiere registrarse
                        existe = true;
                        break;
                    }
                }
                if (existe) { //si no existe ese usuario
                    res.status(400).send({ mensaje: 'El usuario ya se encuentra registrado en esta sede.' });
                } else {
                    const entradaClienteSede = require('../../src/mapeoObjetos/cliente/entradaSedeCliente');
                    const ress = await db.query('INSERT INTO SEDE_CLIENTE set ?', [entradaClienteSede(req.body).data]);

                    if (ress.affectedRows > 0) {
                        res.status(200).send({ mensaje: 'Cliente registrado.' });
                    } else {
                        res.status(400).send({ mensaje: 'Cliente registrado pero no se pudo relacionar con la sede.' });
                    }
                }
            } else {
                res.status(500).send({ mensaje: 'No se pudo completar la solicitud' });
            }
        }
    });
};