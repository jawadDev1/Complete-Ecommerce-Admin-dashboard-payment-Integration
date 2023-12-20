const errorHandler = require('../utils/errorHandler');

module.exports = theFunc => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next))
    .catch((error)=>{
        next(new errorHandler(error.message, 400))
    })
}