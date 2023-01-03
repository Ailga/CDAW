# Informations générales
- **UV** : CDAW
- **Name** : Fabien Plouvier et Gaëlle Erhart
- **Date** : 14/11/2022 -> 03/01/2023

📌Ce répertoire correspond au travail effectué pour mon cours sur la Conception et Développement d'Applications Web.
  
# Quel est le contexte ?

## Les spécifications

🛠️Les principaux objectifs du cours étaient :  

- Réaliser un bestiaire de pokémons  
- Réaliser une gestion de compte user avec des connexions et inscriptions  
- Pouvoir consulter des statistiques associées au battles, joueurs  
- Pouvoir faire un combat avec un adversaire (3 modes différents, 3 pokémons par joueur)  

## Les outils disponibles

Notre projet est basé sur la programmation en Laravel.  
**Laravel** est un **framework web open-source** écrit en **PHP** respectant le principe modèle-vue-contrôleur et entièrement développé en programmation orientée objet. 

# L'organisation

Le git contient 2 branches.  
- Une branche **main** qui contient le projet final **ProjetFinal** avec les **TPs**
- Une branche **Jalons** qui contient tous les jalons (3)

# Comment installer ?
⚠️Pour pouvoir utiliser correctement notre travail, veuillez suivre les étapes d'installation et d'exécution des fichiers/scripts.  

## Installation

1. Clonez notre dossier dans votre répertoire  
```git
git clone https://github.com/Ailga/CDAW.git
```

2. Choisissez la branche que vous voulez
```git
git checkout // main ou Jalons
```

*Note:*  
*Pour le projet laravel final, il faut avoir installé npm sur votre pc avec les modules express et socket.io*  
```bash
npm i express
npm i socket.io
```

## Exécution
Assurez vous d'abord qu'un serveur php tourne sur votre pc en localhost.  
Éventuellement, adapter la configuration du projet en fonction de la votre.  

Pour le **projet laravel final**, ouvrez un terminal, placez vous dans le dossier et lancer le serveur avec
```
php artisan serve
```

De même avec la commande
```
node server
```

C'est parfait, vous pouvez aller sur un navigateur est taper localhost:8000