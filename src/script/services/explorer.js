app.service('$explorer', ['$songsheet', function($songsheet){


    // set all explorer vars and get root dir
    this.init = function(path, submit_text){
        if(submit_text)
            this.state = {
                submit: submit_text
            }
        else if(path){
            this.state = {
                submit: path
            }
            path = undefined;
        }
        this.openFile(path);
        this.updated = false;
    }

    this.openFile = function(path){
        let that = this;

        if(!path)
            path = '';

        $songsheet.getFiles(path, function(res){
            that.state = Object.assign(that.state, {
                path: res.path,
                files: res.entries,
                cursor: res.cursor,
                has_more: res.has_more
            });
            that.updated = true;
        });
    }

    this.doubleClick = function(elem, file_type){
        if(file_type === 'folder'){
            let newPath = angular.element(elem).children()[1].textContent;
            this.openFile(newPath);
        }
    }

    this.folderUp = function(){
        this.openFile(this.state.path.replace(/(?:.(?!\\))+$/g, ''));
    }

    this.createFolder = function(name, path){
        if(path.charAt(path.length) !== '/' && name[0] !== '/')
            path += '/';
        $songsheet.dbx.filesCreateFolder({path: path+name, autorename: true})
    }

    this.getState = function(){
        return this.state;
    }

}])