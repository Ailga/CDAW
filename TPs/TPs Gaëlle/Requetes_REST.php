<html>
    <head>
        <title> Liste de Pokemons</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1> Pokemons</h1>

<table>
    <tbody>
<?php
for ($i = 1; $i <= 20; $i++){
    $json = file_get_contents('https://pokeapi.co/api/v2/pokemon/'.$i);
    $info=json_decode($json,true);
    echo "<tr><td>".$info['id']."</td>";
    $urlimage=$info["sprites"]["other"]["official-artwork"]["front_default"];
    echo "<td><img src='$urlimage', width=50px /></td>";
    echo "<td>".$info['name']."</td></tr>";
}
?>
    </tbody>
</table>