module.exports = (body) =>{
    return {
        data: {
            nombre: body.nombre,
            direccion: body.direccion,
            estado: 1,  //al momento de crear siempre estara activa
            encargado: body.correoEncargado,
            sede: body.idSede
        }
    }
};