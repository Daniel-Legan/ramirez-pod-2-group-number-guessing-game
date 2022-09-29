const express = require('express');
const bodyParser = require('body-parser')
const app = express();

function randomNumber(){
  return Math.floor(Math.random() * (25-1) +1);
}

let randomizedNumber = randomNumber();

let guesses = [];

let roundClicker = -1;

function playOneCheck(){
  roundClicker++;
  let checkedNumber = guesses[roundClicker];
  if(Number(checkedNumber.playerOne) === randomizedNumber){
    return {
      answer: 'Correct!'
    }
  }
  else if(checkedNumber.playerOne > randomizedNumber){
    return {
      answer: 'Your guess was too high'
    }
  }
  else{
    return {
      answer: 'Your guess was too low'
    }
  }
  // console.log('checkingNumber', checkedNumber);
  // console.log('checkNumber.playerOne: ', checkedNumber.playerOne);
}

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

app.post('/answers', (req, res) =>{
  let newGuesses = req.body;
  guesses.push(newGuesses);
  console.log('checking playOneCheck', playOneCheck());
  // console.log('incoming post', newGuesses);
  // console.log(guesses);
  res.sendStatus(201);
})


app.listen(3000, () => {
  console.log ('Server is running on port', 3000)
  console.log ('The random number is ', randomizedNumber);
})
