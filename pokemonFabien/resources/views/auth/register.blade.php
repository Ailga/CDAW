<head>	<!-- Main Style Css -->
    <link rel="stylesheet" href="{{asset('css/register.css')}}">
</head>




<body class="form-v6">
	<div class="page-content">
		<div class="form-v6-content">
			<div class="form-left">
				<img src="img/imgInscriptionForm.jpg" alt="form" class="imgSignin">
			</div>
            <x-guest-layout>
			<form class="form-detail" action="{{ route('register') }}" method="POST">
            @csrf
				<h2>Inscription</h2>
				<div class="form-row">
                    
					<input type="text" name="name" id="name" class="input-text" placeholder="Pseudo" :value="old('name')" required autofocus autocomplete="name" >
				</div>
				<div class="form-row">
					<input type="text" name="email" id="email" class="input-text" placeholder="Adresse mail (@gmail.com, @outlook.fr...)" title="Doit contenir @gmail.com, @outlook.fr ..." :value="old('email')" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}">
				</div>
				<div class="form-row">
					<input type="password" name="password" id="password" class="input-text" placeholder="Mot de passe (8 caractères min)"  title="Doit avoir minimum 8 caractères" autocomplete="new-password" required pattern=".{8,}">
				</div>
				<div class="form-row">
					<input type="password" name="password_confirmation" id="password_confirmation" class="input-text" placeholder="Comfirmer mot de passe" required autocomplete="new-password">
				</div>
				<div class="form-row-last">
					<input type="submit" name="register" class="register" value="{{ __('Register') }}">
				</div>

                
                <x-jet-validation-errors class="mb-4" />
                <div class="flex items-center justify-end mt-4">
                <a class="underline text-sm text-gray-600 hover:text-gray-900" href="{{ route('login') }}">
                    Déjà inscrit ?
                </a>
            </div>
            </x-guest-layout>
			</form>
		</div>
	</div>
</body>
