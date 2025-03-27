const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generarFactura(venta, cliente, producto) {
  const doc = new PDFDocument();

  // Definimos la ruta donde se guardará el PDF
  const nombreArchivo = `factura_venta_${venta.id}.pdf`;
  const rutaArchivo = path.join(__dirname, '..', 'facturas', nombreArchivo);


  // Creamos el directorio 'facturas' si no existe
  if (!fs.existsSync(path.join(__dirname, '..', 'facturas'))) {
    fs.mkdirSync(path.join(__dirname, '..', 'facturas'));
  }

  const stream = fs.createWriteStream(rutaArchivo);
  doc.pipe(stream);

  // ENCABEZADO
  doc
    .fontSize(20)
    .text('Bulldog Tire - Factura de Venta', { align: 'center' })
    .moveDown(1);

  // INFORMACIÓN DEL CLIENTE
  doc
    .fontSize(12)
    .text(`Cliente: ${cliente.nombre}`)
    .text(`Correo: ${cliente.email}`)
    .text(`Fecha: ${venta.fecha}`)
    .moveDown(1);

  // DETALLE DEL PRODUCTO
  doc
    .fontSize(12)
    .text(`Producto: ${producto.nombre}`)
    .text(`Descripción: ${producto.descripcion}`)
    .text(`Cantidad: ${venta.cantidad}`)
    .text(`Precio Unitario: $${producto.precio}`)
    .text(`Total: $${venta.total}`)
    .text(`Método de Pago: ${venta.metodo_pago}`)
    .moveDown(2);

  // PIE DE PÁGINA
  doc
    .fontSize(10)
    .text('Gracias por su compra en Bulldog Tire', { align: 'center' });

  doc.end();

  // Retornar el nombre del archivo y ruta para luego descargar si se desea
  return { nombreArchivo, rutaArchivo };
}

module.exports = { generarFactura };
