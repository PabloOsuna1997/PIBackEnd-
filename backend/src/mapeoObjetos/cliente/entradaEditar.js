module.exports = (body) => {
    return {
        data: {
            nombre: body.nombre,
            dpi: body.dpi,
            direccion: body.direccion
        }
    }
};