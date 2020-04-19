module.exports = (body) =>{
    return {
        data: {
            alias: body.alias,
            direccion: body.direccion,
            departamento: body.departamento,
            municipio: body.municipio,
            encargado: body.correoEncargado
        }
    }   
};