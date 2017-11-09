/*
 Author: Leandro Correa
 Github: leandro8d
 linkedin/email: leandro8d@hotmail.com
 */
app.controller("homeController", function ($scope, $cookies, $http, $location) {


    $scope.condicoes;
    $http({
        method: 'GET',
        url: 'api/servicoSX/getCondicoes',
    }).then(function successCallback(response) {
        $scope.condicoes = response.data;
    }, function errorCallback(response) {
        console.log(response);
    }
    );

 
    $scope.comercarFormulario = function (email, nome)
    {
        $cookies.put('email', email);
        $cookies.put('nome', nome);
        $location.path("/questao1");
    };

});