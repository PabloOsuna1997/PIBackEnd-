module.exports = (element,idVenta) => {
    return{
        data: {
            descuento: element.descuento,
            producto: element.skuProducto,
            venta: idVenta
        }
    }
};