# MyBourse - Application de Suivi Boursier

## Accès au site

**Site en ligne:** [roarr.fr/bourse](https://roarr.fr/bourse)

## Installation locale avec Docker

### Prérequis

- Docker et Docker Compose installés

### Démarrage

```bash
docker compose up
```

Puis accédez au site via votre navigateur : **[localhost:1102](http://localhost:1102)**

## Fonctionnalités

- **Graphiques multiples** : Visualisation des données boursières via des graphiques Line (courbe temporelle), Bubble (analyse de prix/volume) et Mixed (analyse combinée)
- **Filtrage temporel** : Filtrez les données par période (1 semaine, 1 mois, 2 mois, 3 mois, 6 mois)
- **Export de données** : Exportez les données du graphique actif au format CSV
- **Mode sombre** : Interface adaptable avec thème clair/sombre
- **Historique utilisateur** : Mémorisation du dernier graphique consulté via localStorage
- **Interface responsive** : Adaptation automatique à tous les appareils

## Architecture Technique

### Stack

- **Frontend** : TypeScript, HTML5, CSS3
- **Graphiques** : Chart.js
- **Build** : Vite
- **Containerisation** : Docker Compose

### Structure du projet

```
src/
├── api/              # Récupération des données boursières
├── charts/           # Configuration des graphiques (Line, Bubble, Mixed)
├── models/           # Types TypeScript (Stock, User, etc.)
├── ui/               # Composants d'interface
│   ├── chart.ts      # Gestion centralisée des graphiques
│   ├── design.ts     # Création des éléments DOM
│   ├── bubble.ts     # Implémentation Bubble chart
│   ├── line.ts       # Implémentation Line chart
│   ├── mixed.ts      # Implémentation Mixed chart
│   └── ...
├── errors/           # Gestion d'erreurs centralisée
└── main.ts           # Point d'entrée de l'application
```

### Flux de données

1. **API** : Récupération des données depuis une source externe
2. **Models** : Conversion des données en types TypeScript
3. **Charts** : Configuration des graphiques basée sur les modèles
4. **UI** : Rendu des graphiques et gestion des interactions utilisateur
5. **Errors** : Capture et affichage des erreurs


### POINT BONUS

### Exporter les données dans un fichier csv
Appuyer sur le bouton en haut à droite du graphique

### DarkMode
DarkMode disponible 

### Préférence utilisateur
Enregistrer les préférences utilisateur du dark mode et du graphique sélectionné dans le local storage (restitution des préférences au retour de la page)
