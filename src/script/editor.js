class Editor{

    constructor(dom_elem){
        this.input_area = dom_elem;
        let old_oninput = dom_elem.oninput ? dom_elem.oninput : function(){};
        let old_onkeypress = dom_elem.onkeypress ? dom_elem.onkeypress : function(){};
        let old_onkeydown = dom_elem.onkeydown ? dom_elem.onkeydown : function(){};
        let old_onkeyup = dom_elem.onkeyup ? dom_elem.onkeyup : function(){};

        dom_elem.oninput = function(e){Editor.oninput(); old_oninput(e);};
        dom_elem.onkeypress = function(e){Editor.onkeypress(e); old_onkeypress(e);};
        dom_elem.onkeydown = function(e){Editor.onkeydown(e); old_onkeydown(e);};
        dom_elem.onkeyup = function(e){Editor.onkeyup(e); old_onkeyup(e)};

        let line_numbers = document.createElement('div');
        line_numbers.id = 'line-numbers';
        line_numbers.className = "font_style";
        line_numbers.innerText = 1;
        dom_elem.parentNode.insertBefore(line_numbers, dom_elem.parentNode.childNodes[0]);

        let highlighting_field = document.createElement('div');
        highlighting_field.id = "highlighting_field";
        highlighting_field.className = "font_style editor";
        highlighting_field.contentEditable = true;
        dom_elem.parentNode.insertBefore(highlighting_field, dom_elem.parentNode.childNodes[0]);

        dom_elem.oninput();
    }

    get_input(){
        return this.input_area.value;
    }

    static oninput(){
        update_line_numbers();
        copy_text_to_highlighting_area();
    }

    static onkeypress(e){
        autocompletion(e);
        copy_text_to_highlighting_area();
    }

    static onkeydown(e){
        backspace(e);
    }

    static onkeyup(e){
        if(e.keyCode === 17 || e.keyCode === 91 || e.keyCode === 224)
            ctrl = false;
    }
}


function update_line_numbers() {
    let text = document.getElementById('editor').value;
    let lines = '';
    let i = 1;
    for (let line in text.split('\n')) {
        lines +=  i + '<br>';
        i += 1;
    }
    document.getElementById('line-numbers').innerHTML = lines;

    // resize textarea
    min_height = (document.getElementsByClassName('section--editor'))[0].style.minHeight;
    line_height = 18;
    new_height = min_height < i*line_height ? i*line_height : min_height;
    document.getElementById('editor').style.height = new_height+'px';
}

let ctrl = false;
let do_autocompletion = true;

function autocompletion(e) {
    if(do_autocompletion){
        let text = document.getElementById('editor').value;
        let char_pos = document.getElementById('editor').selectionStart;
        let key;
        let insert = '';
        if(window.event) { // IE
            key = e.keyCode;
        } else if(e.which){ // Netscape/Firefox/Opera
            key = e.which;
        }

        switch(String.fromCharCode(key)){
            case '[':
                if (text.substr(char_pos,1) !== ']' || count_before(text, '[', char_pos) === count_after(text, ']', char_pos))
                    insert = ']';
                break;
            case '*':
                if (text.substr(char_pos,1) !== '*' || count_before(text, '*', char_pos) === count_after(text, '*', char_pos))
                    insert = '*';
                break;
        }

        document.getElementById('editor').value = text.substr(0, char_pos) + insert + text.substr(char_pos);
        document.getElementById('editor').selectionStart = char_pos;
        document.getElementById('editor').selectionEnd = char_pos;
    }
}

