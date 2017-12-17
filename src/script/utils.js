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

document.getElementById('get_file').onclick = function(){
    document.getElementById('file_input').click();
};
function openFile(files){
    document.getElementById('editor').value = '';
    let file = files[0];
    if(!file){
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        let content = e.target.result;
        document.getElementById('editor').value = ""+content;
        document.getElementById('editor').oninput();
    };
    reader.readAsText(file);
}

function save(){
    let text = document.getElementById('editor').value;
    if(text !== ''){
        let title = 'mySong';
        if(/\[(?:.*)title:(.*?)(?:;|\])/g.exec(text.toLowerCase()) !== null)
            title = /\[(?:.*)title:(.*?)(?:;|\])/g.exec(text.toLowerCase())[1];

        let data = new Blob([text], {type: 'text/plain'});
        let link = document.createElement('a');
        link.download = title+'.st';
        link.href = window.URL.createObjectURL(data);
        link.onclick = destroyClickedElement;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
    }
}
function destroyClickedElement(e){
    document.body.removeChild(e.target);
}

function onload(){
    get('/help.html', function(res){
        document.getElementById('help').innerHTML = res;
    });
}

function get(url, callback){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200){
            callback(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function get_json(url, callback){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200){
            callback(JSON.parse(xmlhttp.responseText));
        }else if (xmlhttp.status !== 200){
            callback();
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function post(url, json, callback) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
            console.log(xmlhttp.responseText);
            callback(JSON.parse(xmlhttp.responseText));
        }
        else if (xmlhttp.status !== 200){
            callback();
        }
    };
    xmlhttp.send(JSON.stringify(json));
}