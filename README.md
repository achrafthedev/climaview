# 🌤️ Dashboard Météo - HETIC - Achraf CHARDOUDI  

## 📌 Description du projet  

Ce projet est réalisé dans le cadre de la formation **HETIC** pour le titre **"Concepteur Développeur de Solutions Digitales"** (RNCP 36146) - Bloc 3.  
L'objectif est de concevoir un **dashboard interactif en React** affichant des informations météorologiques en temps réel grâce à l'API OpenWeatherMap.  

## 🚀 Fonctionnalités  

✅ **Affichage des données météo** : température, humidité, conditions  
✅ **Prévisions sur plusieurs jours** avec gestion des dates dynamiques  
✅ **Mise à jour en temps réel** des données météo  
✅ **Recherche de villes** pour obtenir des informations localisées  
✅ **Gestion d'état avec Redux Toolkit** pour une meilleure performance  
✅ **Mode sombre & clair** avec Material UI  
✅ **Interface moderne et responsive**  

## 🛠️ Technologies utilisées  

- **Front-end** : React.js  
- **Gestion d'état** : Redux Toolkit  
- **Requêtes API** : Axios  
- **Interface utilisateur** : Material UI  
- **API météo** : OpenWeatherMap  

## 🔧 Installation et lancement  

1. **Cloner le repo GitHub :**  
   ```sh
   git clone https://github.com/achrafthedev/climaview.git
   cd climaview
   ```

2. **Installer les dépendances :**  
   ```sh
   npm install
   ```

3. **Configurer l'API** :  
   - Créez un fichier `.env` à la racine du projet  
   - Ajoutez la clé API OpenWeatherMap :  
   ```sh
   REACT_APP_WEATHER_API_KEY=VOTRE_CLE_API
   ```

4. **Lancer l'application :**  
   ```sh
   npm start
   ```

## 🔗 Lien de téléchargement du projet  

👉 [Télécharger le projet sur GitHub](https://github.com/achrafthedev/climaview)  

## 📌 Améliorations futures  

- 📍 **Intégration d'une carte interactive** avec Leaflet  
- 📊 **Ajout de graphiques analytiques** sur les tendances météo  
- ⚡ **Optimisation des performances** et gestion du cache

## 🧪 Tests et Validation

L'application est testée à l'aide de **Cypress** pour assurer le bon fonctionnement de ses fonctionnalités principales. Les tests couvrent l'affichage des données météo, la gestion des erreurs et le mode sombre.

### 📌 Installation de Cypress
Assurez-vous d'avoir Cypress installé dans votre projet. Si ce n'est pas encore fait, exécutez :
```sh
npm install cypress --save-dev
```
### 🚀 Exécution des tests
```sh
npx cypress open
```
Ou pour exécuter les tests en mode headless :
```sh
npx cypress run
```
### 🔍 Cas de tests couverts
- ✅ Affichage des données météo : Vérifie que les informations météorologiques d'une ville saisie sont correctement affichées.
- ✅ Gestion des erreurs : Vérifie que l'application affiche un message d'erreur lorsqu'une ville inexistante est saisie.
- ✅ Mise à jour de la météo : Vérifie que la météo se met à jour correctement lorsqu'une autre ville est recherchée.
- ✅ Affichage des prévisions météo : Vérifie que les prévisions à 5 jours sont bien affichées.
- ✅ Mode sombre : Vérifie que le mode sombre peut être activé et désactivé.

## 📝 Auteur  

Projet réalisé par **Achraf Chardoudi** - Étudiant HETIC.
