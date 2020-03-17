const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();


//const { mongoose } = require('./bd/conectionBD');

//setting
app.set('port',process.env.PORT || 3000);

//midlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'url'}));
app.use(require('./routes/index.js'));



app.listen(app.get('port'), () =>{
    console.log('server is listening');
})