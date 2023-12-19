import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as JsBarcode from 'jsbarcode';
import * as logoFile from "./img.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  
  generatePdf(data: any, planta: string, travel: number, factura: string, placas: string): void {
    try {
      const barcodeValue = data.code; // Asegúrate de obtener el valor correcto para el código de barras

      // Convertir la imagen a un formato de datos URI
    
      // Generar código de barras usando jsbarcode
      const canvas = document.createElement('canvas');
      JsBarcode(canvas, barcodeValue, { format: 'CODE128' });
      const barcodeUrl = canvas.toDataURL('image/png');

      const documentDefinition = {
        content: [
          {
            image: logoFile.base64Image, // Utiliza el formato de datos URI
            width: 100, // Ancho de la imagen en puntos
            height: 100 // Alto de la imagen en puntos
          },
          { text: 'HONGOS DE MÉXICO, S.A. DE C.V.', style: 'header' },
          { text: 'VALE DE RECEPCIÓN Y ENTREGA DE CHAMPIÑÓN', style: 'subheader' },
          {
            style: 'tableExample',
            table: {
              widths: ['auto', '*'],
              body: [
                ['FECHA:', data.date_cut],
                ['PAPELETA:', data.code],
                ['Planta:', data.plant],
                ['Código 2:', data.quality_nce],
                ['Número de cajas 2:', data.boxes_nce],
                ['Peso neto 2:', data.net_weight_nce],
                ['Tara:', data.tara_boxes],
                ['Peso bruto:', data.total_weight_nce],
                ['Unidad:', data.unit],
                ['Peso prom. CJ:', data.tara_boxes / data.net_weight_nce],
              ]
            }
          },
          { text: 'Código de Barras:', style: 'subheader' },
          {
            image: barcodeUrl, // Utiliza la imagen del código de barras generada
            width: 150, // Ancho del código de barras en puntos
            height: 20, // Alto del código de barras en puntos
            margin: [0, 5, 0, 0]
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 0, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          }
        }
      };

      pdfMake.createPdf(documentDefinition).open();
    } catch (error) {
      console.log(error);
    }
  }
}
