@extends('navigation-menu')
@extends('footer')
<head>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css">
<link rel="stylesheet" href="{{asset('css/autresJoueurs.css')}}">
</head>

@section('menu')

<div class="container">
        <div class="row">
            <div class="col-lg-4">
                <div class="card p-0">
                    <div class="card-image">
                        <img src="https://images.pexels.com/photos/2746187/pexels-photo-2746187.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt="">
                    </div>
                    <div class="card-content d-flex flex-column align-items-center">
                        <h4 class="pt-2">SomeOne Famous</h4>
                        <h5>Creative Desinger</h5>

                        <ul class="social-icons d-flex justify-content-center">
                            <li style="--i:1">
                                <a href="#">
                                    <span class="fab fa-facebook"></span>
                                </a>
                            </li>
                            <li style="--i:2">
                                <a href="#">
                                    <span class="fab fa-twitter"></span>
                                </a>
                            </li>
                            <li style="--i:3">
                                <a href="#">
                                    <span class="fab fa-instagram"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card p-0">
                    <div class="card-image">
                        <img src="https://images.pexels.com/photos/381843/pexels-photo-381843.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt="">
                    </div>
                    <div class="card-content d-flex flex-column align-items-center">
                        <h4 class="pt-2">SomeOne Famous</h4>
                        <h5>Creative Desinger</h5>

                        <ul class="social-icons d-flex justify-content-center">
                            <li style="--i:1">
                                <a href="#">
                                    <span class="fab fa-facebook"></span>
                                </a>
                            </li>
                            <li style="--i:2">
                                <a href="#">
                                    <span class="fab fa-twitter"></span>
                                </a>
                            </li>
                            <li style="--i:3">
                                <a href="#">
                                    <span class="fab fa-instagram"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card p-0">
                    <div class="card-image">
                        <img src="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt="">
                    </div>
                    <div class="card-content d-flex flex-column align-items-center">
                        <h4 class="pt-2">SomeOne Famous</h4>
                        <h5>Creative Desinger</h5>

                        <ul class="social-icons d-flex justify-content-center">
                            <li style="--i:1">
                                <a href="#">
                                    <span class="fab fa-facebook"></span>
                                </a>
                            </li>
                            <li style="--i:2">
                                <a href="#">
                                    <span class="fab fa-twitter"></span>
                                </a>
                            </li>
                            <li style="--i:3">
                                <a href="#">
                                    <span class="fab fa-instagram"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
@section('footer')