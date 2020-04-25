module.exports = (idBodega,usuario)=> {
    return {
        data: {
            motivo: "Creacion de bodega e inventario",
            fecha: new Date(),
            bodega: idBodega,
            usuario: usuario
        }
    }
}