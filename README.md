# GitLab Issue Reporter

## Table des matières

- [GitLab Issue Reporter](#gitlab-issue-reporter)
  - [Table des matières](#table-des-matières)
  - [Description](#description)
  - [Prérequis](#prérequis)
  - [Avertissement](#avertissement)
  - [Installation](#installation)
    - [Google Chrome](#google-chrome)
  - [Fonctionnalités principales](#fonctionnalités-principales)
  - [Utilisation](#utilisation)
    - [Ajouter un Repository](#ajouter-un-repository)
  - [Auteurs](#auteurs)
  - [Licence](#licence)

## Description

GitLab Issue Reporter est une extension pour Google Chrome permettanrt d'envoyer des rapports de bugs directement depuis une page web vers un projet GitLab.

## Prérequis

Pour utiliser cette extension, vous aurez besoin du navigateur Google Chrome.

## Avertissement

Cette extension est fournie à titre expérimental.

Vous ne la trouverez pas sur le Chrome Web Store.

Libre à vous de l'utiliser tel quel ou de la modifier pour l'adapter à vos besoins.

## Installation

### Google Chrome

Pour installer cette extension en mode développeur, suivez les étapes ci-dessous :

1. Clonez ce dépôt
3. Ouvrez Google Chrome et accédez à `chrome://extensions/`.
4. Activez le mode "Developer mode" (Mode développeur) situé en haut à droite de la page.
5. Cliquez sur "Load unpacked" (Charger l'extension non empaquetée) et sélectionnez le dossier contenant le code source de l'extension.
6. L'extension doit maintenant être installée et prête à l'emploi.

## Fonctionnalités principales

Une fois l'extension installée, elle ajoute une nouvelle option au menu contextuel (clic droit) qui vous permet de sélectionner parmi une liste un repository GitLab et de créer un rapport de bug.

## Utilisation

### Ajouter un Repository

Pour utiliser l'extension il faut ajouter un repository GitLab.

Pour cela, cliquez sur l'icône de l'extension dans la barre d'outils de votre navigateur et ajoutez un repository en renseignant les champs suivants :

- Nom du repository (Libre)
- Access Token (Token d'accès à l'API GitLab)
- URL de l'intance GitLab (URL de l'instance GitLab)
- ID du projet (ID du projet GitLab)

Pour obtenir un token d'accès à l'API GitLab, rendez-vous sur votre instance GitLab, allez dans `Settings` > `Access Tokens` et créez un nouveau token avec les permissions `api`.

Pour obtenir l'ID du projet, rendez-vous sur votre instance GitLab, allez dans le projet que vous souhaitez utiliser et récupérez l'ID dans la page Settings > General.

## Auteurs

- [Yoan Bernabeu](https://github.com/yoanbernabeu)

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

# GitLab-Issue-Reporter
