app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./views/home/home.html",
        controller: "homeController"
    }).when("/questao1",{
        templateUrl : "./views/formulario/questao1.html",
        controller: "formularioController"
	})
	.when("/questao2", {
        templateUrl : "./views/formulario/questao2.html",
        controller: "formularioController"
    })
	.when("/questao3", {
        templateUrl : "./views/formulario/questao3.html",
        controller: "formularioController"
    })
	.when("/questao4", {
        templateUrl : "./views/formulario/questao4.html",
        controller: "formularioController"
    })
	.when("/questao5", {
        templateUrl : "./views/formulario/questao5.html",
        controller: "formularioController"
    })
	.when("/questao6", {
        templateUrl : "./views/formulario/questao6.html",
        controller: "formularioController"
    })
	.when("/questao7", {
        templateUrl : "./views/formulario/questao7.html",
        controller: "formularioController"
    
});