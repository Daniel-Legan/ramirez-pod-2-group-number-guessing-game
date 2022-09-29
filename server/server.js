const express = require('express');
const bodyParser = require('body-parser')
const app = express();

function randomNumber(){
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

app.post('/answers', (req, res) =>{
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
})

app.get('/answers', (req, res)=>{
  res.send(groupAnswers[roundClicker]);
})

app.listen(3000, () => {
  console.log ('Server is running on port', 3000)
  console.log ('The random number is ', randomizedNumber);
})



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

function playTwoCheck(){
  let checkedNumber = guesses[roundClicker];
  if(Number(checkedNumber.playerTwo) === randomizedNumber){
    return {
      answer: 'Correct!'
    }
  }
  else if(checkedNumber.playerTwo > randomizedNumber){
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
  // console.log('checkNumber.playerOne: ', checkedNumber.playerTwo);
}

function playThreeCheck(){
  let checkedNumber = guesses[roundClicker];
  if(Number(checkedNumber.playerThree) === randomizedNumber){
    return {
      answer: 'Correct!'
    }
  }
  else if(checkedNumber.playerThree > randomizedNumber){
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
  // console.log('checkNumber.playerOne: ', checkedNumber.playerThree);
}

function playFourCheck(){
  let checkedNumber = guesses[roundClicker];
  if(Number(checkedNumber.playerFour) === randomizedNumber){
    return {
      answer: 'Correct!'
    }
  }
  else if(checkedNumber.playerFour > randomizedNumber){
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