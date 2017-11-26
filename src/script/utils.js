function toggle_help(){
    if(document.getElementById('help').style.opacity === '0'){
        document.getElementById('help').style.opacity = '1';
        document.getElementById('previewRenderer').style.filter = 'blur(10px)';
        document.getElementById('previewRenderer').style.position = 'fixed';
    }else{
       document.getElementById('help').style.opacity = '0';
        document.getElementById('previewRenderer').style.filter = 'none';
        document.getElementById('previewRenderer').style.position = 'relative';
    }

}