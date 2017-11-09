/* 
 * Trabalho Simplex
 * Autores:Leandro;Jonathan;Yuri  * 
 */


app.controller("formularioController", function ($scope,$cookies,$location,formularioService,$route) {


    $scope.respostas = [];

    function sessao() {
       var email = $cookies.get('email');
       var nome = $cookies.get('nome');
       if(!email||!nome)
           $location.path('');
    }
    

    sessao();
    $scope.exists = function (item) {
        return formularioService.respostas[$route.current.$$route.idQuestion-1].indexOf(item) > -1;
    };
    $scope.teste = 'teste';
    $scope.paginaAtual = formularioService.paginaAtual;

    $scope.toggle = function (item) {
        var idx = formularioService.respostas[$route.current.$$route.idQuestion-1].indexOf(item);
        if (idx > -1) {
            formularioService.respostas[$route.current.$$route.idQuestion-1].splice(idx, 1);
        } else {
            formularioService.respostas[$route.current.$$route.idQuestion-1].push(item);
        }
    };



});