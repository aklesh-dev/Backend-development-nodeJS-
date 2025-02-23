const express = require("express");
const path = require("path");

const app = express();

// set the view engine as Embedded JavaScript(ejs)
app.set("view engine", 'ejs');

// set the directory for the views
app.set('views', path.join(__dirname, 'views'));

const products = [
  {id:1, name:'product 1'},
  {id:2, name:'product 2'},
  {id:3, name:'product 3'},
];

app.get('/', (req, res) => {
  res.render('home', {title:'Home', products: products});
})

app.get('/about', (req, res)=>{
  res.render('about', {title: 'About'})
})

app.use((req, res) => {
  res.status(404).send('Page not found!');
});

app.listen(3000, () => {
  console.log("Server is running!!!");
});