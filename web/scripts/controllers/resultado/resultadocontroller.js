/*
 Author: Leandro Correa
 Github: leandro8d
 linkedin/email: leandro8d@hotmail.com
 */
app.controller("resultadoController", function ($scope, $cookies, $http, $location, formularioService) {


    function sessao() {
        if (formularioService.listaPerfis.length === 0){
            $location.path('/questao1');
        }
        else {
            $cookies.remove('email');
            $cookies.remove('nome');
        }

    }


    sessao();

    $scope.perfis = formularioService.listaPerfis;




    $scope.comercarFormulario = function ()
    {
        $location.path("/");
    };

});