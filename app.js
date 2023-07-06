const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const session = require("express-session");

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname)));
app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: false
}));


app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, 'login.html'));
});


app.post('/signup', async function(req, res) {
    try {
        var users = [];
        var usersData = fs.readFileSync("users.json", 'utf8');
        if (usersData) {
            users = JSON.parse(usersData);
        }

        var name = req.body.username2;
        var email = req.body.email2;
        var ok = 1;

        for (let i = 0; i < users.length; i ++) {
            if (users[i].name == name) {
                res.send("Username already taken");
                ok = 0;
            }
            if (users[i].email == email) {
                res.send("Email already taken");
                ok = 0;
            }
        }

        if (ok) {
            users.push({
                id: Date.now().toString(),
                name: req.body.username2,
                email: req.body.email2,
                password: req.body.password2
            });

            fs.writeFileSync("users.json", JSON.stringify(users));

            res.redirect('/login');
        }
        else {
            res.redirect('/signup');
        }
    } 
    catch (error) {
        console.log("error:", error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/login', async function(req, res) {
    var users = JSON.parse(fs.readFileSync("users.json"));
    var name = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var ok = 0;
    
    console.log(name);
    console.log(email);
    console.log(password);

    for (let i = 0; i < users.length; i ++) {
        if (users[i].name == name && users[i].email == email && users[i].password == password) {
            ok = 1;
        }
        console.log(users[i]);
    }

    if (ok) {
        req.session.username = true;
        console.log("ok");
        res.redirect('/home');
    }
    else {
        // req.session.username = false;
        console.log("not ok");
    }
});


app.post('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/login');
});


app.use(function(req, res, next) {
    res.status(404);
    const pageTitle = 'Northern Globetrotter';

    res.render('index', {pageTitle});
});  


app.listen(3000, function() {
    console.log("Server started on port 3000");
});