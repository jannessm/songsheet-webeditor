
app.service('$songsheet', ['$cookies', '$location', function($cookies, $location){
    this.user = new User($cookies);

    this.checkLoginStatus = function(){
        let cookie = $cookies.getObject('songsheet_user');
        let token = /access_token=(.+?)&/.exec($location.url()) !== null ? /access_token=(.+?)&/.exec($location.url())[1] : undefined;

        if(cookie){
            this.user = new User($cookies, cookie);
            this.dbx.setAccessToken(this.user.token);
            if(this.user.defaultPath === undefined)
                return 'setPath';
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

    this.login = function(){
        if(config.dropbox)
            window.open(this.dbx.getAuthenticationUrl(config.authLink), '_self');
        else
            $location.url('/browser');
    }

    this.logout = function(){
        $cookies.remove('songsheet_user');
        $location.url('/login');
    }

    this.initDBX = function(){
        let dbx = new Dropbox();
        dbx.setClientId("9mjvocts05n4e47");
        return dbx;
    }

    this.getView = function(){
        if(config.dropbox)
            return this.checkLoginStatus();
        else
            return config.debugPage;
    }

    this.getFiles = function(path, callback){
        if(!path || typeof(path) === "function"){
            callback = path;
            path = '';
        }
        
        this.dbx.filesListFolder({
            path: path,
            recursive: false,
            include_media_info: false,
            include_deleted: false,
            include_has_explicit_shared_members: true,
            include_mounted_folders: true
        }).then(function(res){
            callback(res);
        }, function(err){
            console.log(err);
        })
    }

    if(config.dropbox)
        this.dbx = this.initDBX();
}]);