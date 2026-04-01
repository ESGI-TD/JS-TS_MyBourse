//Pas d'accès à l'API
export class FetchUrlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Impossible d'accéder à l'API";
  }
}

//Variable false
export class NoData extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Nous n'avons pas pu récupérer les données";
  }
}
