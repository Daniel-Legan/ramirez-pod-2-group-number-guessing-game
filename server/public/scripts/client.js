$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")

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
  // $('#player1').val('');
  // $('#player2').val('');
  // $('#player3').val('');
  // $('#player4').val('');

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
}