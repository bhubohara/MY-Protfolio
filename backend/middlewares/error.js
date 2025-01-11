export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMidleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  if (err.code === 11000) {
    //this error while connection time out

    const message = `Duplicate ${Object.keys(err.keyValue)}Entered`;

    err = new ErrorHandler(message, 400);
  }

  if (err.name === "jsonWebTokenError") {
    const message = `Json Web Token Is Invalid Try Again !`;

    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token Is Expired Try Again !`;

    err = new ErrorHandler(message, 400);
  }

  if (err.name === "CastError") {
    const message = `Invalid${err.path}`;

    err = new ErrorHandler(message, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(", ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};
