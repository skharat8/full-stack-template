import pino, { type DestinationStream } from "pino";

const transport = pino.transport({
  targets: [
    {
      target: "pino/file",
      options: { destination: "logs/server.log" },
    },
    {
      target: "pino-pretty",
    },
  ],
}) as DestinationStream;

const logger = pino(
  {
    base: {
      pid: false,
    },
    level: process.env.PINO_LOG_LEVEL ?? "info",
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport
);

export default logger;
