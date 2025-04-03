## Rapport technique - SpaceX Launch Tracker

## 1. Aperçu du projet

L'application SpaceX Launch Tracker est une application web développée en Vue 3 avec TypeScript qui permet de suivre les lancements passés et à venir de SpaceX. Elle utilise l'API publique de SpaceX pour récupérer les données des lancements et les afficher à l'utilisateur dans une interface conviviale et responsive.

### 1.1 Stack technique

- **Framework frontend**: Vue 3 avec Composition API et `<script setup>`
- **Langage**: TypeScript
- **Build/Bundler**: Vite
- **Styles**: TailwindCSS
- **API**: SpaceX API v5

## 2. Architecture de l'application

### 2.1 Structure des fichiers

L'application suit une architecture standard pour un projet Vue 3 + TypeScript + Vite :

```
├── public/               # Fichiers statiques
├── src/
│   ├── api/              # Services d'API
│   ├── assets/           # Assets (images, SVG)
│   ├── components/       # Composants Vue réutilisables
│   ├── composables/      # Logique réutilisable (hooks Vue)
│   ├── styles/           # Fichiers CSS globaux
│   ├── types/            # Définitions de types TypeScript
│   ├── App.vue           # Composant racine
│   ├── main.ts           # Point d'entrée
│   └── style.css         # Styles globaux
├── index.html            # Template HTML principal
├── tsconfig.json         # Configuration TypeScript
├── package.json
├── package-lock.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts        # Configuration Vite
```

### 2.2 Composants principaux

1. **App.vue** - Composant racine qui organise la structure principale
2. **NextLaunch.vue** - Affiche le prochain lancement prévu
3. **LaunchCard.vue** - Carte pour chaque lancement passé
4. **LaunchFilter.vue** - Filtres pour les lancements
5. **LaunchModal.vue** - Fenêtre modale avec les détails d'un lancement
6. **CountdownTimer.vue** - Affiche le temps écoulé depuis un lancement

### 2.3 Composables

- **useSpaceX.ts** - Gère la logique de récupération et de traitement des données de l'API SpaceX

## 3. Analyse technique

### 3.1 Points forts

1. **Architecture bien structurée**:
   - Séparation claire des préoccupations avec composants, composables, et types
   - Utilisation de la Composition API de Vue 3 pour une meilleure organisation du code
   - Code TypeScript pour la sécurité des types

2. **UI/UX moderne**:
   - Interface responsive avec TailwindCSS
   - Animations et transitions fluides
   - Expérience utilisateur intuitive avec filtres et modales

3. **Gestion efficace des données**:
   - Utilisation de composables pour centraliser la logique d'état et d'API
   - Normalisation des données pour une utilisation cohérente
   - Gestion des états de chargement et d'erreur

### 3.2 Difficultés et limitations

1. **Cohérence des types**:
   - Certaines incohérences entre les types définis et les données réelles de l'API
   - Des vérifications supplémentaires sont nécessaires pour éviter des erreurs à l'exécution

2. **Gestion des erreurs**:
   - La gestion des erreurs API pourrait être améliorée avec des messages plus explicites pour l'utilisateur
   - Pas de stratégie de retry en cas d'échec d'une requête API

3. **Bugs identifiés**:
   - Dans LaunchModal.vue: utilisation de `props.launch` avant la déclaration de `props`
   - Certaines propriétés optionnelles ne sont pas correctement vérifiées (risque de null/undefined)

4. **Performance**:
   - Pas de mise en cache des requêtes API
   - Chargement potentiellement lourd des images
  
5. **API pas à jour et données pas forcément remplies**
   - Dans les missions n'ayant pas réussi, il n'y a pas d'image lié au lancement, ni de vidéo
   - Pour toutes les missions, il n'y a pas de détail de mission
   - J'ai donc mis en place pour les images une image type, et pour les détails de mission, un petit résumé à l'aide des données que j'ai pu collecter

### 3.3 Optimisations possibles

1. **Cache des données**:
   - Implémenter un système de cache pour éviter des requêtes API redondantes
   - Utilisation de localStorage pour persister certaines données entre les sessions

2. **Lazy loading**:
   - Implémenter le chargement paresseux des images
   - Pagination ou infinite scroll pour les lancements passés

3. **Tests**:
   - Ajouter des tests unitaires et d'intégration

## 4. Guide de déploiement

### 4.1 Prérequis

- Node.js (v14.18+ ou v16+)
- npm ou yarn
- Git

### 4.2 Installation locale

1. Cloner le dépôt (ou télécharger les fichiers source)
   ```bash
   git clone https://github.com/Yarz123/my_vue_app
   cd my_vue_app
   ```

2. Installer les dépendances
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Lancer le serveur de développement
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Ouvrir l'application dans le navigateur à l'adresse indiquée (généralement http://localhost:5173)

### 4.3 Build pour la production en local

1. Générer les fichiers de production
   ```bash
   npm run build
   # ou
   yarn build
   ```

2. Tester le build localement
   ```bash
   npm run preview
   # ou
   yarn preview
   ```

### 4.4 Déploiement

Déploiement sur un serveur traditionnel

Transférer le contenu du dossier dist sur votre serveur web
Configurer votre serveur pour servir une SPA (Single Page Application)


## 5. Ressources utilisées et documentation

### 5.1 API SpaceX
- Documentation API: https://github.com/r-spacex/SpaceX-API
- Endpoint v5: https://api.spacexdata.com/v5

### 5.2 Framework et librairies
- Vue 3: https://vuejs.org/
- TypeScript: https://www.typescriptlang.org/
- Vite: https://vitejs.dev/
- TailwindCSS: https://tailwindcss.com/
