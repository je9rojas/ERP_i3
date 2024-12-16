const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');
const dotenv = require('dotenv'); // Importa dotenv

// Cargar las variables de entorno desde .env
dotenv.config();

const purchaseRoutes = require('./routes/purchases');

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de MongoDB Atlas desde .env
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("La variable MONGODB_URI no está definida en el archivo .env");
  process.exit(1);
}

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

    // Lista las bases de datos y colecciones para confirmar conexión
    const databases = await client.db().admin().listDatabases();
    console.log('Bases de datos disponibles:', databases.databases);

    const db = client.db('ERP_i3');
    const collections = await db.listCollections().toArray();
    console.log('Colecciones disponibles en ERP_i3:', collections.map(c => c.name));
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    process.exit(1);
  }
}

connectToDatabase();
app.locals.db = client.db("ERP_i3"); // Acceso global a la base de datos

// Configurar directorio de archivos estáticos
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// Rutas del API
app.use('/api/compras', purchaseRoutes);

// Ruta principal para el frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Iniciar el servidor desde la variable de entorno
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
