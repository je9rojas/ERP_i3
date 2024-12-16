const { Schema, model } = require('mongoose');

const purchaseSchema = new Schema({
  item: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
});

module.exports = model('Purchase', purchaseSchema);
