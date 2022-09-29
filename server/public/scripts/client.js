// const { response } = require("express");

$(document).ready(handleReady);

let givenResults = [];

let roundClicker = -1;

function handleReady() {
  console.log("jquery is loaded!")
  showAnswers();
  $('#guessForm').on('submit', onSubmit);
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
  // console.log(givenResults[0].pOne.answer);
  $('#history').empty();
  for(let objct of givenResults){
    console.log('testing the for loop', objct.pOne.answer);


    $('#history').append(`
      <tr>
        <td>${objct.pOne.answer}</td>
        <td>${objct.pTwo.answer}</td>
        <td>${objct.pThree.answer}</td>
        <td>${objct.pFour.answer}</td>
      </tr>
    `);
  } 
}