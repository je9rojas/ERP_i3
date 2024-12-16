const addPurchase = async (req, res) => {
  try {
    console.log('Inicio de addPurchase');
    console.log('Datos recibidos:', req.body);

    const db = req.app.locals.db;
    if (!db) throw new Error('No se pudo acceder a la base de datos.');

    const collection = db.collection('purchases');
    if (!collection) throw new Error('No se pudo acceder a la colección purchases.');

    const result = await collection.insertOne(req.body);
    if (!result.insertedId) throw new Error('No se pudo insertar el documento.');

    console.log('Documento insertado con éxito:', result.insertedId);
    res.status(201).json({ message: 'Compra guardada exitosamente', id: result.insertedId });
  } catch (error) {
    console.error('Error detallado:', error.message);
    res.status(500).json({ error: 'Error al guardar la compra', details: error.message });
  }
};

module.exports = { addPurchase };
