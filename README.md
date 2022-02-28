# Vue x Firebase Auth

This repository is a functionnal project combining Vue & Firebase Authentification

## Installation

1. Cloner le dépôt GitHub du projet

```bash
git clone https://github.com/libgit2/libgit2
```

2. Installer les dépendances du projet
```bash
npm install
```

3. Se rendre sur Firebase et activer l'authentification par email & mot de passe

4. Ajouter une application web à votre projet et copier votre configuration SDK dans **src > firebase > index.js**

```javascript
const firebaseConfig = {
  apiKey: "" /*YOURAPIKEY"*/,
  authDomain: "" /*YOURAUTHDOMAIN"*/,
  projectId: "" /*YOURPROJECTID"*/,
  storageBucket: "" /*YOURSTORAGEBUCKET"*/,
  messagingSenderId: "" /*YOURMESSAGINGSENDERID"*/,
  appId: "" /*YOURAPPID"*/,
  measurementId: "" /*YOURMEASUREMENTID"*/
};
```

## Utilisation

```bash 

# Lancer un environnement de développement local
npm run serve

# Compiler l'application web en mode production
npm run build

```

## License
[GPL 3.0](https://choosealicense.com/licenses/gpl-3.0/)

