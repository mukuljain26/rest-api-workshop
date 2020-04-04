let express = require('express');
let mongoose = require('mongoose');

let customerRoute = require('./routes/customer');

let app = express();

let personRoute = require('./routes/person');

let bodyParser = require('body-parser');

const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`hii middleware here ${req.originalUrl}`);
    // res.send("I am sending control to next fn");
    next();
});
app.use(express.static('public'));

app.use(personRoute);

mongoose.connect("mongodb+srv://mukul0295:Mridul11@cluster0-r8p9i.mongodb.net/rest-api-db", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch((error) => console.log(error));

app.use(customerRoute);




//404 error
app.use((req, res, next) => {
    res.status(404).send('you are lost');
});

//500 error
app.use((err, req, res, next) => {
    console.log(`forced error is ${err.stack}`);
});


//500 error
// app.use((err, req, res, next) => {
//     console.error(err.stack);
// })

const PORT = process.env.PORT || 3000;


// const userName = 'mukul0295';
// const password = 'Mridul11';
// const server = 'cluster0-r8p9i.mongodb.net';
// const databaseName = 'rest-api-db';


app.listen(PORT, () => { console.log(`The server is started on ${PORT}`) });