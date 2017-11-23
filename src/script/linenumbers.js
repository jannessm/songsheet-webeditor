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

let last_char;

function autocompletion(e) {
    let text = document.getElementById('editor').value;
    let char_pos = $('#editor').prop("selectionStart");
    let key;
    if(window.event) { // IE
        key = e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera
        key = e.which;
    }

    switch(String.fromCharCode(key)){
        case '[':
            text = text.substr(0, char_pos) + ']' + text.substr(char_pos);
            break;
    }
    document.getElementById('editor').value = text;
    $('#editor').prop("selectionStart", char_pos);
    $('#editor').prop("selectionEnd", char_pos);

}