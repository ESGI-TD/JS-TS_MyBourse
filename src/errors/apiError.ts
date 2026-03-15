export class FetchUrlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Impossible d'accéder à l'API";
  }
}
