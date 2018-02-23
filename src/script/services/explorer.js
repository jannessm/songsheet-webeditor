app.service('$explorer', ['$songsheet', function($songsheet){
    let that = this;

    // set all explorer vars and get root dir
    this.init = function(path){
        if(!path)
            path = '';

        $songsheet.getFiles(path, function(res){
            that.explorer = {
                path: res.path,
                files: res.entries,
                cursor: res.cursor,
                has_more: res.has_more,
                submit: 'Öffnen'
            }
        });
    }

    this.openFile = function(path){
        
    }
}])