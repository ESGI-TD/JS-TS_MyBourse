//Erreur lors de la récupération d'un id, class etc (document.getElementBy...)
export class ElementNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Element introuvable";
  }
}
