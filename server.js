const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'userdatabase'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Create item
app.post('/api/items', (req, res) => {
    const { username, password, email } = req.body;
    console.log('req.body:', req);
    const insertQuery = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    connection.query(insertQuery, [username, password, email], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        console.log('Data inserted successfully:', result);
        res.send(result);
    });
});

app.post('/api/login', (req, res) =>{
    const {email, password} = req.body;
    console.log('req.body:', req);
    const loginQuery = `SELECT * FROM users WHERE email = ? AND password = ? `;
    // const loginQuery = `SELECT * FROM users WHERE email == ${email} AND password == ${password} `;

    connection.query(loginQuery , [email, password], (err, result) => {
        if (err) {
            console.error('Unable to Login :', err);
            res.status(500).send('Unable To Login, Plase Register');
            return;
        }
        if(result?.length){
            console.log('Login successfully:', result);
            res.status(201).send(result);
            return;
        }else{
            console.log('User Not Found, Plase Register...');
            res.status(401).send(`User Not Found, Plase Register`);
            return;
        }
    })

});

// Read all items
app.get('/api/items', (req, res) => {
    connection.query('SELECT * FROM users', (err, rows) => {
        // if (err) throw err;
        console.log('Get Data successfully:', rows);
        res.send(rows);
    });
});

// Read item by ID
app.get('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    connection.query('SELECT * FROM users WHERE id = ?', [itemId], (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

// Update item by ID
app.put('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const { username, password,email } = req.body;
    const updateQuery = 'UPDATE users SET name = ?, description = ? WHERE id = ?';
    connection.query(updateQuery, [username, password,email, itemId], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Delete item by ID
app.delete('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const deleteQuery = 'DELETE FROM users WHERE id = ?';
    connection.query(deleteQuery, [itemId], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(port, () => console.log(`Node.js server listening on port ${port}`));
