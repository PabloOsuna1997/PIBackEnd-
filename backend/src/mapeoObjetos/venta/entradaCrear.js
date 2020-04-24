module.exports = (body) => {
    return {
        data: {
            //repartidor y fecha de entrega si y solo si es adomicilio
            //venta local se descuenta de bodega automaticamente
            //si es a domicilio se descuenta al momento de entrega 
            vendedor: body.correoVendedor,
            cliente: body.nitCliente,
            fecha_factura: new Date(),
            fecha_entrega: body.fechaEntrega,
            subtotal: body.subtotal,
            repartidor: body.correoRepartidor,
            tipo_venta: body.tipoVenta,  //tipo: 0 venta local tipo: 1 vente a domicilio
            sobre_cargo: body.sobreCargo,
            total: body.total
        }
    }
};