<head>
    <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Pokemon</title>
        <link rel="icon" type="image/x-icon" href="{{asset('favicon.ico')}}" />
        <!-- Bootstrap icons - lien : https://icons.getbootstrap.com/-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet" />
        <!-- Google fonts-->
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,600;1,600&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,300;0,500;0,600;0,700;1,300;1,500;1,600;1,700&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,400;1,400&amp;display=swap" rel="stylesheet" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link rel="stylesheet" href="{{asset('css/homeStyles.css')}}">
</head>
<content>
    @yield('menu')
    <body class="form-v6">
    <nav class="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
	  <div class="container px-5">
		  <a class="navbar-brand fw-bold" href="/">Pokemon</a>
	  </div>
    <div class="btnTopBar">
      <button class="btn btn-secondary rounded-pill px-3 mb-2 mb-lg-0" data-bs-toggle="modal" data-bs-target="#feedbackModal">
          <span class="d-flex align-items-center">
            <a class="small" href="{{ url('/listePokemon') }}">Pokedex</a>
          </span>
      </button>
      <button class="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0" data-bs-toggle="modal" data-bs-target="#feedbackModal">
          <span class="d-flex align-items-center">
            <a class="small" href="{{ url('/listePlayer') }}">Joueurs</a>
          </span>
      </button>
      <button class="btn btn-tertiary rounded-pill px-3 mb-2 mb-lg-0" data-bs-toggle="modal" data-bs-target="#feedbackModal">
          <span class="d-flex align-items-center">
            <a class="small" href="{{ url('/listeBattle') }}">Battles</a>
          </span>
      </button>
    </div>
    </nav>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      @auth
        <button class="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0" data-bs-toggle="modal" data-bs-target="#feedbackModal">
          <span class="d-flex align-items-center">
            <a class="small" href="{{ url('/dashboard') }}">Dashboard</a>
          </span>
        </button>
      @endauth

    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="{{asset('js/scriptsHome.js')}}"></script>
        <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
</body>
</content>