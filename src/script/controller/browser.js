app.controller('browserCtrl', ['$scope', '$songsheet', '$http', '$location', '$interval',
                                function($scope, $songsheet, $http, $location, $interval){
    $http.get('script/debug-data.json').then(function(data){
        if(!config.dropbox){
            $scope.songs = data.data.songs;
            $scope.events = data.data.events;
        }
    }, function(err){
        console.log(err);
    })

    $scope.display = function(view){
        $location.search('v', view)
        $scope.view = view;
    }

    $scope.view = $location.search().v ? $location.search().v : 'songs';
    $scope.setPath = $location.search().setPath ? true : false;

    $scope.logout = function(){
        $songsheet.logout();
    }
    
    let i = $interval(function () {
        if($songsheet.user.name.firstname !== undefined){
            $scope.name = $songsheet.user.getFullName();
            $interval.cancel(i);
        }
    }, 10);

    $songsheet.getFiles(function(res){
        $scope.files = res.entries;
        $scope.cursor = res.cursor;
    });
}]);