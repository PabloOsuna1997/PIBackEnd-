module.exports = (body) => {
    return {
        data: {
            correo: body.correo,
            password: body.password
        }
    };
};