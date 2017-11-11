app.factory('formularioService', function () {

        var service = {};

        service.listaPerfis = [];
        service.calcularPerfil = function(lista)
        {
            service.listaPerfis = [];
          for(i = 0;i<lista.length;i++)
          {
              if(lista[i]=='A')
                  service.listaPerfis.push('Mediador');
              else if(lista[i]=='B')
                  service.listaPerfis.push('Cauteloso');
              else if(lista[i]=='C')
                  service.listaPerfis.push('Desempenhador');
              else if(lista[i]=='D')
                  service.listaPerfis.push('Perfeccionista');
              else if(lista[i]=='E')
                  service.listaPerfis.push('Sensibilidade');
              else if(lista[i]=='F')
                  service.listaPerfis.push('Prestativo');
              else if(lista[i]=='G')
                  service.listaPerfis.push('Confrontador');
              else if(lista[i]=='H')
                  service.listaPerfis.push('Observador');
              else if(lista[i]=='I')
                  service.listaPerfis.push('Otimista');
          }  
        };
       


        return service;
    });