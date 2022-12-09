@extends('template')
@section('content')

<head>
<script src="https://code.jquery.com/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="{{asset('css/datatableStyles.css')}}">



</head>

<h1>Pokédex</h1>
<nav class="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
	<div class="container px-5">
		<a class="navbar-brand fw-bold" href="/">Pokemon</a>
	</div>
</nav>

<div class="container">

<table id='myTable' class='display'>
<thead><tr><th>Name</th><th id = 'EnergiePokemon'>Energies</th><th>Image</th></tr></thead>
<tbody>
@foreach($infosPokemon as $pokemon)
<tr>
  <td width=20px align='center'>{{$pokemon->name}}</td>
  <td id = 'EnergiePokemon' width=10px align='center'>{{$pokemon->energy->name}}</td>
  <td width=20px align='justify'>
    <img src={{$pokemon->pathImg}} width='90' height='90'><img src={{$pokemon->energy->pathIcon}}>
  </td> 
</tr>

@endforeach

</tbody></table></div>


