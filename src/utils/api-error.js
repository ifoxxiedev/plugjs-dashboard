export default class ApiError extends Error {

  constructor(message, statusCode = 400) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.endsWith('4') ? 'fail': 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

}