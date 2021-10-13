import { Component, OnInit } from '@angular/core';
import htmlToPdfmake from "html-to-pdfmake"


 import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-my-deshboard',
  templateUrl: './my-deshboard.page.html',
  styleUrls: ['./my-deshboard.page.scss'],
})
export class MyDeshboardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  Download()
  {
    debugger;
    this.downloadPdf();
  }
  downloadPdf()
  {
    var html = htmlToPdfmake(`<table>
  <tr style="height:100px">
    <td style="width:250px">height:100px / width:250px</td>
    <td>height:100px / width:'auto'</td>
  </tr>
  <tr>
    <td style="width:100px">Here it will use 250px for the width because we have to use the largest col's width</td>
    <td style="height:200px">height:200px / width:'auto'</td>
  </tr>
</table>`, {
  tableAutoSize:true
});

var docDefinition = {
  content: [
    html
  ],
  styles:{
    red:{ // we define the class called "red"
      color:'red'
    }
  }
 };
 
 var pdfDocGenerator = pdfMake.createPdf(docDefinition);
//  if(pdfDocGenerator.is('capacitor')){
//   pdfDocGenerator.getBuffer((buffer)=>{
//     var blob=new Blob([buffer],{type: 'application/pdf'});
    

//   })
//  }
pdfDocGenerator.download("abc");


  }

}
