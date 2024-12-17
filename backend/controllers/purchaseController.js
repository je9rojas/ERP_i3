const addPurchase = async (req, res) => {
  try {
    console.log('Inicio de addPurchase');
    console.log('Datos recibidos:', req.body);

    const db = req.app.locals.db;
    if (!db) throw new Error('No se pudo acceder a la base de datos.');

    const collection = db.collection('purchases');

    const { code, productType, quantity, price, purchaseDate } = req.body;

    // Validación básica
    if (!code || !productType || !quantity || !price || !purchaseDate) {
      return res.status(400).json({ error: "Faltan campos obligatorios." });
    }

    const purchase = {
      code,
      productType,
      quantity,
      price,
      purchaseDate: new Date(purchaseDate), // Convertir a tipo Date
      date: new Date()
    };

    const result = await collection.insertOne(purchase);

    if (!result.insertedId) throw new Error('No se pudo insertar el documento.');

    console.log('Documento insertado con éxito:', result.insertedId);
    res.status(201).json({ message: 'Compra guardada exitosamente', id: result.insertedId });
  } catch (error) {
    console.error('Error detallado:', error.message);
    res.status(500).json({ error: 'Error al guardar la compra', details: error.message });
  }
};

module.exports = { addPurchase };
