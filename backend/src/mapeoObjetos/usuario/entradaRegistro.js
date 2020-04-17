module.exports = (body) => {
    return {
        data: {
            dpi: body.dpi,
            nombre: body.nombre,
            apellido: body.apellido,
            noCuenta: body.noCuenta,
            saldoInicial: body.saldoInicial,
            correoElectronico: body.correoElectronico,
            contrasena: body.contrasena
        }
    };
};