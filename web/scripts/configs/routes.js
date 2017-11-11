app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: "./views/home/home.html",
                controller: "homeController"
            }).when("/questao1", {
        templateUrl: "./views/formulario/questao1.html",
        controller: "formularioController"
    }).
            when("/resultado", {
                templateUrl: "./views/formulario/resultado.html",
                controller: "resultadoController"
            });

});