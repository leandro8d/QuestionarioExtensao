app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./views/home/home.html",
        controller: "homeController"
    }).when("/formulario", {
        templateUrl : "./views/formulario/formulario.html",
        controller: "formularioController"
    });
});