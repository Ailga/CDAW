@extends('template')
@section('content')

<head>
<script src="https://code.jquery.com/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">
</head>

 <h3>Test:</h3>

  {{$user->test()}}

  <h3>Energies du user :</h3>
    @foreach($user->energies as $u)
    <ul>
      <li>{{$u->energy->name}}</li>
    </ul>
    @endforeach 
