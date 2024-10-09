const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);   

    // Set default status code to 500 if not already set
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorMiddleware;
