module.exports = (body,bodega) => {
    return {
        data: {
            motivo: body.motivo,
            fecha: new Date,
            bodega: bodega,
            usuario: body.correoUsuario
        }
    }
};