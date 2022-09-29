const express = require('express');
const bodyParser = require('body-parser')
const app = express();

function randomNumber(){
  return Math.floor(Math.random() * (25-1) +1);
}

let randomizedNumber = randomNumber();

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here


app.listen(3000, () => {
  console.log ('Server is running on port', 3000)
  console.log ('The random number is ', randomizedNumber);
})
