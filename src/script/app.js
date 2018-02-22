
let app = angular.module('songsheet', ['ngCookies', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: "/views/browser.html",
            controller: "browserCtrl"
        })
        .when('/login', {
            templateUrl: "/views/login.html",
            controller: "loginCtrl"
        })
        .when('/browser', {
            templateUrl: "/views/browser.html",
            controller: "browserCtrl"
        }).otherwise({
        })
}]);

app.controller('mainCtrl', ['$location', '$songsheet',
                            function( $location, $songsheet){
    //set view: if logged in -> browser
    // else -> login
    let file = '/view/login.html';
    switch($songsheet.getView()){
        default:
        case 'login':
            $location.url('/login');
            break;
        case 'setPath':
            $location.url('/browser?setPath');
            break;
        case 'browser':
            $location.url('/browser');
            break;
    }
}]);

app.directive("song", function(){
    return {
        templateUrl: 'templates/song.html'
    }
})
app.directive("event", function(){
    return {
        templateUrl: 'templates/event.html'
    }
});
app.directive("explorer", function(){
    return {
        templateUrl: 'templates/explorer.html'
    }
});