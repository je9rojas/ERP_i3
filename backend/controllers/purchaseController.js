exports.getPurchases = async (req, res) => {
    try {
      const db = req.app.locals.db;
      const purchases = await db.collection('compras').find().toArray();
      res.status(200).json(purchases);
    } catch (error) {
      console.error("Error al obtener las compras:", error);
      res.status(500).json({ error: "Error al obtener las compras" });
    }
  };
  
  exports.createPurchase = async (req, res) => {
    try {
      const db = req.app.locals.db;
      const newPurchase = req.body;
      const result = await db.collection('compras').insertOne(newPurchase);
      res.status(201).json({ id: result.insertedId });
    } catch (error) {
      console.error("Error al insertar la compra:", error);
      res.status(500).json({ error: "Error al insertar la compra" });
    }
  };
  