
var moviesReview = angular.module('moviesReview', []);

moviesReview.controller('MoviesReviewCtrl', [
  '$scope',
  '$http',
  function($scope, $http){
    $scope.movie={};
    $scope.template = 'reviews';
    $scope.viewAdmin = function(){
      $scope.template = 'movies';
    };

    $scope.viewUser = function(){
      $scope.template = 'reviews';
    };

    //refresh movies list when movie is added/deleted
    var refresh = function() {
      $http.get('/movieslist').success(function(response){
        $scope.movies = response;
      });
    };

    refresh();
    $scope.addMovie = function() {
      $http.post('/movies', $scope.movie).success(function(response){
        refresh();
        $scope.movie="";
      });
    };

    $scope.deleteMovie = function(id) {
      $http.delete('/movies/' + id).success(function(response){
        refresh();
      });
    };
}]);
