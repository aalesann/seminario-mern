const express = require('express')
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.render('index');
});

require('./database/connection');

// Setting
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '/public')));
app.set('port', process.env.PORT || 5000 );
app.use(express.urlencoded({extended: false }));
app.use(express.json());

// Routes 
app.use('/users',require('./routes/users'));

// Views
app.set('views', path.join(__dirname, './views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'Layouts'),
    partialsDir: path.join(app.get('views'), 'Partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');
    socket.on('chat message', (msg) => {
        let msjRecibido = `${msg.username}: ${msg.message}`;
        console.log(msjRecibido);

        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Un usuario acaba de desconectarse');
    });
});

// Run
server.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});