function backspace(e){

    do_autocompletion = false;

    //if ctrl was pressed and not released do nothing
    if(e.keyCode === 17 || e.keyCode === 91 || e.keyCode === 224){
      ctrl = true;
      return;
    }

    let text = document.getElementById('editor').value;
    let char_pos = document.getElementById('editor').selectionStart;
    let char_pos_end = document.getElementById('editor').selectionEnd;

    //if ctrl+c is pressed copy to clipboard
    if(ctrl && (e.keyCode || e.charCode) === 67){
        document.execCommand("Copy");
        return;
    }

    //if arrows are pressed prevent deletion
    if((e.keyCode || e.charCode) >= 37 && (e.keyCode || e.charCode) <= 40 )
        return;


    //enable tab
    if((e.keyCode || e.charCode) === 9){
        e.preventDefault();
        // set textarea value to: text before caret + tab + text after caret
        document.getElementById('editor').value = text.substr(0, char_pos) + "    " + text.substr(char_pos_end);
        // put caret at right position again
        document.getElementById('editor').selectionStart =
            document.getElementById('editor').selectionEnd = char_pos + 4;

        copy_text_to_highlighting_area();
        return;
    }

    // if backspace was pressed delete '[' or '*' if they are doubled like and space is in between [|] or *|*
    if((e.keyCode || e.charCode) === 8 && document.getElementById('editor').selectionStart === document.getElementById('editor').selectionEnd){

        let remove = 0;

        switch(text.charAt(char_pos - 1)){
            case '[':
                if (text.charAt(char_pos) === ']')
                    remove = 1;
                break;
            case '*':
                if (text.charAt(char_pos) === '*')
                    remove = 1;
                break;
        }

        document.getElementById('editor').value = text.substr(0, char_pos) + text.substr(char_pos+remove);
        document.getElementById('editor').selectionStart = char_pos;
        document.getElementById('editor').selectionEnd = char_pos;

    // if area is selected and shall be deleted
    }else if((e.keyCode || e.charCode) === 8){
        // left one letter for deletion after keydown
        document.getElementById('editor').value = text.substr(0, char_pos+1) + text.substr(char_pos_end);
        document.getElementById('editor').selectionStart = char_pos+1;
        document.getElementById('editor').selectionEnd = char_pos+1;

    // if area is selected and shall be replaced
    }else if(!ctrl){
        do_autocompletion = true;
        document.getElementById('editor').value = text.substr(0, char_pos) + text.substr(char_pos_end);
        document.getElementById('editor').selectionStart = char_pos;
        document.getElementById('editor').selectionEnd = char_pos;
    }
}

function copy_text_to_highlighting_area(){
    let text = '<span>'+escapeHtml(document.getElementById('editor').value)+'</span>';

    for(let i in syntax){
        text = text.replace(syntax[i].regex, syntax[i].replace);
    }
    document.getElementById('highlighting_field').innerHTML = text;
}

function count_before(string, symbol, select_pos){
    let i = 0;
    for( ; string.charAt(select_pos - i - 1) === symbol; i++){ }
    return i;
}
function count_after(string, symbol, select_pos){
    let i = 0;
    for( ; string.charAt(select_pos + i) === symbol; i++){ }
    return i;
}

let entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
    '|': '&#124;'
};

let syntax = {
    bold_italic: {
        regex: /(\*{1}(?!\*)[^\*\n]*\*{1}|\*{2}(?!\*)[^\*\n]*\*{2}|\*{3}(?!\*)[^\*\n]*\*{3})/g,
        replace: function(match){
            if(/\*{1}(?!\*)[^\*\n]*\*{1}/g.test(match) &&
                !/\*{2}(?!\*)[^\*\n]*\*{2}/g.test(match) &&
                !/\*{3}(?!\*)[^\*\n]*\*{3}/g.test(match)){
                return '<i>'+match+'</i>';
            }else if(/\*{2}(?!\*)[^\*\n]*\*{2}/g.test(match) &&
                !/\*{3}(?!\*)[^\*\n]*\*{3}/g.test(match)){
                return '<b>'+match+'</b>';
            }else {
                return '<b><i>'+match+'</i></b>';
            }
        }
    },
    red: {
        regex: /&lt;r&gt;.*&lt;r&gt;/g,
        replace: '<span style="color: red">$&</span>'
    },
    blue: {
        regex: /&lt;b&gt;.*&lt;b&gt;/g,
        replace: '<span style="color: blue">$&</span>'
    },
    green: {
        regex: /&lt;g&gt;.*&lt;g&gt;/g,
        replace: '<span style="color: green">$&</span>'
    },
    blocks: {
        regex: /(\[)(.*?)(\])/g,
        replace: function (match){
            let out = '<span style="color: grey">';
            for(let char in match){
                char = match.charAt(char);

                // if match has :
                if(match.indexOf(':') > 0){
                    if(char === ';' || char === ']'){
                        out += '</span><span style="color: grey">';
                    }
                    out += char;
                    // change color
                    switch(char){
                        case ']':
                            out += '</span>';
                            break;
                        case ':':
                            out += '</span><span style="color: darkorange">';
                            break;
                    }
                }else{
                    if(char === '[')
                        out += char + '</span><span style="color: darkorange">';
                    else if(char === ']')
                        out += '</span><span style="color: grey">'+char+'</span>';
                    else
                        out += char;
                }
            }
            return out;
        }
    }
};

function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/|]/g, function (s) {
        return entityMap[s];
    });
}