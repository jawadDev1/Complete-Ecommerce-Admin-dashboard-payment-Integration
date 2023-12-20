class ErrorHandler extends Error{
    constructor(msg, statusCode){
        super(msg);
        
        this.statusCode = statusCode
        this.msg = msg;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;