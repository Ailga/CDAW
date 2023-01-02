@extends('template')
@extends('footer')
@extends('navigation-menu')
@section('content')

<head>
  <script src="https://code.jquery.com/jquery-1.9.1.min.js" type="text/javascript"></script>
  <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
  <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">
</head>

<body>
  @section('menu')
<div class="container">

<table id='myTable' class='display'>
<thead><tr><th>Date</th><th>Mode</th><th>Joueur1</th><th>Joueur2</th><th>Gagnant</th</tr></thead>
<tbody>
@foreach($infosBattle as $battle)
<tr>
  <td width=20px align='center'>{{$battle->added_at}}</td>
  <td width=10px align='center'>{{$battle->mode}}</td>
  <td width=20px align='center'>{{$battle->id_user1}}</td>
  <td width=20px align='center'>{{$battle->id_user2}}</td>
  <td width=20px align='center'>{{$battle->winner}}</td>
</tr>

@endforeach

</tbody></table></div>

@section('footer')

</body>

