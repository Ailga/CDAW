<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
    <script src="../js/bestiaire.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="../css/bestiaire.css">
</head>

<body>

<?php
    function CallAPI($url)
{
    $response = file_get_contents($url);
    $pathImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"; // + 1.png par ex
    if ($response != false)
    {
        $responseObj = json_decode($response);
        $results = $responseObj->{'results'};
        echo "<table id='myTable' class='display'>";
        echo "<thead><tr><th>ID</th><th>Name</th><th>Image</th></tr></thead>";
        echo "<tbody>";
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