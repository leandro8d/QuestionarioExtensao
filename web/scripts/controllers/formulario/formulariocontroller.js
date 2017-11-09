/* 
 * Trabalho Simplex
 * Autores:Leandro;Jonathan;Yuri  * 
 */


app.controller("formularioController", function ($scope, $cookies, $location, formularioService, $route,$http) {


    $scope.respostas = [];

    function sessao() {
        $scope.email = $cookies.get('email');
        $scope.nome = $cookies.get('nome');
        if (!$scope.email || !$scope.nome)
            $location.path('');
    }


    sessao();
    $scope.exists = function (item) {
        return formularioService.respostas[$route.current.$$route.idQuestion - 1].indexOf(item) > -1;
    };
    $scope.teste = 'teste';
    $scope.paginaAtual = formularioService.paginaAtual;

    $scope.toggle = function (item) {
        var idx = formularioService.respostas[$route.current.$$route.idQuestion - 1].indexOf(item);
        if (idx > -1) {
            formularioService.respostas[$route.current.$$route.idQuestion - 1].splice(idx, 1);
        } else {
            formularioService.respostas[$route.current.$$route.idQuestion - 1].push(item);
        }
    };

    $scope.finalizar = function ()
    {
        var a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0;



        angular.forEach(formularioService.respostas, function (questao, key) {
            angular.forEach(questao, function (letra, key) {
                if (letra == 'A')
                    a++;
                else if (letra == 'B')
                    b++;
                else if (letra == 'C')
                    c++;
                else if (letra == 'D')
                    d++;
                else if (letra == 'E')
                    e++;
                else if (letra == 'F')
                    f++;
                else if (letra == 'G')
                    g++;
                else if (letra == 'H')
                    h++;
                else if (letra == 'I')
                    I++;
            });
        });

        var listaValores = [];
        listValores.push(a);
        listValores.push(b);
        listValores.push(c);
        listValores.push(d);
        listValores.push(e);
        listValores.push(f);
        listValores.push(g);
        listValores.push(h);
        listValores.push(i);

        var auxNum = 0;
        var auxLetra;

        if (auxNum < a) {
            auxLetra = 'A';
            auxNum = a;
        } else if (auxNum < b) {
            auxLetra = 'B';
            auxNum = b;
        } else if (auxNum < c) {
            auxLetra = 'C';
            auxNum = c;
        } else if (auxNum < d) {
            auxLetra = 'D';
            auxNum = d;
        } else if (auxNum < e) {
            auxLetra = 'E';
            auxNum = e;
        } else if (auxNum < f) {
            auxLetra = 'F';
            auxNum = f;
        } else if (auxNum < g) {
            auxLetra = 'G';
            auxNum = g;
        } else if (auxNum < h) {
            auxLetra = 'H';
            auxNum = h;
        } else if (auxNum < i) {
            auxLetra = 'I';
            auxNum = i;
        }
    };

        $scope.enviar = function ()
        {

            $scope.condicoes;
            $http({
                method: 'POST',
                url: 'api/servicoSX/enviarResultado',
                data:{lista: formularioService.respostas, nome: $scope.nome, email: $scope.email}
            }).then(function successCallback(response) {
                $scope.condicoes = response.data;
            }, function errorCallback(response) {
                console.log(response);
            }
            );
        };



});