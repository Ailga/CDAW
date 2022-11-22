# Auteurs
- PLOUVIER Fabien
- ERHART Gaëlle

# Jalon 3

Le jalon 3 était sur l'utilisation de Mérise et la gestion de la base de données du projet.
## Fonctionnalités implémentées :
- migration pour les tables ``users, energy, pokemon, player, battle``
- seeder pour la table ``pokemon``

### Méthode pour initialiser la base de données :
1) Déplacer les fichiers ``database/migrations/**.php`` dans votre dossier ``database/migrations/``
2) Déplacer le fichier ``database/seeders/Plouvier-Erhart_PokemonSeeder.php`` dans votre dossier ``database/seeders/``
3) Créer la table pokemon depuis la commande de migration : 
    ```bash
    php artisan migrate
    ```
4) Alimenter la table pokemon depuis la commande de seed : 
    ```bash
    php artisan db:seed --class=PokemonSeeder
    ```

### Remarques
Vous trouverez dans le dossier ``merise`` le MCD et le MLD du projet.


