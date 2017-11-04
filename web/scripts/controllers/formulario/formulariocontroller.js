/* 
 * Trabalho Simplex
 * Autores:Leandro;Jonathan;Yuri  * 
 */


app.controller("formularioController", function ($scope, $parse, $http, $uibModal) {


    $scope.respostas = [];
    
    $http({
        method: 'GET',
        url: 'api/servicoSX/getCondicoes',
    }).then(function successCallback(response) {
        $scope.condicoes = response.data;
    }, function errorCallback(response) {
        console.log(response);
    }
    );

 $scope.exists = function (item) {
        return $scope.respostas.indexOf(item) > -1;
      };
      
      
      $scope.toggle = function (item) {
        var idx = $scope.respostas.indexOf(item);
        if (idx > -1) {
          $scope.respostas.splice(idx, 1);
        }
        else {
          $scope.respostas.push(item);
        }
      };

   $scope.comercarFormulario = function(email,nome)
   {
       $cookies.put('email', email);
       $cookies.put('nome', nome);
       $state.go("/formulario");
   }

});