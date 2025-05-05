import pino from "pino";

// Configure Pino logger
const logger = pino.pino({
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
export default logger;
