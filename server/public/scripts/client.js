// const { response } = require("express");

$(document).ready(handleReady);

let givenResults = [];
let roundCount = 0;
let roundClicker = -1;

function handleReady() {
  console.log("jquery is loaded!")
  render();
  $('#guessForm').on('submit', onSubmit);
  $('#resetButton').on('click', resetNumber)
}

function resetNumber(){
  console.log("click");

  $.ajax({
    url:'/reset-number',
    method: 'POST'
  })
    .then(response =>{
      console.log('All good in resetnumber', response);
    })
    .catch(err =>{
      console.log('An error was found in resetNumber', err)
    })
    givenResults = [];
    roundClicker = -1;
    $('#winners').empty();
    render();
}

function onSubmit(evt){
  evt.preventDefault();
  console.log('in onSubmit');

  let newSubmit = {
    playerOne: Number($('#player1').val()),
    playerTwo: Number($('#player2').val()),
    playerThree: Number($('#player3').val()),
    playerFour: Number($('#player4').val())
  }
  console.log(newSubmit);
  $('#player1').val('');
  $('#player2').val('');
  $('#player3').val('');
  $('#player4').val('');

  $.ajax({
    url: '/answers',
    method: 'POST',
    data: newSubmit
  })
    .then(response =>{
      console.log(response);
    })
    .catch(err => {
      console.log('An error was found in onSubmit', err)
    });

    showAnswers();
}

function showAnswers(){
  $.ajax({
    url:'/answers',
    method: 'GET'
  })
    .then(response =>{
      roundClicker++;
      givenResults.push(response);
      // givenResults = response;
      console.log(givenResults);
      // console.log('checking givenResults', givenResults[roundClicker]);
      render();
    })
      .catch(err =>{
        console.log('There was an error in showAnswers', err);
      })
}

function render(){
  console.log('in render');
  roundCount++;
  // console.log(givenResults[0].pOne.answer);
  // winnerCheck();
  $('#roundCount').empty();
  console.log(roundCount);
  $('#roundCount').append(`Round Count: ${roundCount}`);
  $('#history').empty();
  for(let objct of givenResults){
    winnerCheck();
    // console.log('testing the for loop', objct.pOne.answer);
    $('#history').append(`
      <tr>
        <td>${objct.pOne.number}: ${objct.pOne.answer}</td>
        <td>${objct.pTwo.number}: ${objct.pTwo.answer}</td>
        <td>${objct.pThree.number}: ${objct.pThree.answer}</td>
        <td>${objct.pFour.number}: ${objct.pFour.answer}</td>
      </tr>
    `);
  } 
}

function winnerCheck(){
  if(givenResults[roundClicker].pOne.answer === 'Correct!'){
    // $('#winners').empty();
    $('#winners').append(`<div>PLAYER 1 HAS WON THE GAME!!!!!</div>`)
  }
  if(givenResults[roundClicker].pTwo.answer === 'Correct!'){
    // $('#winners').empty();
    $('#winners').append(`<div>PLAYER 2 HAS WON THE GAME!!!!!</div>`)
  }
  if(givenResults[roundClicker].pThree.answer === 'Correct!'){
    // $('#winners').empty();
    $('#winners').append(`<div>PLAYER 3 HAS WON THE GAME!!!!!</div>`)
  }
  if(givenResults[roundClicker].pFour.answer === 'Correct!'){
    // $('#winners').empty();
    $('#winners').append(`<div>PLAYER 4 HAS WON THE GAME!!!!!</div>`)
  }
  // else{
  //   return 'No winners, heading out of winnerCheck';
  // }
}