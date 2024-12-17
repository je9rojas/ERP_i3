const { Schema, model } = require('mongoose');

const purchaseSchema = new Schema({
  code: { type: String, required: true },          // Código del producto
  productType: { type: String, required: true },   // Tipo de producto
  brand: { type: String, required: true },
  quantity: { type: Number, required: true },      // Cantidad del producto
  price: { type: Number, required: true },         // Precio del producto
  purchaseDate: { type: Date, required: true },    // Fecha de compra
  date: { type: Date, default: Date.now }          // Fecha actual por defecto
});

module.exports = model('Purchase', purchaseSchema);
