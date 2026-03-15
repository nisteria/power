// Logger - Structured Logging
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

class Logger {
  private context: LogContext;

  constructor(context: LogContext = {}) {
    this.context = context;
  }

  private format(level: LogLevel, message: string, meta?: LogContext): string {
    const timestamp = new Date().toISOString();
    const log = {
      timestamp,
      level,
      message,
      ...this.context,
      ...meta,
    };
    return JSON.stringify(log);
  }

  debug(message: string, meta?: LogContext): void {
    if (process.env.LOG_LEVEL === 'debug') {
      console.log(this.format('debug', message, meta));
    }
  }

  info(message: string, meta?: LogContext): void {
    console.log(this.format('info', message, meta));
  }

  warn(message: string, meta?: LogContext): void {
    console.warn(this.format('warn', message, meta));
  }

  error(message: string, meta?: LogContext): void {
    console.error(this.format('error', message, meta));
  }

  child(additionalContext: LogContext): Logger {
    return new Logger({ ...this.context, ...additionalContext });
  }
}

export const logger = new Logger({ service: 'power-api' });

export function createLogger(service: string) {
  return new Logger({ service });
}

export default logger;
