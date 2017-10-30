(function(){
  angular
  .module('filmes', ['angularUtils.directives.dirPagination'])
  .controller('FilmesController', function($scope, MeusFilmes) {
    $scope.titulo = "Galeria";

    $scope.filmes = [];

    var carregarFilmes = function(){
      MeusFilmes.listar().then(function(filmes){
        $scope.filmes = filmes;
      });
    }

    carregarFilmes();

  });
})();