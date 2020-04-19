module.exports = (body) => {
    return {
        data: {
            sede: body.idSede,
            nit: body.nit
        }
    }
}