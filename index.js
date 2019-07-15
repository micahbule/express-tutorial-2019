const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

const users = [];

app.get('/users', (req, res) => {
    res.render('index', { users: users });
});

app.post('/users', (req, res) => {
    users.push({
        name: req.body.name,
        age: req.body.age
    });

    res.redirect('/users');
});

app.get('/about/:name', (req, res) => {
    const user = users.find(user => user.name === req.params.name);

    res.render('about', user);
});

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});