bamApp.controller('bamCtl', ['$scope', 'parallaxHelper', function($scope, parallaxHelper){
    $scope.background = parallaxHelper.createAnimator(-0.3, 150, -150);
}]);