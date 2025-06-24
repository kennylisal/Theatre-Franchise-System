import { pino } from "pino";

const logger = pino({
  level: "info",
  timestamp: pino.stdTimeFunctions.isoTime,
  ...(process.env.NODE_ENV !== "production" && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:yyyy-mm-dd HH:mm:ss",
        ignore: "pid,hostname",
      },
    },
  }),
});

const loggerv2 = pino;
enum HttpCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

interface ErrorDetails {
  message: string;
  [key: string]: any; // Allow additional fields (e.g., Joi's context, path)
}
class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpCode;
  public readonly isOperational: boolean;
  public readonly details?: ErrorDetails[];

  constructor(
    name: string,
    httpCode: HttpCode,
    description: string | ErrorDetails[],
    isOperational: boolean
  ) {
    const message = Array.isArray(description)
      ? description.map((d) => d.message).join("; ")
      : description;
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
  public handleError(): void {
    logger.error({
      code: this.httpCode,
      name: this.name,
      stack: this.stack,
      description: this.message,
      details: this.details,
      isOperational: this.isOperational,
    });
  }

  public toResponse(): {
    code: HttpCode;
    message: string;
    details?: ErrorDetails[];
  } {
    return {
      code: this.httpCode,
      message: this.message,
      details: this.details, // Include details if present
    };
  }
}

export { AppError, HttpCode, logger };
