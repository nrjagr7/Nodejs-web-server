const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (message) => {
  return message.toUpperCase();
});

app.use((req, res, next) => {
var now = new Date().toString();
var log = `${now}: ${req.method} : ${req.url}`;
console.log(log);
fs.appendFile('server.log', log + '\n', (error) => {
if(error){
  console.log('unable to write.');
  }
 });
next();

});


app.use((req, res, next) => {
  res.render('maintanance.hbs');

});

app.get('/', (req, res) => {
  //res.send('Hello World');
  // res.send({
  //   name: 'Neeraj',
  //   Likes: [
  //          'like1',
  //          'like2',
  //          'like3'
  //            ]
  // });
  res.render('home.hbs', {

    pageTitle: 'Home Page',
    welcomeMessage : 'Welcome to the page of website.'
  });
});

app.get('/about', (req,res) => {
   res.render('about.hbs', {
     pageTitle: 'About Page',
   });
   //res.send('this is about section');
})

app.listen(3000, () => {

  console.log('Server up on port 3000.');
});
