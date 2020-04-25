module.exports = (producto, cantidad, inventario) => {
    return {
        data: {
            producto: producto,
            cantidad_antigua: 0,
            cantidad_nueva: cantidad,
            inventario: inventario
        }
    }
}