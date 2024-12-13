const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');
const purchaseRoutes = require('./routes/purchases');

// Configuración del servidor
const app = express();
app.use(express.json());
app.use(cors());

// Configuración de MongoDB Atlas
const uri = "mongodb+srv://erp_user:G5EzQRLCqIy2JvSH@clustererp.j2dmr.mongodb.net/ERP_i3?retryWrites=true&w=majority&appName=ClusterERP";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Conectado exitosamente a MongoDB!");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    process.exit(1);
  }
}

connectToDatabase();
app.locals.db = client.db("ERP_i3"); // Accesible globalmente en los controladores

// Configurar directorio de archivos estáticos
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// Rutas del API
app.use('/api/compras', purchaseRoutes);

// Ruta para manejar otras solicitudes (por ejemplo, acceso directo a la raíz)
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});













/*

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const purchaseRoutes = require('./routes/purchases');

// Configuración del servidor
const app = express();
app.use(express.json());
app.use(cors());

// Configuración de MongoDB Atlas
const uri = "mongodb+srv://erp_user:G5EzQRLCqIy2JvSH@clustererp.j2dmr.mongodb.net/ERP_i3?retryWrites=true&w=majority&appName=ClusterERP";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Conectado exitosamente a MongoDB!");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    process.exit(1);
  }
}

connectToDatabase();
app.locals.db = client.db("ERP_i3"); // Accesible globalmente en los controladores

// Rutas
app.use('/api/compras', purchaseRoutes);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
*/