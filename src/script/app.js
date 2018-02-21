let app = angular.module('songsheet', []);
app.run(function($rootScope){
    $rootScope.content = '';

    $rootScope.songsheet = new Songsheet();


    //set view: if logged in -> browser
    // else -> login
    let file = '/view/login.html';
    switch($rootScope.songsheet.getView()){
        default:
        case 'login':
            file = '/view/login.html';
            break;
        case 'setPath':
            file = '/view/setPath.html';
            break;
        case 'browser':
            file = '/view/browser.html';
    }
    $http.get(file).then(function(response){
        $rootScope.content = response.data;
    });
});

class User{

    constructor(){
        this.name = {
            firstname: undefined,
            lastname: undefined,
        };
        this.token = undefined;
        this.defaultPath = undefined;
        this.db = undefined;
    }

    setToken(token){
        this.token = token;
        this._updateCookie();
    }

    getToken(){
        if(this.token)
            return this.token;
        else
            return undefined;
    }

    getFullName(){
        return this.name.firstname + ' ' + this.name.lastname;
    }

    _updateCookie(){
        $cookies.putObject('songsheet_user', {
            firstname: this.name.firstname,
            lastname: this.name.lastname,
            token: this.token,
            defaultPath: this.defaultPath
        });
    }

    setUserInfo(dbxAccount){
        console.log(dbxAccount);
        this._updateCookie();
    }
}

class Songsheet{

    constructor(){
        this.user = new User();
        if(config.dropbox)
            this.dbx = this.initDBX();
        this.view = this.checkLoginStatus();
    }

    checkLoginStatus(){
        let cookie = $cookies.getObject('songsheet_user');
        let token = $location.search().access_token;
        if(cookie){
            this.user = cookie;
            return 'browser';
        }else if(token){
            this.user.setToken(token);
            this.dbx.setAccessToken(token);
            this.user.setUserInfo(this.dbx.usersGetCurrentAccount());
            return 'setPath';
        }else{
            return 'login';
        }
    }

    login(){
        window.open(dbx.getAuthenticationUrl(config.authLink), '_self');
    }

    logout(){
        $cookies.remove('songsheet_user');
    }

    initDBX(){
        let dbx = new Dropbox();
        dbx.setClientId("9mjvocts05n4e47");
    }
}