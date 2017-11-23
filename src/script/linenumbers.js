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

function autocompletion(e) {
    let text = document.getElementById('editor').value;
    let char_pos = $('#editor').prop("selectionStart");
    let key;
    let insert = '';
    if(window.event) { // IE
        key = e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera
        key = e.which;
    }
/* TODO  needs solution for multiple succeding [] like [[[]][]]
TODO letter-width has to be adjusted for layers...
    switch(String.fromCharCode(key)){
        case '[':
            if (text.substr(char_pos,1) !== ']' || text.substr(char_pos-1,2) === '[]')
                insert = ']';
            break;
        case '*':
            if (text.substr(char_pos,1) !== '*' || text.substr(char_pos-1,2) === '**')
                insert = '*';
            break;
    }
*/
    document.getElementById('editor').value = text.substr(0, char_pos) + insert + text.substr(char_pos);
    $('#editor').prop("selectionStart", char_pos);
    $('#editor').prop("selectionEnd", char_pos);
}

function copy_text_to_highlighting_area(){
    let text = '<span>'+escapeHtml(document.getElementById('editor').value)+'</span>';

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
    };

    for(let i in syntax){
        text = text.replace(syntax[i].regex, syntax[i].replace);
    }
    document.getElementById('highlighting_field').innerHTML = text;
}

let entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}