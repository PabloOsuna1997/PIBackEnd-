module.exports = (element,idVenta) => {
    return{
        data: {
            descuento: element.descuento,
            producto: element.skuProducto,            
            venta: idVenta,
            codigo_inventario: element.idInventario,
            bodega: element.idBodega,
            sede: element.idSede
        }
    }
};