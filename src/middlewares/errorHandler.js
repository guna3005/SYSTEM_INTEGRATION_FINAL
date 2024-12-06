
module.exports = function errorHandler(err, req, res, next) {
    console.error('[Error Handler]', err); 
  
    const statusCode = err.statusCode || 500;
  
    const errorResponse = {
      error: {
        message: err.message || 'An unexpected error occurred.',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      },
    };
  
    res.status(statusCode).json(errorResponse);
  };
  