// Simple wysiwyg html generator for 
// @Jannes Magnussons Songsheet library v. 1.0.0
// Requires the generated json object
// Author Nils Rösel

class Wysiwyg {

    constructor(drawLines) {
        this.html = '';
        this.drawLines = drawLines;
    }

    convert(json) {
        let _content = json.content;
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

                        let spanElement = this.styleString(_stringObject.text, stylings);
                        lineString = lineString + spanElement;
                    });
                    rows[i] = this.generateTableRow(lineString);
                    i++;
                });
                this.html = this.html + this.generateTable(rows);
                console.log(this.html)
            });
        }

    }

    show(innerHtml) {
        innerHtml = this.html;
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
        console.log(table);
        return table;
    }

    generateTableRow(styledString) {
        let stringBuilder = '<tr><td>';
        stringBuilder = stringBuilder + styledString;
        stringBuilder = stringBuilder + '</td><td>  </td><td>  </td></tr>'
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





}

