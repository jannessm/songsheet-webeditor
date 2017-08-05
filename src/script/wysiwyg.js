// Simple wysiwyg html generator for 
// @Jannes Magnussons Songsheet library v. 1.0.0
// Requires the generated json object
// Author Nils Rösel

class Wysiwyg {

    constructor(drawLines) {
        this.json;
        this.html = '';
        this.drawLines = drawLines;
    }

    convert(json) {
        this.json = JSON.parse(json).content;


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
        return table;
    }

    generateTableRow(styledStrings) {
        let stringBuilder = '<tr><td>';
        styledStrings.forEach(string => {
            stringBuilder = stringBuilder + string;
        });
        stringBuilder = stringBuilder + '</td><td>  </td><td>  </td></tr>'


    }

    styleString(string, styles) {
        let htmlBuilder = '';
        htmlBuilder = '<span style="' + styles + '">';
        htmlBuilder = htmlBuilder + string + '</span>';
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

