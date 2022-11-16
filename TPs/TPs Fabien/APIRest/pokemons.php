<html>
  <head>
    <title>UV-CDAW | Pokemon</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="pokemons.css">
  </head>

  <body>
<h1> Pokemons list </h1>

    <?php
    
    
    // Method: POST, PUT, GET etc
// Data: array("param" => "value") ==> index.php?param=value

function CallAPI($url)
{
    $response = file_get_contents($url);
    $pathImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"; // + 1.png par ex
    if ($response != false)
    {
        $responseObj = json_decode($response);
        $results = $responseObj->{'results'};
        echo "<table>";
        echo "<tbody>";
        echo "<tr><td>ID</td><td>Name</td><td>Image</td></tr>";
        echo "<tr>";
        $index = 0;
        foreach($results as $infoPokemon)
        {
            $index ++;
            $imgSource = "<img src='$pathImg$index.png' width='70' height='70'>";
            echo "<tr>";
            echo "<td width=40px align='center'>" . $index . "</td>";
            echo "<td width=150px align='center'>" . $infoPokemon->{'name'} ."</td>";
            echo "<td width=150px align='center'>" .$imgSource . "</td>";

            echo "</tr>";
        }
        echo "</tbody></table>";

    }else{
        echo "Aucune valeur retournée";
    }
}


    CallAPI("https://pokeapi.co/api/v2/pokemon/")
    ?>

  </body>

<?php
?>