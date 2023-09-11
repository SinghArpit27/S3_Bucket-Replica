

const httpResponse = (res, statusCode, responseStatus, responseMessage, data) => {
    
    if(data !== 'undefined'){
        res.status(statusCode).json({
            success: responseStatus,
            message: responseMessage,
            Data: data
        })
    }else{
        res.status(statusCode).json({
            success: responseStatus,
            message: responseMessage,
        })
    }
}


export default httpResponse;