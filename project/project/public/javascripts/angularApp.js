
var moviesReview = angular.module('moviesReview', []);

moviesReview.controller('MoviesReviewCtrl', [
  '$scope',
  '$http',
  function($scope, $http){
    $scope.movie={};
    $scope.review={};
    $scope.template = 'reviews';
    $scope.viewAdmin = function(){
      $scope.template = 'movies';
    };

    $scope.viewUser = function(){
      $scope.template = 'reviews';
    };

    $scope.getReviews = function(id){
      $http.get('/movies/' + id).success(function(response){
        $scope.template = 'user-review';
        $scope.movie = response;
      });
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

    //refresh reviews list when review is added/deleted
    var refreshReviews = function() {
      $http.get('/movie-review').success(function(response){
        $scope.reviews = response;
      });
    };

    refreshReviews();
    $scope.review_filter = function(movie){
      return function(reviews){
        return(movie._id == reviews.movie_id);
      }
    }

    $scope.addReview = function(id) {
      $scope.review.movie_id = id._id;
      $http.post('/reviews', $scope.review).success(function(response){
        refreshReviews();
        $scope.review="";
        $scope.template = 'user-review';
      });
    };
}]);
