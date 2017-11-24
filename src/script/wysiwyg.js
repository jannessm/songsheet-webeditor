// Simple wysiwyg html generator for 
// @Jannes Magnussons Songsheet library v. 1.3.2
// Requires the generated json object
// Author Nils Rösel, Jannes Magnusson

class Wysiwyg {

    constructor(drawLines) {
        this.drawLines = drawLines;
        this.border_string = '1.5px solid black';
        this.resolution = document.getElementById('previewRenderer').offsetWidth / 210 / 2.5; // divided by page width and convert to pt (1px = 1pt in pdf)
    }

    convert(json) {
        let html = '';
        let _content = json[0].content;

        if (typeof _content === 'undefined') {
            throw new Error('Json Content is Undefined')
        } else {
            // For each table
            _content.forEach(_table => {
                html += this.parseTable(_table.table);
            /*    // Read the body attribute (also array)->indices are lines
                let rows = new Array(_object.table.body.length);
                let i = 0;
                console.log(_object.table)
                _object.table.body.forEach(_lineObject => {
                    let lineString = '<tr>'; //start row
                    _lineObject.forEach(_columns => {
                        let column_style = '';
                        let column_content = '';
                        for(let prop in _columns){
                            switch(prop){
                                case 'columns':
                                    let res = this.parseColumns(_columns.columns);
                                    column_content += res[0];
                                    column_style += res[1];
                                    break;
                                case 'border':
                                    column_borders = this.parseBorder(_columns.border);
                            }
                        }

                        lineString += this.createRow(column_content, column_style);
                    });
                    lineString += '</tr>'; //end row
                    console.log(lineString);
                    rows[i] = this.generateTableRow(lineString);
                    i++;
                });
                html = html + this.generateTable(rows);*/
            });
        }
        return html;
    }

    parseTable(table){
        let widths = table.widths ||['*'];
        let table_content = '<table>';
        table.body.forEach(row => {
            table_content += this.parseRow(row, widths);
        });

        return table_content+'</table>';
    }

    parseRow(row, widths){
        let row_content = '<tr>';
        for(let i in row){
            row_content += this.parseColumn(row[i], widths[i]);
        }
        return row_content + '</tr>';
    }

    parseColumn(column, width){
        let column_content = '';
        let style = width !== '*' ? 'width: '+(width * this.resolution)+'px' : '';

        for(let prop in column){
            switch(prop){
                case 'columns':
                    column_content = this.parseColumnType(column.columns);
                    break;
                case 'border':
                    style += this.parseBorder(column.border);
            }
        }
        return '<td style="'+style+'">'+column_content+'</td>';
    }

    parseColumnType(columns){
        let content = '';
        for(let i in columns){
            let column = columns[i];
            if (column.text){
                let stylings = '';
                console.log(column);
                stylings = this.createStyling(column);
                let text = this.setHtmlWhiteSpaces(column.text);
                content += this.createSpan(text, stylings);
            }else if (column.image){
                content += this.imageString(column.image, column.width);
            }
        }
        return content;
    }

    parseBorder(border){
        let borderString = '';
        for(let id in border){
            if(border[id]){
                let direction = '';
                switch (id){
                    case '0':
                        direction = '-left';
                        break;
                    case '1':
                        direction = '-top';
                        break;
                    case '2':
                        direction = '-right';
                        break;
                    case '3':
                        direction = '-bottom';
                        break;
                }
                borderString += 'border'+direction+':'+this.border_string+';';
            }
        }
        return borderString
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

    createRow(content, styles){
        return '<td style="'+styles+'">'+content+'</td>';
    }

    createSpan(content, styles) {
        return '<span style="' + styles + '">' + content + '</span>';
    }

    createStyling(column) {
        let stringBuilder = '';
        if (column.isItalic === true) {
            stringBuilder = stringBuilder + 'font-style:italic;';
        }
        if (column.isBold === true) {
            stringBuilder = stringBuilder + 'font-weight: bold;';
        }
        if (typeof column.color !== 'undefined') {
            stringBuilder = stringBuilder + 'color:' + column.color + ';';
        }
        if (typeof column.fontSize === 'number') {
            stringBuilder = stringBuilder + 'font-size:' + (column.fontSize * this.resolution) + 'px;';
        }
        if (typeof column.lineHeight === 'number') {
            stringBuilder = stringBuilder + 'line-height:' + (column.lineHeight) + ';';
        }
        if (column.margin !== undefined){
            //stringBuilder += 'margin:'+column.margin[1]+'px '+column.margin[0]+'px;'; //TODO not working yet
        }
        return stringBuilder;
    }

    imageString(source, width){
        return '<img src="'+source+'" width="'+width+'">';
    }

    setHtmlWhiteSpaces(string) {
        let whiteSpace = '&nbsp;';
        return string.replace(/\s/g, whiteSpace);
    }



}

