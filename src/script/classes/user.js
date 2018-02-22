class User{

    constructor($cookies, cookie){
        if(cookie){
            this.token = cookie.token,
            this.defaultPath = cookie.defaultPath
        }

        this.$cookies = $cookies;
        this.name = {
            firstname: undefined,
            lastname: undefined,
        };
        this.account_id = undefined;
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
        this.$cookies.putObject('songsheet_user', {
            token: this.token,
            defaultPath: this.defaultPath
        });
    }

    setUserInfo(dbxAccount){
        let that = this;
        dbxAccount.then(function(account){
            that.name.firstname = account.name.given_name;
            that.name.lastname = account.name.surname;
            that.account_id = account.account_id;
            that._updateCookie();
        });
    }
}