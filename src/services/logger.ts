/**
 * Structured logger service with severity levels
 * Supports console output and pluggable transports for external services
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

type LogTransport = (entry: LogEntry) => void;

class Logger {
  private transports: LogTransport[] = [];
  private minLevel: LogLevel = LogLevel.INFO;

  constructor() {
    // Add console transport by default
    this.addTransport(this.consoleTransport);
    
    // Set log level based on environment
    if (import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true') {
      this.minLevel = LogLevel.DEBUG;
    }
  }

  /**
   * Add a custom transport (e.g., for Sentry, Application Insights)
   */
  addTransport(transport: LogTransport): void {
    this.transports.push(transport);
  }

  /**
   * Set minimum log level
   */
  setMinLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  /**
   * Check if level should be logged
   */
  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    return levels.indexOf(level) >= levels.indexOf(this.minLevel);
  }

  /**
   * Core log method
   */
  private log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };

    this.transports.forEach((transport) => {
      try {
        transport(entry);
      } catch (error) {
        console.error('Logger transport error:', error);
      }
    });
  }

  /**
   * Console transport
   */
  private consoleTransport(entry: LogEntry): void {
    const { level, message, timestamp, context } = entry;
    const prefix = `[${timestamp}] [${level}]`;

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(prefix, message, context || '');
        break;
      case LogLevel.INFO:
        console.info(prefix, message, context || '');
        break;
      case LogLevel.WARN:
        console.warn(prefix, message, context || '');
        break;
      case LogLevel.ERROR:
        console.error(prefix, message, context || '');
        break;
    }
  }

  /**
   * Public logging methods
   */
  debug(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, context);
  }

  error(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.ERROR, message, context);
  }
}

// Export singleton instance
export const logger = new Logger();

/**
 * Example: Adding Sentry transport
 * 
 * import * as Sentry from '@sentry/react';
 * 
 * logger.addTransport((entry) => {
 *   if (entry.level === LogLevel.ERROR) {
 *     Sentry.captureException(new Error(entry.message), {
 *       extra: entry.context,
 *     });
 *   }
 * });
 */

/**
 * Example: Adding Application Insights transport
 * 
 * import { ApplicationInsights } from '@microsoft/applicationinsights-web';
 * 
 * const appInsights = new ApplicationInsights({
 *   config: { connectionString: import.meta.env.VITE_APP_INSIGHTS_KEY }
 * });
 * 
 * logger.addTransport((entry) => {
 *   appInsights.trackTrace({
 *     message: entry.message,
 *     severityLevel: mapLogLevelToSeverity(entry.level),
 *     properties: entry.context,
 *   });
 * });
 */
