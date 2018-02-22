app.controller('loginCtrl', ['$scope', '$songsheet', function($scope, $songsheet){
    $scope.login = function(){
        $songsheet.login();
    }
}]);