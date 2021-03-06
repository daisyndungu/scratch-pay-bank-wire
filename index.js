'use strict';
import express from 'express';
import logger from 'morgan';
import path from 'path'
import { json, urlencoded } from 'body-parser'

import routes from './src/routes/routes';

const app = express()

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use('/api/v1', routes);

app.listen(3000);
export default app