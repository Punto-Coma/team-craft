import pino, { transport } from 'pino';

export const logger = pino(
  {
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport({
    targets: [
      {
        target: 'pino/file',
        options: { destination: `${__dirname}/../../../logs/logs.log`, mkdir: true },
      },
      {
        target: 'pino-pretty',
      },
    ],
  })
);
