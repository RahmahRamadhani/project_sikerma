const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api'); // Impor rute

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', apiRoutes); // Menggunakan rute

app.get('/', (req, res) => {
  res.send('API untuk Sistem Informasi Kerjasama');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
