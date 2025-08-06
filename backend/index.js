const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 2500;

// Middleware
app.use(cors());
app.use(express.json());  
app.use('/uploads', express.static('uploads'));

// Koneksi DB
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // sesuaikan
  database: 'galeri_db'
});

// Upload folder
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }   
});
const upload = multer({ storage });

// Get semua galeri
app.get('/galeri', (req, res) => {
  db.query('SELECT * FROM galeri ORDER BY created_at DESC', (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Upload gambar
app.post('/galeri', upload.single('gambar'), (req, res) => {
  const gambar = req.file?.path;
  const judul = req.body.judul;
  const deskripsi = req.body.deskripsi;

  db.query('INSERT INTO galeri (gambar, judul, deskripsi) VALUES (?, ?, ?)', [gambar, judul, deskripsi], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Upload berhasil' });
  });
});

// Edit galeri
// Edit galeri
app.put('/galeri/:id', upload.single('gambar'), (req, res) => {
  const { id } = req.params;
  const judul = req.body.judul;
  const deskripsi = req.body.deskripsi;

  if (req.file) {
    const gambar = req.file.path;
    db.query(
      'UPDATE galeri SET gambar = ?, judul = ?, deskripsi = ? WHERE id = ?',
      [gambar, judul, deskripsi, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Update berhasil' });
      }
    );
  } else {
    db.query(
      'UPDATE galeri SET judul = ?, deskripsi = ? WHERE id = ?',
      [judul, deskripsi, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Update berhasil' });
      }
    );
  }
});


// Hapus galeri
app.delete('/galeri/:id', (req, res) => {
  const { id } = req.params;

  db.query('SELECT gambar FROM galeri WHERE id = ?', [id], (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ error: 'Data tidak ditemukan' });

    const filePath = result[0].gambar;
    fs.unlink(filePath, (err) => {
      if (err) console.warn('File tidak ditemukan:', filePath);
    });

    db.query('DELETE FROM galeri WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Berhasil dihapus' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
