const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const saltRounds = 10;

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser for URL-encoded bodies
app.use(session({
    key: 'userId',
    secret: 'atanu',
    resave: false,
    saveUninitialized: false,
}));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'ringo',
    password: '12345',
    database: 'login_react'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/', (req, res) => {
    res.send('hi');
});

app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        const data = {
            email: email,
            password: hash,
        };
        if (err) {
            console.log(err);
        } else {
            let sql = `SELECT * FROM users WHERE email='${email}'`;
            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    if (result.length > 0) {
                        res.send({ msg: 'User Email Already Present' });
                    } else {
                        let sql = 'INSERT INTO users SET ?';
                        db.query(sql, data, (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.send(result);
                            }
                        });
                    }
                }
            });
        }
    });
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let sql = `SELECT * FROM users WHERE email='${email}'`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if (response) {
                        req.session.user = result;
                        res.send({ login: true, useremail: email });
                    } else {
                        res.send({ login: false, msg: 'Wrong Password' });
                    }
                });
            } else {
                res.send({ login: false, msg: 'User Email Not Exists' });
            }
        }
    });
});

app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({ login: true, user: req.session.user });
    } else {
        res.send({ login: false });
    }
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
