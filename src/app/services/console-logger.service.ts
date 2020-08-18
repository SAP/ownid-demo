import { ILogger } from 'src/assets/ownid-web-ui-sdk/types/interfaces/i-logger.interfaces';

export class ConsoleLogger implements ILogger {
  logDebug(message: string): void {
    // eslint-disable-next-line no-console
    console.debug(message);
  }

  logInfo(message: string): void {
    // eslint-disable-next-line no-console
    console.info(message);
  }

  logError(message: string): void {
    // eslint-disable-next-line no-console
    console.error(message);
  }
}
