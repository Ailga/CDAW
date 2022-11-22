# Auteurs
- PLOUVIER Fabien
- ERHART Gaëlle

# Jalon 2

Le jalon 2 était sur l'affichage d'une datable selon les données de la BDD.
## Fonctionnalités implémentées :
- affichage DataTables selon API
- affichage DataTables selon BDD

### Méthode pour initialiser la base de données :
1) Déplacer le fichier ``database/migrations/Plouvier-Erhart_create_pokemon_table.php`` dans votre dossier ``database/migrations/``
2) Déplacer le fichier ``database/seeders/Plouvier-Erhart_PokemonSeeder.php`` dans votre dossier ``database/seeders/``
3) Créer la table pokemon depuis la commande de migration : 
    ```bash
    php artisan migrate
    ```
4) Alimenter la table pokemon depuis la commande de seed : 
    ```bash
    php artisan db:seed --class=PokemonSeeder
    ```

### Méthode pour installer les fichiers :
1) Déplacer le fichier ``app/Http/Controllers/listePokemonsController.php`` dans votre dossier ``app/Http/Controllers/``
2) Déplacer le fichier ``routes/web.php`` dans votre dossier ``routes``
3) Déplacer le fichier ``public/css`` dans votre dossier ``public``

## Route :
``http://{{ADRESSE}}:{{PORT}}/liste/``


