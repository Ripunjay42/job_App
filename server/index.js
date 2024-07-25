const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(cors());


dotenv.config();

const db = mysql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

// Middleware
app.use(bodyParser.json());

// Register endpoint
app.post('/signup', (req, res) => {

  const { username, name, email, password } = req.body;

  const sql = `INSERT INTO USER (username, name, email, password) VALUES (?, ?, ?, ?)`;
  const values = [username, name, email, password];
  console.log('Registering user:', values);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    console.log('User registered:', result);
    res.status(200).json({ message: 'User registered successfully' });
  });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM USER WHERE username = '${username}' AND password = '${password}'`;

    db.query(query, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.json({ success: true });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });




  app.post('/addjob', (req, res) => {
    const { title, description, company } = req.body;
  
    if (!title || !description || !company) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const sql = 'INSERT INTO jobs (title, description, company) VALUES (?, ?, ?)';
    const values = [title, description, company];
    console.log('Adding job:', values);
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding job:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      console.log('Job added:', result);
      res.status(200).json({ message: 'Job added successfully', jobId: result.insertId });
    });
  });


  app.get('/jobs', (req, res) => {
    const sql = 'SELECT * FROM jobs';
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(200).json(results);
    });
  });


app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
  });