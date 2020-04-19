module.exports = (body) => {
    return {
        data: {
            sku: body.sku,
            codigo_barras : body.codigo_barras,
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio
        }
    }
}