const errorHandler = (res, error= {}, status = 400, message = 'Some Error Occured', ) => {
    return res.status(status).json({error,message});
}

const successResponse = (res, data = [], message = "Success") => {
    return res.json({data, message});
}

module.exports = {
    errorHandler,
    successResponse
}