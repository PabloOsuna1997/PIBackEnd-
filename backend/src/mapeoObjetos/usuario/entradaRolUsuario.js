module.exports = (body) => {
    return {
        data: {
            rol: body.rol,
            correo: body.correo
        }
    }
}