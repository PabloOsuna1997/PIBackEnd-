module.exports = (body) => {
    var fecha_nac = new Date(body.fecha_nacimiento);
    return {
        data: {
            correo: body.correo,
            dpi: body.dpi,
            nombre: body.nombre,
            fecha_nacimiento: fecha_nac,
            password: body.password
        }
    };
};