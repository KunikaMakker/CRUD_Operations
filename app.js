import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import mainRoutes from './server/routes/main';

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(logger('dev'));

mongoose.connect('mongodb://localhost/crudoperations')
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });
  mongoose.Promise = global.Promise;

const port = 5035;

app.use('/api/', mainRoutes);

app.get('/',(request, respond) => {
    respond.status(200).json({
        message: 'Welcome to project'
    });
});

app.listen(port);