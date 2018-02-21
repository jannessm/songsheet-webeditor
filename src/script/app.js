let app = angular.module('songsheet', []);
app.run(function($rootScope){
    $rootScope.content = '';
    $rootScope.user = {
        name: {
            firstname: undefined,
            lastname: undefined,
            fullname: function(){
                return this.firstname + ' ' + this.lastname;
            }
        },
        dbkey: undefined,
        defaultPath: undefined
    };
    
    //TODO: get cookie / check login status
    //if cookie exists fill user


    //set view: if logged in -> browser
    // else -> login
    let file = '/view/login.html';
    if($rootScope.user.dbkey !== undefined){
        file = '/view/browser.html';
    }
    $http.get(file).then(function(response){
        $rootScope.content = response.data;
    });
});