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
const Accessories = mongoose.model('Accessories', {
  id: String,
  slug: String,
  publishedDate: Date,
  accessoriesCategory: String,
  accessoriesName:String,
  accessoriesNo:String,
  accessoriesDescription:String,
  accessoriesFeature:String,
  accessoriesParameter:String,
});
app.get('/api/accessories', function(req, res) {
  Accessories.find( function(err, data){
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(data);
      console.log(data);
    }
  })
});
//Desginintegration model constructor
const Integration = mongoose.model('Integration', {
  id: String,
  slug: String,
  publishedDate: Date,
  integrationCategory: String,
  integrationName:String,
});
app.get('/api/integration', function(req, res) {
  Integration.find( function(err, data){
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(data);
      console.log(data);
    }
  })
});
//Evaluation model constructor
const Evaluation = mongoose.model('Evaluation', {
  id: String,
  slug: String,
  publishedDate: Date,
  evaluationCategory: String,
  evaluationName:String,
});
app.get('/api/evaluation', function(req, res) {
  Evaluation.find( function(err, data){
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(data);
      console.log(data);
    }
  })
});
//Greenhand model constructor
const Greenhand = mongoose.model('Greenhand', {
  id: String,
  slug: String,
  publishedDate: Date,
  guidanceCategory: String,
  guidanceTitle:String,
  guidanceDescription:String,
});
app.get('/api/guidance', function(req, res) {
  Greenhand.find( function(err, data){
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(data);
      console.log(data);
    }
  })
});
//IndustryApplication model constructor
const Application = mongoose.model('Application', {
  id: String,
  slug: String,
  publishedDate: Date,
  applicationCategory: String,
  applicationName:String,
  applicationDescription:String,
});
app.get('/api/application', function(req, res) {
  Application.find( function(err, data){
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(data);
      res.json(data);
      console.log(data);
    }
  })
});
//paging
app.get('/api/applicationpage', function(req, res) {
  Application.find( function(err, data){
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(data);
      console.log(data);
    }
  }).sort({"ID":1}).skip(10).limit(10)
});
//byname
app.get('/api/applicationname', function(req, res) {
  Application.find({'applicationName': 'application one'}, function(err, data){
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(data);
      console.log(data);
    }
  })
});
//Job model constructor
const Job = mongoose.model('Job', {
  id: String,
  key: String,
  publishedOn: Date,
  updatedBy: String,
  updatedAt:Date,
  createddBy: String,
  createdAt:Date,
  name:String,
  isFeatured:Boolean,
  jobState:String,
});
app.get('/api/job', function(req, res) {
  Job.find( function(err, data){
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(data);
      console.log(data);
    }
  })
});
//Product model constructor
const Product = mongoose.model('Product', {
  id: String,
  slug: String,
  publishedDate: Date,
  production: String,
  productName:String,
});
app.get('/api/product', function(req, res) {
  Product.find( function(err, data){
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(data);
      console.log(data);
    }
  })
});
//Question model constructor
const Question = mongoose.model('Question', {
  id: String,
  slug: String,
  publishedDate: Date,
  questionTitle: String,
  questionNo:String,
  questionAnswer: String,
  questionCategory: String
});
app.get('/api/question', function(req, res) {
  Question.find( function(err, data){
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(data);
      console.log(data);
    }
  })
});

//Rent model constructor
const Rent = mongoose.model('Rent', {
  id: String,
  slug: String,
  publishedDate: Date,
  rentName: String,
  rentNo:String,
  heroImage: String,
  rentCategory: String,
  rentDescription: String,
});
app.get('/api/rent', function(req, res) {
  Rent.find( function(err, data){
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(data);
      console.log(data);
    }
  })
});

//Order model constructor
const Order = mongoose.model('Order', {
  id: String,
  slug: String,
  orderNo: String,
  productNo: String,
  tokenNo: String,
  productImage: String,
  productName: String,
  isMaintain: String,
  isCare: String,
  company: String,
  orderdDate: Date,
  orderContact: String
});

app.get('/api/order', function(req, res) {
  Order.find(function(err, data){
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(data);
      console.log(data);
    }
  })
});

// find
app.post('/api/findbyno', function(req, res) {
  console.log('res.body=',req.data)
  var orderNo=res.data.orderNo;
  Order.find({'orderNo': orderNo}, function(err, data){
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(data);
      console.log(data);
    }
  })
});

// app.post('/api/login', passport.authenticate('local'), function(req, res) {
//   if (req.isAuthenticated()){
//     res.status(200).send("you are in!");
//   } else {
//     res.status(200).send("try one more time!");
//   }
// });


//config
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
