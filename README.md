# Gestion de produits

## Description
Ce projet est une application web permettant de gérer une liste de produits. Il inclut des fonctionnalités telles que l'ajout, la modification, la suppression, et l'affichage des détails des produits. Les données sont sauvegardées dans le `localStorage` du navigateur pour persister même après un rechargement de la page.

## Fonctionnalités
- **Afficher la liste des produits** : Voir une table avec les informations clés des produits.
- **Voir les détails d'un produit** : Afficher une modale avec les informations complètes du produit.
- **Ajouter un produit** : Ajouter un nouveau produit à la liste.
- **Modifier un produit** : Modifier les informations d'un produit existant.
- **Supprimer un produit** : Retirer un produit de la liste.

## Technologie utilisée
- **HTML/CSS** : Pour la structure et le style.
- **JavaScript** : Pour la logique métier et l'interaction utilisateur.
- **localStorage** : Pour le stockage des données.
- **Fetch API** : Pour charger les données depuis un fichier JSON externe (`data.json`).

## Installation et utilisation
1. Clonez le dépôt :
    ```bash
    git clone https://github.com/votre-utilisateur/votre-projet.git
    ```
2. Ouvrez le fichier `index.html` dans votre navigateur.
3. Assurez-vous que le fichier `data.json` est bien placé dans le répertoire du projet.

## Fichiers clés
- `index.html` : Point d'entrée de l'application.
- `style.css` : Fichier contenant les styles de l'application.
- `script.js` : Contient la logique de l'application.
- `data.json` : Fichier JSON avec les données de produits initiales.
- `assets/` : Contient les images et icônes utilisées dans l'application.

## Fonctionnement
- Lorsque la page est chargée, les données des produits sont récupérées depuis le fichier `data.json` ou depuis le `localStorage` si elles y existent déjà.
- Les modales permettent de gérer les opérations de création, modification et affichage des détails des produits.
- Les boutons d'action dans la table permettent d'interagir directement avec les produits.

## Contribuer
Les contributions sont les bienvenues ! Veuillez suivre ces étapes :
1. Forkez le projet.
2. Créez une branche pour vos modifications (`git checkout -b ma-nouvelle-fonctionnalite`).
3. Faites vos changements et validez (`git commit -m 'Ajouter une nouvelle fonctionnalité'`).
4. Poussez votre branche (`git push origin ma-nouvelle-fonctionnalite`).
5. Ouvrez une Pull Request.


