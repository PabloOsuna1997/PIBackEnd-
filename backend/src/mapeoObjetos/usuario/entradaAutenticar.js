module.exports = (body) => {
    return {
        data: {
            noCuenta: body.noCuenta,
            contrasena: body.contrasena
        }
    };
};