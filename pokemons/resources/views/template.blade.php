<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Pokemons</title>
</head>
<content>
    <?php
        require_once "listePokemon.blade.php";
    ?>
</content>
<footer>
    <?php 
        echo"Ceci est un pied de page"
    ?>
</footer>
</html>