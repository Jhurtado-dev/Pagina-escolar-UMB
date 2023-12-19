import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as logoFile from "./img.js";
import { Injectable } from '@angular/core';
import { SessionModel } from 'src/models/session.model';

@Injectable({
  providedIn: 'root'
})


export class ExcelService {
  
  private sessionData: SessionModel = JSON.parse(localStorage.getItem('userCompost'));
  private idPlant = this.sessionData.user.data.id_plant;
  private plant = this.sessionData.user.data.plant;

  constructor() { }
  //xls Sábana
  generateExcel(titleFile: string, headerTable: any[], dataTable: any[]){
    const title = titleFile;
    const header = headerTable;
    const data = dataTable
    const plantName = 'Planta: ' + this.plant + ' (' + this.idPlant + ') ';
    /**
     * Crea Workbook y Worksheet
     */
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte')
    // Add row and formatting
  
    let imageId2 = workbook.addImage({
      base64: logoFile.base64Image,
      extension: 'png',
    });
    worksheet.addImage(imageId2, 'A1:B8');
    worksheet.mergeCells('A1:B8');
    worksheet.getCell('D4').value = title;
    worksheet.getCell('D4').font = { name: 'Verdana', family: 4, size: 16, bold: true};
    worksheet.mergeCells('D4:E4');
    worksheet.getCell('D5').value = plantName;
    worksheet.getCell('D5').font = { name: 'Verdana', family: 4, size: 12, bold: true};
    worksheet.mergeCells('D5:E5');

    worksheet.addRow([])
    let headerRow = worksheet.addRow(header);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF005DAD' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.alignment = {vertical: 'middle', horizontal: 'center'};
      cell.font = {color: {argb: 'FFFFFFFF'}};
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });
    
    // Add Data and Conditional Formatting
    data.forEach(d => {
      let row = worksheet.addRow(d);
      let color = 'FF99FF99';
      let align = {vertical: 'middle', horizontal: 'center'};
    });

    worksheet.columns.forEach(function (column, i) {
      if(i!==0){
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, function (cell) {
          var columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength ) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
      }
    });

    worksheet.addRow([]);
    //Footer Row
    let footerRow = worksheet.addRow(['Grupo Monteblanco.']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF005DAD' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:MB${footerRow.number}`);
    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, title + '.xlsx');
    })
  }
  //xls Reporte semanal cultivo
  generateExcelWeeklyReportCrop(titleFile: string, 
    headerFill: any[], 
    headerIncubation: any[], 
    headerCover: any[], 
    headerSwept: any[],
    headerFirst: any[],
    headerSecond: any[],
    headerThird: any[], 
    dataFill: any[],
    dataIncubation: any[],
    dataCover: any[],
    dataSwept: any[],
    dataFirst: any[],
    dataSecond: any[],
    dataThird: any[]){
    const title = titleFile;
    const hFill = headerFill;
    const hIncubation = headerIncubation;
    const hCover = headerCover;
    const hSwept = headerSwept;
    const hFirst = headerFirst;
    const hSecond = headerSecond;
    const hThird = headerThird;
    const dFill = dataFill;
    const dIncubation = dataIncubation;
    const dCover = dataCover;
    const dSwept = dataSwept;
    const dFirst = dataFirst;
    const dSecond = dataSecond;
    const dThird = dataThird;
    const plantName = 'Planta: ' + this.plant + ' (' + this.idPlant + ') ';

    /**
     * Crea Workbook y Worksheet
     */
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte');
    let imageId2 = workbook.addImage({
      base64: logoFile.base64Image,
      extension: 'png',
    });
    worksheet.addImage(imageId2, 'A1:B8');
    worksheet.mergeCells('A1:B8');
    worksheet.getCell('D4').value = title;
    worksheet.getCell('D4').font = { name: 'Verdana', family: 4, size: 16, bold: true};
    worksheet.mergeCells('D4:O4');
    worksheet.getCell('D5').value = plantName;
    worksheet.getCell('D5').font = { name: 'Verdana', family: 4, size: 12, bold: true};
    worksheet.mergeCells('D5:H5');
 
     worksheet.addRow([])
     let footerRowFill = worksheet.addRow(['Llenado']);
     footerRowFill.getCell(1).fill = {
       type: 'pattern',
       pattern: 'solid',
       fgColor: { argb: 'FF005DAD' },
    };
    footerRowFill.getCell(1).font = {name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' }}
    footerRowFill.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     //Merge Cells
     worksheet.mergeCells(`A${footerRowFill.number}:O${footerRowFill.number}`)
     let headerRow = worksheet.addRow(hFill);
     // Cell Style : Fill and Border
     headerRow.eachCell((cell, number) => {
       cell.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: 'FF005DAD' },
         bgColor: { argb: 'FF0000FF' }
       }
       cell.alignment = {vertical: 'middle', horizontal: 'center'};
       cell.font = {color: {argb: 'FFFFFFFF'}};
       cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     });
     
     // Add Data and Conditional Formatting
     dFill.forEach(d => {
       let row = worksheet.addRow(d);
       let color = 'FF99FF99';
       let align = {vertical: 'middle', horizontal: 'center'};
     });
     worksheet.columns.forEach(function (column, i) {
      if(i!==0){
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, function (cell) {
          var columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength ) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
      }
    });
     
     //Footer Row
     let footerRowIncubation = worksheet.addRow(['Incubación']);
     footerRowIncubation.getCell(1).fill = {
       type: 'pattern',
       pattern: 'solid',

       fgColor: { argb: 'FF005DAD' }
     };
     footerRowIncubation.getCell(1).font = {name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' }}
     footerRowIncubation.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     //Merge Cells
     worksheet.mergeCells(`A${footerRowIncubation.number}:O${footerRowIncubation.number}`);
    
     let headerRowIncubation = worksheet.addRow(hIncubation);
     // Cell Style : Fill and Border
     headerRowIncubation.eachCell((cell, number) => {
       cell.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: 'FF005DAD' },
         bgColor: { argb: 'FF0000FF' }
       }
       cell.alignment = {vertical: 'middle', horizontal: 'center'};
       cell.font = {color: {argb: 'FFFFFFFF'}};
       cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     });
     
     // Add Data and Conditional Formatting
     dIncubation.forEach(d => {
       let row = worksheet.addRow(d);
       let color = 'FF99FF99';
       let align = {vertical: 'middle', horizontal: 'center'};
     });
     worksheet.columns.forEach(function (column, i) {
      if(i!==0){
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, function (cell) {
          var columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength ) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
      }
    });
     

    //Footer Row
    let footerRowCover = worksheet.addRow(['Tapado']);
    footerRowCover.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF005DAD' },
    };
    footerRowCover.getCell(1).font = {name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' }}
    footerRowCover.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     //Merge Cells
     worksheet.mergeCells(`A${footerRowCover.number}:O${footerRowCover.number}`);

     let headerRowCover = worksheet.addRow(hCover);
     // Cell Style : Fill and Border
     headerRowCover.eachCell((cell, number) => {
       cell.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: 'FF005DAD' },
        bgColor: { argb: 'FF0000FF' }
       }
       cell.alignment = {vertical: 'middle', horizontal: 'center'};
       cell.font = {color: {argb: 'FFFFFFFF'}};
       cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     });
     
     // Add Data and Conditional Formatting
     dCover.forEach(d => {
       let row = worksheet.addRow(d);
       let color = 'FF99FF99';
       let align = {vertical: 'middle', horizontal: 'center'};
     });
     worksheet.columns.forEach(function (column, i) {
      if(i!==0){
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, function (cell) {
          var columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength ) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
      }
    });
     
 
     //Footer Row
     let footerRowSwept = worksheet.addRow(['Barrido']);
     footerRowSwept.getCell(1).fill = {
       type: 'pattern',
       pattern: 'solid',
       fgColor: { argb: 'FF005DAD' },
     };
     footerRowSwept.getCell(1).font = {name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' }}
     footerRowSwept.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     //Merge Cells
     worksheet.mergeCells(`A${footerRowSwept.number}:O${footerRowSwept.number}`);

     let headerRowSwept = worksheet.addRow(hSwept);
     // Cell Style : Fill and Border
     headerRowSwept.eachCell((cell, number) => {
       cell.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: 'FF005DAD' },
        bgColor: { argb: 'FF0000FF' }
       }
       cell.alignment = {vertical: 'middle', horizontal: 'center'};
       cell.font = {color: {argb: 'FFFFFFFF'}};
       cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     });
     
     // Add Data and Conditional Formatting
     dSwept.forEach(d => {
       let row = worksheet.addRow(d);
       let color = 'FF99FF99';
       let align = {vertical: 'middle', horizontal: 'center'};
     });
     worksheet.columns.forEach(function (column, i) {
      if(i!==0){
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, function (cell) {
          var columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength ) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
      }
    });

    //Footer Row
    let footerRowFirst = worksheet.addRow(['Corte: Primer brote']);
    footerRowFirst.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF005DAD' },
    };
    footerRowFirst.getCell(1).font = {name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' }}
    footerRowFirst.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     //Merge Cells
     worksheet.mergeCells(`A${footerRowFirst.number}:O${footerRowFirst.number}`);

     let headerRowFirst = worksheet.addRow(hFirst);
     // Cell Style : Fill and Border
     headerRowFirst.eachCell((cell, number) => {
       cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF005DAD' },
        bgColor: { argb: 'FF0000FF' }
       }
       cell.alignment = {vertical: 'middle', horizontal: 'center'};
       cell.font = {color: {argb: 'FFFFFFFF'}};
       cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     });
     
     // Add Data and Conditional Formatting
     dFirst.forEach(d => {
       let row = worksheet.addRow(d);
       let color = 'FF99FF99';
       let align = {vertical: 'middle', horizontal: 'center'};
     });
     worksheet.columns.forEach(function (column, i) {
      if(i!==0){
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, function (cell) {
          var columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength ) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
      }
    });

    //Footer Row
    let footerRowSecond = worksheet.addRow(['Corte: Segundo brote']);
    footerRowSecond.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF005DAD' },
    };
    footerRowSecond.getCell(1).font = {name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' }}
    footerRowSecond.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     //Merge Cells
     worksheet.mergeCells(`A${footerRowSecond.number}:O${footerRowSecond.number}`);

     let headerRowSecond = worksheet.addRow(hSecond);
     // Cell Style : Fill and Border
     headerRowSecond.eachCell((cell, number) => {
       cell.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: 'FF005DAD' },
        bgColor: { argb: 'FF0000FF' }
       }
       cell.alignment = {vertical: 'middle', horizontal: 'center'};
       cell.font = {color: {argb: 'FFFFFFFF'}};
       cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     });
     
     // Add Data and Conditional Formatting
     dSecond.forEach(d => {
       let row = worksheet.addRow(d);
       let color = 'FF99FF99';
       let align = {vertical: 'middle', horizontal: 'center'};
     });
     worksheet.columns.forEach(function (column, i) {
      if(i!==0){
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, function (cell) {
          var columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength ) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
      }
    });

    //Footer Row
    let footerRowThird = worksheet.addRow(['Corte: Tercer brote']);
    footerRowThird.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF005DAD' },
    };
    footerRowThird.getCell(1).font = {name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' }}
    footerRowThird.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     //Merge Cells
     worksheet.mergeCells(`A${footerRowThird.number}:O${footerRowThird.number}`);

     let headerRowThird = worksheet.addRow(hThird);
     // Cell Style : Fill and Border
     headerRowThird.eachCell((cell, number) => {
       cell.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: 'FF005DAD' },
        bgColor: { argb: 'FF0000FF' }
       }
       cell.alignment = {vertical: 'middle', horizontal: 'center'};
       cell.font = {color: {argb: 'FFFFFFFF'}};
       cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     });
     
     // Add Data and Conditional Formatting
     dThird.forEach(d => {
       let row = worksheet.addRow(d);
       let color = 'FF99FF99';
       let align = {vertical: 'middle', horizontal: 'center'};
     });
     worksheet.columns.forEach(function (column, i) {
      if(i!==0){
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, function (cell) {
          var columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength ) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
      }
    });
    
    worksheet.addRow([]);
    
    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, title + '.xlsx');
    })
  }
  
  // xls reportes
  generateExcelReport(titleFile: string, headerTable: any[], dataTable: any[]){
    const title = titleFile;
    const header = headerTable;
    const data = dataTable
    const plantName = 'Planta: ' + this.plant + ' (' + this.idPlant + ') ';

    /**
     * Crea Workbook y Worksheet
     */
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte')
    // Add row and formatting
    
    let imageId2 = workbook.addImage({
      base64: logoFile.base64Image,
      extension: 'png',
    });
    worksheet.addImage(imageId2, 'A1:B8');
    worksheet.mergeCells('A1:B8');
    worksheet.getCell('D4').value = title;
    worksheet.getCell('D4').font = { name: 'Verdana', family: 4, size: 16, bold: true};
    worksheet.mergeCells('D4:E4');
    worksheet.getCell('D5').value = plantName;
    worksheet.getCell('D5').font = { name: 'Verdana', family: 4, size: 12, bold: true};
    worksheet.mergeCells('D5:E5');

    worksheet.addRow([])
    let headerRow = worksheet.addRow(header);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF005DAD' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.alignment = {vertical: 'middle', horizontal: 'center'};
      cell.font = {color: {argb: 'FFFFFFFF'}};
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });
    
    // Add Data and Conditional Formatting
    data.forEach(d => {
      let row = worksheet.addRow(d);
      let color = 'FF99FF99';
      let align = {vertical: 'middle', horizontal: 'center'};
    });

    worksheet.columns.forEach(function (column, i) {
      if(i!==0){
        var maxLength = 0;
        column["eachCell"]({ includeEmpty: true }, function (cell) {
          var columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength ) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
      }
    });

    worksheet.addRow([]);

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, title + '.xlsx');
    })
  }
}