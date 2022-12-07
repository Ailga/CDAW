@extends('template')
@section('content')

<head>
<script src="https://code.jquery.com/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">


</head>

<h1>Bestiaire pokemons</h1>

<table id='myTable' class='display'>
<thead><tr><th>Name</th><th>Energie</th><th>Image</th></tr></thead>
<tbody>
@foreach($infosPokemon as $pokemon)
<tr>
  <td width=10px align='center'>{{$pokemon->name}}</td>
  <td width=10px align='center'>{{$pokemon->id_energy}}</td>
  <td width=10px align='center'>
    <img src={{$pokemon->pathImg}} width='90' height='90'>
  </td>
</tr>

@endforeach

</tbody></table>


