export class ConsoleLogger {
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
