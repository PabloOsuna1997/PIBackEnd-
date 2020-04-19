module.exports = (body) => {
    return {
        data: {
            nit: body.nit,
            nombre: body.nombre,
            dpi: body.dpi,
            direccion: body.direccion
        }
    }
};