const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

const users = [
    {
    login: 'Vovan',
    password: 'lviv'
    },

    {
        login: 'Ira',
        password:'Lviv1'
    },

    {
        login: 'Andrii',
        password: 'Lviv2'
    },

    {
        login: 'Evgenia',
        password: 'Chervonograd'
    },

    {
        login: 'john',
        password: 'NewYork'
    },

    {
        login: 'Melannie',
        password: 'Rome'
    },

]

app.get('/login', (req, res) => {
    // res.json(users);
    res.render('login');
});

app.get('/users', (req, res) => {
    res.render('users', {users});
})

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;
    res.json(users[userId - 1])
})

app.post('/login', (req, res) => {
    // console.log(req.body);
    users.push(req.body);
    res.redirect('/users');
})

app.use((req, res) => {
    res.render('notFound')
})


app.listen(3800, () => {
    console.log('server has started');
});