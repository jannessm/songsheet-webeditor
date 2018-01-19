'use strict';
let cookie = read_cookie();
clearCookie();
setCookie("blub", "blub");

// set up VUEs
let login_vue = new Vue({
    el: '#login',
    data: {
        display: false
    }
});

let set_path_vu = new Vue({
    el: '#set_path',
    data: {
        display: false
    }
});

let browser_vue = new Vue({
    el: '#browser',
    data: {
        display: false,
        songs: {
            display: true,
            data: [
                { title: "How Great", preview: "How Great is our God,...", link: "#test", bpm: "90", artist: "ANKA", books: ["FJ 4 - 100", "FJ 3 - 58"] },
                { title: "How Great", preview: "How Great is our God,...", link: "#test", bpm: "90", artist: "ANKA", books: ["FJ 4 - 100", "FJ 3 - 58"] },
                { title: "How Great", preview: "How Great is our God,...", link: "#test", bpm: "90", artist: "ANKA", books: ["FJ 4 - 100", "FJ 3 - 58"] },
                { title: "How Great", preview: "How Great is our God,...", link: "#test", bpm: "90", artist: "ANKA", books: ["FJ 4 - 100", "FJ 3 - 58"] },
                { title: "How Great", preview: "How Great is our God,...", link: "#test", bpm: "90", artist: "ANKA", books: ["FJ 4 - 100", "FJ 3 - 58"] },
                { title: "How Great", preview: "How Great is our God,...", link: "#test", bpm: "90", artist: "ANKA", books: ["FJ 4 - 100", "FJ 3 - 58"] },
                { title: "How Great", preview: "How Great is our God,...", link: "#test", bpm: "90", artist: "ANKA", books: ["FJ 4 - 100", "FJ 3 - 58"] },
                { title: "How Great", preview: "How Great is our God,...", link: "#test", bpm: "90", artist: "ANKA", books: ["FJ 4 - 100", "FJ 3 - 58"] },
                { title: "How Great", preview: "How Great is our God,...", link: "#test", bpm: "90", artist: "ANKA", books: ["FJ 4 - 100", "FJ 3 - 58"] },
                { title: "How Great", preview: "How Great is our God,...", link: "#test", bpm: "90", artist: "ANKA", books: ["FJ 4 - 100", "FJ 3 - 58"] },
                { title: "How Great", preview: "How Great is our God,...", link: "#test", bpm: "90", artist: "ANKA", books: ["FJ 4 - 100", "FJ 3 - 58"] },
                { title: "How Great", preview: "How Great is our God,...", link: "#test", bpm: "90", artist: "ANKA", books: ["FJ 4 - 100", "FJ 3 - 58"] },
                { title: "How Great", preview: "How Great is our God,...", link: "#test", bpm: "90", artist: "ANKA", books: ["FJ 4 - 100", "FJ 3 - 58"] }
            ]
        },
        events: {
            display: false,
            data: [
                {title: "PfiLa 2018", songs: [ 'our god', 'hosanna'], description: "eine coole veranstaltung"}
            ]
        }
    }
});

let songs_vue = new Vue({

});

// not logged in
if(!cookie.dbx_token){
    login_vue.display = true;

// if cookie exists
}else{
    // no defaultPath is set
    if(!cookie.defaultPath){
        set_path_vu.display = true;

    // user is correctly logged in
    }else{
        browser_vue.display = true;
    }
}

/*let dbx = new Dropbox();
dbx.setClientId("9mjvocts05n4e47");

if(/access_token/g.test(window.location.href)){
    let token = /access_token=(.+?)&/.exec(window.location.href)[1];
    document.cookie="dpx_token="+token;
    dbx.setAccessToken(token);
}
console.log(dbx.usersGetCurrentAccount());

function login(){
    window.open(dbx.getAuthenticationUrl('http://localhost/'), '_self');
}*/

function setCookie(token, defaultPath){
    document.cookie = "dbx_token="+token+";";
    document.cookie = "defaultPath="+defaultPath+";";
}

function clearCookie(){
    document.cookie = "dbx_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "defaultPath=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function read_cookie(){
    let cookie = {};
    let cookie_str = document.cookie.split('; ');
    for(let i in cookie_str){
        let values = /(.+?)=(.+)/g.exec(cookie_str[i]);
        if(values !== null)
            cookie[values[1]] = values[2];
    }
    return cookie;
}

function display(key){
    for(let elem in browser_vue){
        console.log(elem);
        if(browser_vue[elem] && browser_vue[elem].display && elem === key){
            browser_vue[elem].display = true;
        }
        else if(browser_vue[elem] && browser_vue[elem].display){
            console.log(elem, key, elem === key);
            browser_vue[elem].display = false;
        }
    }
}