app.controller('browserCtrl', ['$scope', '$songsheet', '$http', '$location', '$interval', '$explorer',
                                function($scope, $songsheet, $http, $location, $interval, $explorer){
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

    $explorer.init('Öffnen');
    $scope.explorer = {};
    updateExplorer();
    updateName();

    $scope.explorer.doubleClick = function(elem, type){
        $explorer.doubleClick(elem, type);
    }
    $scope.explorer.folderUp = function(){
        $explorer.folderUp();
    }
    $scope.explorer.createFolder = function(){
        console.log(angular.element('.file_box[:focus]'));
        //$explorer.newFolder($scope.explorer)
    }
    $scope.submit = function(){
        //set defaultpath by $scope.explorer.path
        $location.url('/browser');
    }



    function updateExplorer(){   
        let i = $interval(function (){
            $scope.explorer = Object.assign($scope.explorer, $explorer.getState());
        }, 10);
    }
    function updateName(){   
        let i = $interval(function () {
            if($songsheet.user.name.firstname !== undefined){
                $scope.name = $songsheet.user.getFullName();
                $interval.cancel(i);
            }
        }, 10);
    }
}]);