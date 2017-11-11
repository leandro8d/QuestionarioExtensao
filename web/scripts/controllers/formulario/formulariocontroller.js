/* 
 * Trabalho Simplex
 * Autores:Leandro;Jonathan;Yuri  * 
 */


app.controller("formularioController", function ($scope, $cookies, $location, formularioService, $route, $http, $parse, $anchorScroll) {


    $scope.respostas = [];
    $scope.a = {letra: 'A', total: 0};
    $scope.b = {letra: 'B', total: 0};
    $scope.c = {letra: 'C', total: 0};
    $scope.d = {letra: 'D', total: 0};
    $scope.e = {letra: 'E', total: 0};
    $scope.f = {letra: 'F', total: 0};
    $scope.g = {letra: 'G', total: 0};
    $scope.h = {letra: 'H', total: 0};
    $scope.i = {letra: 'I', total: 0};

    function sessao() {
        $scope.email = $cookies.get('email');
        $scope.nome = $cookies.get('nome');
        if (!$scope.email || !$scope.nome)
            $location.path('');
    }


    sessao();

    $scope.teste = 'teste';
    $scope.paginaAtual = formularioService.paginaAtual;

    $scope.finalizar = function ()
    {
        $scope.vetorValores = [];
        $scope.vetorValoresRepetidos = [];
        for (i = 1; i <= 31; i++) {
            //vetorValores.push($scope.$eval('questao' + i).replace(i.toString(), ''));
            if ($scope.$eval('questao' + i).replace(i.toString(), '') == $scope.a.letra) {
                $scope.a.total++;
            } else if ($scope.$eval('questao' + i).replace(i.toString(), '') == $scope.b.letra) {
                $scope.b.total++;
            }
             else if ($scope.$eval('questao' + i).replace(i.toString(), '') == $scope.c.letra) {
                $scope.c.total++;
            }else if ($scope.$eval('questao' + i).replace(i.toString(), '') == $scope.d.letra) {
                $scope.d.total++;
            }else if ($scope.$eval('questao' + i).replace(i.toString(), '') == $scope.e.letra) {
                $scope.e.total++;
            }else if ($scope.$eval('questao' + i).replace(i.toString(), '') == $scope.f.letra) {
                $scope.f.total++;
            }
            else if ($scope.$eval('questao' + i).replace(i.toString(), '') == $scope.g.letra) {
                $scope.g.total++;
            }else if ($scope.$eval('questao' + i).replace(i.toString(), '') == $scope.h.letra) {
                $scope.h.total++;
            }else if ($scope.$eval('questao' + i).replace(i.toString(), '') == $scope.i.letra) {
                $scope.i.total++;
            }
            
        }
        
            $scope.vetorValores.push($scope.a);
            $scope.vetorValores.push($scope.b);
            $scope.vetorValores.push($scope.c);
            $scope.vetorValores.push($scope.d);
            $scope.vetorValores.push($scope.e);
            $scope.vetorValores.push($scope.f);
            $scope.vetorValores.push($scope.g);
            $scope.vetorValores.push($scope.h);
            $scope.vetorValores.push($scope.i);
            
            var maiorvalor = 0;
            for (j = 0; j < 9; j++)
            {
                if ($scope.vetorValores[j].total>maiorvalor) {
                    maiorvalor = $scope.vetorValores[j].total;
                }
            }
            
            for (j = 0; j < 9; j++)
            {
                if (maiorvalor == $scope.vetorValores[j].total) {
                     $scope.vetorValoresRepetidos.push($scope.vetorValores[j].letra)
                }
            }
            
            formularioService.calcularPerfil($scope.vetorValoresRepetidos);
            $scope.enviar();
        };
 





    $scope.enviar = function ()
    {

        $scope.condicoes;
        $http({
            method: 'POST',
            url: 'api/servicoSX/enviarResultado',
            data: {lista: $scope.vetorValores,listaRepetidos:$scope.vetorValoresRepetidos, nome: $scope.nome, email: $scope.email}
        }).then(function successCallback(response) {
            $location.path("/resultado");
        }, function errorCallback(response) {
            console.log(response);
        }
        );
    };

    $scope.gotoBottom = function () {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('bottom');

        // call $anchorScroll()
        $anchorScroll();
    };



});