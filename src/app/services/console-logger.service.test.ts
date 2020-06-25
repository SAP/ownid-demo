import { ConsoleLogger } from "./console-logger.service";

describe("ConsoleLogger", () => {
  it("log debug", () => {
    const logger = new ConsoleLogger();
    // eslint-disable-next-line no-console
    console.debug = jest.fn();

    logger.logDebug("debug");

    // eslint-disable-next-line no-console
    expect(console.debug).toBeCalledWith("debug");
  });

  it("log info", () => {
    const logger = new ConsoleLogger();
    // eslint-disable-next-line no-console
    console.info = jest.fn();

    logger.logInfo("info");

    // eslint-disable-next-line no-console
    expect(console.info).toBeCalledWith("info");
  });

  it("log error", () => {
    const logger = new ConsoleLogger();
    // eslint-disable-next-line no-console
    console.error = jest.fn();

    logger.logError("error");

    // eslint-disable-next-line no-console
    expect(console.error).toBeCalledWith("error");
  });
});
