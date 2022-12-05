<head>	<!-- Main Style Css -->
    <link rel="stylesheet" href="{{asset('css/register.css')}}">
</head>




<body class="form-v6">
	<div class="page-content">
		<div class="form-v6-content">
            
			<div class="form-left">
				<img src="img/imgConnexionForm.jpg" alt="form" class="imgLogin">
			</div>
            
            <x-guest-layout>

            @if (session('status'))
            <div class="mb-4 font-medium text-sm text-green-600">
                {{ session('status') }}
            </div>
            @endif
    
			<form class="form-detail" action="{{ route('login') }}" method="POST">
            @csrf
				<h2>Connexion</h2>
				<div class="form-row">
					<input type="text" name="email" id="email" class="input-text" placeholder="Adresse mail" :value="old('email')" required autofocus>
				</div>
				<div class="form-row">
					<input type="password" name="password" id="password" class="input-text" placeholder="Mot de passe" required autocomplete="current-password">
				</div>

                <div class="form-row">
                    <input type="checkbox" id="remember_me" name="remember" class="input-checkbox">
                    <label for="remember_me">{{ __('Remember me') }}</label>
                </div>

                <div class="flex items-center justify-end mt-4">
                    @if (Route::has('password.request'))
                        <a class="underline text-sm text-gray-600 hover:text-gray-900" href="{{ route('password.request') }}">
                            {{ __('Forgot your password?') }}
                        </a>
                    @endif
                </div>

				<div class="form-row-last">
					<input type="submit" name="register" class="register" value="{{ __('Log in') }}">
				</div>
            </x-guest-layout>
			</form>
		</div>
	</div>
</body>
