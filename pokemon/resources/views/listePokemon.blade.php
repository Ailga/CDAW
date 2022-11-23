@extends('template')
@section('content')

<head>
<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="{{asset('css/app.css')}}">
</head>

<h1>Bestiaire pokemons</h1>
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
        echo "<thead><tr><th>Name</th><th>Image</th></tr></thead>";
        echo "<tbody>";
        $index = 0;
        foreach($results as $infoPokemon)
        {
            $index ++;
            $imgSource = "<img src='$pathImg$index.png' width='90' height='90'>";
            echo "<tr>";
            //echo "<td width=40px align='center'>" . $index . "</td>";
            echo "<td width=10px align='center'>" . $infoPokemon->{'name'} ."</td>";
            echo "<td width=10px align='center'>" .$imgSource . "</td>";

            echo "</tr>";
        }
        echo "</tbody></table>";

    }else{
        echo "Aucune valeur retournée";
    }
}


function buildBestiaireFromDB($queryBestiaire)
{

  echo "<table id='myTable' class='display'>";
  echo "<thead><tr><th>Name</th><th>Energie</th><th>Image</th></tr></thead>";
  echo "<tbody>";
  foreach($queryBestiaire as $pokemon)
  {
    $urlImg = $pokemon->{'pathImg'};
    $imgSource = "<img src='$urlImg' width='90' height='90'>";

    echo "<tr>";
    //echo "<td width=40px align='center'>" . $pokemon->{'id'} . "</td>";
    echo "<td width=10px align='center'>" . $pokemon->{'name'} ."</td>";
    echo "<td width=10px align='center'>" . $pokemon->{'energy'} ."</td>";
    echo "<td width=10px align='center'>" .$imgSource . "</td>";
    echo "</tr>";
  }
  echo "</tbody></table>";
}

//CallAPI("https://pokeapi.co/api/v2/pokemon/")
buildBestiaireFromDB($infosPokemon);

?>


<script>
  $(document).ready( function () {
    $('#myTable').DataTable();
} );
</script>

