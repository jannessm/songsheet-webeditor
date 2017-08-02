/**
 * Created by jannes on 24.07.17.
 */

function PreviewManager(){
    this.preview = document.querySelector('#preview');
    this.mm = (this.preview.offsetWidth - 100) / 210;
    console.log(this.preview.offsetWidth, this.mm*210);
    this.addPage();
}

PreviewManager.prototype.addPage = function(){
    var page = document.createElement('div');
    page.style.width = this.mm * 210;
    page.style.height = this.mm * 297;
    page.style.background = '#fff';
    page.style.boxShadow = '0px 0px 5px grey';
    this.preview.appendChild(page);
};
