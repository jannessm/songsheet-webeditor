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
    '=': '&#x3D;'
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
        regex: /((\[.*:)(.*)(\])|(\[)(.*)(\]))/g,
        replace: function (match, p1, p2, p3, p4, p5, p6, p7){
            if(p4 !== undefined) {
                return '<span style="color: grey">' + p2 + '</span>' +
                    '<span style="color: darkorange">' + p3 + '</span>' +
                    '<span style="color: grey">' + p4 + '</span>';
            }else
                return '<span style="color: grey">' + p5 + '</span>' +
                    '<span style="color: darkorange">' + p6 + '</span>' +
                    '<span style="color: grey">' + p7 + '</span>';
        }
    }
};

function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}