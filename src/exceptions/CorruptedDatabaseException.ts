export default class CorruptedDatabaseException extends Error {
  constructor(message: string = '') {
    super('Currupted database' + (message ? `: ${message}` : '.'));
    this.name = 'CorruptedDatabaseException';
    Error.captureStackTrace(this, CorruptedDatabaseException);
  }
}
