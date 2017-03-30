import express from 'express';
import browserify from 'browserify-middleware';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import { fromNode } from 'creed';
import fs from 'fs';
import shortid from 'shortid';
import http from 'http';
import path from 'path';

const app = express();
const server = http.createServer(app);

app.set('DEV', process.env.NODE_ENV !== 'production');

app.set('PORT', process.env.PORT || 3000);
const dbConnect = process.env.DB_CONN || 'mongodb://jerryliu:zaq1234.@ds141960.mlab.com:41960/jsproject';
mongoose.connect(dbConnect);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// CRUL
//Article model constructor
const Article = mongoose.model('Article', {
  id: String,
  slug: String,
  publishedDate: Date,
  articleCategory: String,
  articleName:String,
  articleContext:String,
  authorContact:String,
  authorEmail:String,
  authorPhone:String,
});

// findAllArticle
app.get('/api/articles', function(req, res) {
  Article.find( function(err, data){
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(data);
      console.log(data);
    }
  })
});
//Accessories model constructor
//Article model constructor
//Desginintegration model constructor
//Evaluation model constructor
//Greenhand model constructor
//IndustryApplication model constructor
//Job model constructor
//Product model constructor
//User model constructor
const config = {
  index: 'index.html',
  dotfiles: 'ignore',
  // http://stackoverflow.com/a/500103/1737413
  etag: false,
  maxage: -1
};

app.use((req, res, next) => {
  // console.log(`${req.method} : ${req.path}`);
  next();
});

// http://evanhahn.com/express-dot-static-deep-dive/
app.use(express.static(join(__dirname, '../public'), config));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));


// babel options
const babel = {
  presets: ['es2015', 'react'],
  plugins: ['react-html-attrs', ["import", {
    "libraryName": "antd",
    "style": "css",   // or 'css'
  }]]
};

// browserify transforms
const transform = [
  ['babelify', babel],
  ['cssify', { global: true }]
];

// Serve bundle to client.
// https://github.com/ForbesLindesay/browserify-middleware/issues/31
app.get('/js/bundle.js', browserify(join(__dirname, '../client/index.js'), {
  transform,
  debug: true,
  cache: 'dynamic',
  precompile: true,
  insertGlobals: true
}));

app.all('*', function(req, res){
  res.sendFile('index.html', { 'root': path.resolve(__dirname, '../public') });
});

db.once('open', function(callback) {
  console.info('App Server - DB connected');
});
server.listen(app.get('PORT'), function callback() {
  return console.log(`application started on port ${app.get('PORT')}`);
});
