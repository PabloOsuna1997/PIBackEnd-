module.exports = (body,bodega,inventario,cantidadAntigua) => {
    return {
        data: {            
            usuario: body.correoUsuario,
            motivo: body.motivo,
            fecha: new Date,
            bodega: bodega,
            inventario: inventario,
            skuProducto: body.skuProducto,
            cantidadAntigua: cantidadAntigua,
            cantidadNueva: body.cantidadNueva
        }
    }
};
