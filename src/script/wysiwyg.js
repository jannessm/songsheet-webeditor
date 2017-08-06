// Simple wysiwyg html generator for 
// @Jannes Magnussons Songsheet library v. 1.0.0
// Requires the generated json object
// Author Nils Rösel

class Wysiwyg {

    constructor(drawLines) {
        this.drawLines = drawLines;
    }

    convert(json) {
        let html = '';
        console.log(json[0]);
        let _content = json[0].content;
        if (typeof _content === 'undefined') {
            throw new Error('Json Content is Undefined')
        } else {
            // For each table
            _content.forEach(_object => {
                // Read the body attribute (also array)->indices are lines
                let rows = new Array(_object.table.body.length);
                let i = 0;
                _object.table.body.forEach(_lineObject => {
                    // Now generate spans for the substrings
                    let lineString = '';
                    _lineObject.forEach(_stringObject => {
                        let stylings = '';
                        stylings = this.createStyling(_stringObject.italic,
                            _stringObject.bold, _stringObject.color,
                            _stringObject.fontSize, _stringObject.lineHeight);
                        let text = this.setHtmlWhiteSpaces(_stringObject.text);
                        let spanElement = this.styleString(text, stylings);
                        lineString = lineString + spanElement;
                    });
                    rows[i] = this.generateTableRow(lineString);
                    i++;
                });
                html = html + this.generateTable(rows);
            });
        }
        return html;
    }

    generateTable(stringRowArray) {
        let table = '';
        if (this.drawLines === true) {
            table = '<table class="draw-lines"><tbody>';
        }
        else {
            table = '<table><tbody>';
        }
        stringRowArray.forEach(rowString => {
            table = table + rowString;
        });
        table = table + '</tbody></table>';
        return table;
    }

    generateTableRow(styledString) {
        let stringBuilder = '';
        stringBuilder = '<tr><td>';
        stringBuilder = stringBuilder + styledString;
        if (this.drawLines === true) {
            stringBuilder = stringBuilder + `</td><td class="draw-lines"><tab></td>
                            <td><tab></td></tr>`

        }
        else {
            stringBuilder = stringBuilder + '</td><td><tab></td><td><tab></td></tr>'
        }


        return stringBuilder;
    }

    styleString(string, styles) {
        let htmlBuilder = '';
        htmlBuilder = '<span style="' + styles + '">';
        htmlBuilder = htmlBuilder + string + '</span>';
        return htmlBuilder;
    }

    createStyling(isItalic, isBold, color, fontSize, lineHeight) {
        let stringBuilder = '';
        if (isItalic === true) {
            stringBuilder = stringBuilder + 'font-style:italic;';
        }
        if (isBold === true) {
            stringBuilder = stringBuilder + 'font-weight: bold;';
        }
        if (typeof color !== 'undefined') {
            stringBuilder = stringBuilder + 'color:' + color + ';';
        }
        if (typeof fontSize === 'number') {
            stringBuilder = stringBuilder + 'font-size:' + fontSize + ';';
        }
        if (typeof lineHeight === 'number') {
            stringBuilder = stringBuilder + 'line-height:' + lineHeight + ';';
        }
        return stringBuilder;
    }

    setHtmlWhiteSpaces(string) {
        let whiteSpace = '&nbsp;';
        return string.replace(/\s/g, whiteSpace);
    }





}

