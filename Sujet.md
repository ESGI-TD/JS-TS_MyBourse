# Projet de fin de module : MyBourse

## Objectifs pédagogiques
Ce projet a pour objectif de mobiliser les compétences suivantes :

- Manipulation du **DOM**
- Programmation **asynchrone** (`async/await`, `Promise`)
- **Gestion des erreurs**
- Utilisation complète de **TypeScript** (types, interfaces, organisation du code)
- Consommation d’une **API REST**

---

## Organisation
- Travail **en groupe** (2 à 3 étudiants)
- Rendu sous forme de :
    - Dépôt Git
    - Fichier `README.md` expliquant :
        - Installation
        - Lancement
        - Choix techniques

---

## Contexte du projet
Vous devez développer une application web permettant d’afficher sous forme de **graphique interactif** l’évolution du cours d’une ou plusieurs actions en bourse.

Les données seront fournies via une **API REST** mise à disposition par l’enseignant.

---

## Fonctionnalités attendues

### 🔎 1. Récupération des données
- Appel à l’API REST via `fetch` ou équivalent
- Utilisation de `async/await`
- Typage strict des données reçues avec TypeScript (`interface` ou `type`)

---

### 2. Affichage graphique
- Représentation visuelle de l’évolution du prix dans le temps
- Le graphique doit être :
    - lisible
    - dynamique (mise à jour après sélection)
    - changeable (autre forme du graphique)
- Affichage de deux actions boursières différentes

Bibliothèque autorisée (exemples) :
- Chart.js
- D3.js
- Recharts
- Fait maison pour les vaillants

---

### 3. Interface utilisateur (DOM)
L’utilisateur doit pouvoir :

- sélectionner une action
- choisir une période (ex : 1 semaine, 1 mois, 1 an)
- déclencher le chargement des données

L’interface doit être générée et manipulée via le DOM en JavaScript/TypeScript.

---

### 4. Gestion des erreurs
Votre application doit gérer :

- erreurs réseau
- erreurs API
- données invalides
- erreurs utilisateur

Les erreurs doivent être :
- interceptées (`try/catch`)
- affichées clairement dans l’interface

---

### 5. Architecture TypeScript
Le projet doit inclure :

- Typage strict (`noImplicitAny` recommandé)
- Interfaces pour les données API
- Séparation logique du code (exemples) :
    - `api/`
    - `models/`
    - `ui/`
    - `charts/`
- Code lisible et maintenable

---

## Bonus
Exemples d’améliorations possibles :

- Mode sombre
- Sauvegarde des préférences utilisateur
- Toute notion non abordée en cours
- Export sous forme de tableur (csv, xlsx)

---

## Contraintes techniques
- TypeScript obligatoire
- Pas de framework
- Utilisation d’une bibliothèque graphique autorisée
- Projet compilable sans erreurs TS

---

## Rendu attendu
- Lien vers le dépôt Git par mail à [kmartin16@myges.fr](kmartin16@myges.fr)
- Sujet du mail : GROUPE-X - Rendu JS/TS Fin de module
- Corps du mail : Lien du repo git, nom et prénom de chaque membre du groupe
- Application fonctionnelle
- README clair
- Code commenté et structuré

---

# Barème – /16 points

## Consommation API & Async – **/3**
- 1 pt : appels API fonctionnels
- 1 pt : utilisation correcte de `async/await` / `Promise`
- 1 pt : typage correct des données API

---

## Affichage graphique – **/5**
- 2 pts : graphique fonctionnel et cohérent
- 1 pt : mise à jour dynamique
- 2 pts : Comparaison de 2 actions boursières (ou plus)

---

## Manipulation du DOM – **/3**
- 1 pt : interface interactive
- 1 pt : gestion des événements
- 1 pt : mise à jour dynamique du contenu

---

## Gestion des erreurs – **/2**
- 1 pt : gestion technique des erreurs
- 1 pt : affichage utilisateur clair

---

## TypeScript & Architecture – **/3**
- 1 pt : typage strict et pertinent
- 2 pts : organisation et architecture du projet

---

## Bonus - **/4**
Libre a votre imagination

## Pénalités

- Tout travail rendu passé la date limite se verra attribuer la note de 0
- Si une personne n'a fourni aucun travail dans le groupe, la note pour tout le groupe sera de 0
- Toute triche (rendu trop similaire à un autre groupe, utilisation trop flagrante d'IA) impliquera la note de 0

