/* 
 * Trabalho Simplex
 * Autores:Leandro;Jonathan;Yuri  * 
 */


app.controller("formularioController", function ($scope, $parse, $http, $uibModal) {


    $scope.respostas = {};
    
    $http({
        method: 'GET',
        url: 'api/servicoSX/getCondicoes',
    }).then(function successCallback(response) {
        $scope.condicoes = response.data;
    }, function errorCallback(response) {
        console.log(response);
    }
    );

   $scope.comercarFormulario = function(email,nome)
   {
       $cookies.put('email', email);
       $cookies.put('nome', nome);
       $state.go("/formulario");
   }

});