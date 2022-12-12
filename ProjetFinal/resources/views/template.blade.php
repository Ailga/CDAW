<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
    <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        
        <title>Pokemons</title>
</head>
<content>
    @yield('content')
</content>
<footer>
<script src="{{asset('js/app.js')}}" type="text/javascript"></script>
</footer>
</html>