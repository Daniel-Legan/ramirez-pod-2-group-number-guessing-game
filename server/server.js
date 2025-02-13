const express = require('express');
const bodyParser = require('body-parser')
const app = express();

function randomNumber() {
  return Math.floor(Math.random() * (25-1) +1);
}

let randomizedNumber = randomNumber();

let guesses = [];

let roundClicker = -1;

let groupAnswers = [];

// function checkPlayers() {
//   // roundClicker++;
//   let playerOneAnswer = 
//   let things = {
//   playerOne: playerOneAnswer
//   // playerTwo: playTwoCheck(),
//   // playerThree: playThreeCheck(),
//   // playerFour: playFourCheck()
//   }
//   console.log('checking things.playerOne', things.playerOne);
// }

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

app.post('/reset-number', (req, res) => {
  let newSecretNum = randomNumber();
  // console.log(newSecretNum);
  randomizedNumber = newSecretNum;
  console.log(randomizedNumber);
  res.sendStatus(201);
});

app.post('/answers', (req, res) => {
  let newGuesses = req.body;
  guesses.push(newGuesses);
  let playerOneAnswer = playOneCheck();
  let playerTwoAnswer = playTwoCheck();
  let playerThreeAnswer = playThreeCheck();
  let playerFourAnswer = playFourCheck();
  let newAnswers = {
    pOne: playerOneAnswer,
    pTwo: playerTwoAnswer,
    pThree: playerThreeAnswer,
    pFour: playerFourAnswer
  }
  groupAnswers.push(newAnswers);
  console.log(groupAnswers);
  res.sendStatus(201);
});

app.get('/answers', (req, res) => {
  res.send(groupAnswers[roundClicker]);
});

app.listen(3000, () => {
  console.log ('Server is running on port', 3000)
  console.log ('The random number is', randomizedNumber);
});



function playOneCheck() {
  roundClicker++;
  let checkedNumber = guesses[roundClicker];
  if(Number(checkedNumber.playerOne) === randomizedNumber){
    return {
      answer: 'Correct!',
      number: checkedNumber.playerOne 
    }
  }
  else if(checkedNumber.playerOne > randomizedNumber){
    return {
      answer: 'Too high',
      number: checkedNumber.playerOne 
    }
  }
  else{
    return {
      answer: 'Too low',
      number: checkedNumber.playerOne
    }
  }
  // console.log('checkingNumber', checkedNumber);
  // console.log('checkNumber.playerOne: ', checkedNumber.playerOne);
}

function playTwoCheck(){
  let checkedNumber = guesses[roundClicker];
  if(Number(checkedNumber.playerTwo) === randomizedNumber){
    return {
      answer: 'Correct!',
      number: checkedNumber.playerTwo
    }
  }
  else if(checkedNumber.playerTwo > randomizedNumber){
    return {
      answer: 'Too high',
      number: checkedNumber.playerTwo  
      }
  }
  else{
    return {
      answer: 'Too low',
      number: checkedNumber.playerTwo 
    }
  }
  // console.log('checkingNumber', checkedNumber);
  // console.log('checkNumber.playerOne: ', checkedNumber.playerTwo);
}

function playThreeCheck(){
  let checkedNumber = guesses[roundClicker];
  if(Number(checkedNumber.playerThree) === randomizedNumber){
    return {
      answer: 'Correct!',
      number: checkedNumber.playerThree
    }
  }
  else if(checkedNumber.playerThree > randomizedNumber){
    return {
      answer: 'Too high',
      number: checkedNumber.playerThree
    }
  }
  else{
    return {
      answer: 'Too low',
      number: checkedNumber.playerThree
    }
  }
  // console.log('checkingNumber', checkedNumber);
  // console.log('checkNumber.playerOne: ', checkedNumber.playerThree);
}

function playFourCheck(){
  let checkedNumber = guesses[roundClicker];
  if(Number(checkedNumber.playerFour) === randomizedNumber){
    return {
      answer: 'Correct!',
      number: checkedNumber.playerFour
    }
  }
  else if(checkedNumber.playerFour > randomizedNumber){
    return {
      answer: 'Too high',
      number: checkedNumber.playerFour
    }
  }
  else{
    return {
      answer: 'Too low',
      number: checkedNumber.playerFour
    }
  }
  // console.log('checkingNumber', checkedNumber);
  // console.log('checkNumber.playerOne: ', checkedNumber.playerOne);
}