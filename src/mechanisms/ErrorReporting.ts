class ErrorReporting {
  public captureError(e: unknown, message?: string): void {
    message && console.error(message);
    console.error(e);
  }

  public emitWarn(message: string): void;
  public emitWarn(message: string, error?: unknown): void;
  public emitWarn(message: string, messageOrError?: unknown): void {
    console.warn(messageOrError, message);
  }
}

export default new ErrorReporting();
