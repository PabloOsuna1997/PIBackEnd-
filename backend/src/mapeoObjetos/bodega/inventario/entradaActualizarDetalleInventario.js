module.exports = (body,cantidadAntigua,inventario) => {
    return {
        data: {
            //solo le pido la cantidad nueva porque la antigua sera la que esta registrada como nueva anteriormente
            producto: body.skuProducto,
            cantidad_antigua: cantidadAntigua,
            cantidad_nueva: body.cantidadNueva,
            inventario: inventario 
        }
    }
};