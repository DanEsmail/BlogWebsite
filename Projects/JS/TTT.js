//start game
let currentMove = "x";
const board = ["","","","","","","","",""]
let gameStatus = 1;
let aiPiece = "o";
let playerPiece = "x";
let moveCounter = 0;
let playerCount = 2;

//play Game function
function  move(letter,obj){
    if ($(obj).children("p").text() != "x" && $(obj).children("p").text() != "o") {
      $(obj).children("p").text(letter)
      board[$(obj).children("p").attr("id")] = letter
      return "Correct"
    }else{
      return "error"
    }

}

function switchPlayer (letter){
  if (letter == "x") {
    gameStatus = 1
    return "o";

  }else{
    gameStatus = 1
    return "x";

  }
}

//End game
function winCheck(letter,arr){

  if (arr[4] == letter) {
    if (arr[3] == letter) {
      if (arr[5] == letter) {
        winGame(letter);
        addScore(letter);
        return "win"

      }
    }else if (arr[1] == letter) {
      if (arr[7] == letter) {
        winGame(letter);
        addScore(letter);
        return "win"

      }
    }else if (arr[0] == letter) {
      if (arr[8] == letter) {
        winGame(letter);
        addScore(letter);
        return "win"
      }
    }else if (arr[2] == letter) {
      if (arr[6] == letter) {
        winGame(letter);
        addScore(letter);
        return "win"

      }
    }
  }
  if (arr[6] == letter) {
    if (arr[3]== letter) {
      if (arr[0] == letter) {
        winGame(letter);
        addScore(letter);
        return "win"

      }
    }else if (arr[7]==letter) {
      if (arr[8] == letter) {
        winGame(letter);
        addScore(letter);
        return "win"

      }
    }
  }
  if (arr[2] == letter) {
    if (arr[1] == letter) {
      if (arr[0] == letter) {
        winGame(letter);
        addScore(letter);
        return "win"

      }
    }else if (arr[5] == letter) {
      if (arr[8] == letter) {
        winGame(letter);
        addScore(letter);
        return "win"
      }
    }
  }
}

function winGame(letter){
    let sequance = 1
   wininterval = setInterval(function () {
    if (sequance == 1) {
      $(".Tac-Square").css("background-color","Green")
      sequance = 0;
    }else {
      $(".Tac-Square").css("background-color","white")
      sequance = 1;
    }

  }, 500);
  setTimeout(function(){
    clearInterval(wininterval)
    boardReset(board);
  },3000)
}

function addScore(letter){
  let currentScore = parseInt($("#"+letter+"-points").text())
  let newscore = currentScore + 1
  $("#"+letter+"-points").text(newscore)
}

//Reset game
function boardReset(arr){
  $(".Game-Piece").text(" ")
  for (var i in arr) {
    arr[i] =""
  }
  moveCounter = 0

}

//game AI
function addSpots(num1,num2,num3){
  return num1 + num2 + num3
}

function findOpening(num1,num2,num3){
  if (checkSpace(num1)=="open") {
    return num1
  }else if (checkSpace(num2)=="open") {
    return num2
  }else if (checkSpace(num3)=="open") {
    return num3
  }
}

function finishThree(num1,num2,num3,letter){
  switch (findOpening(num1,num2,num3)) {
    case num1:
      computerMove(num1,letter)
      break;
    case num2:
      computerMove(num2,letter)
      break;
    case num3:
      computerMove(num3,letter)
      break;
    default:

  }
}

function computerAI(playerLetter, comLetter, arr){
  let gameArr = []
  for (var i in arr) {
    if (arr[i] == playerLetter) {
      gameArr[i] = -1
    }else if (arr[i] == comLetter) {
      gameArr[i] = 1
    }else{
      gameArr[i] = 0
    }
  }
  //check for win
  if (addSpots(gameArr[0],gameArr[4],gameArr[8]) == 2) {
    finishThree(0,4,8,comLetter)
    return
  }else if (addSpots(gameArr[2],gameArr[4],gameArr[6]) == 2) {
    finishThree(2,4,6,comLetter)
    return
  }else if (addSpots(gameArr[1],gameArr[4],gameArr[7]) == 2) {
    finishThree(1,4,7,comLetter)
    return
  }else if (addSpots(gameArr[3],gameArr[4],gameArr[5]) == 2) {
    finishThree(3,4,5,comLetter)
    return
  }else if (addSpots(gameArr[0],gameArr[1],gameArr[2]) == 2) {
    finishThree(0,1,2,comLetter)
    return
  }else if (addSpots(gameArr[2],gameArr[5],gameArr[8]) == 2) {
    finishThree(2,5,8,comLetter)
    return
  }else if (addSpots(gameArr[6],gameArr[7],gameArr[8]) == 2) {
    finishThree(6,7,8,comLetter)
    return
  }else if (addSpots(gameArr[0],gameArr[3],gameArr[6]) == 2) {
    finishThree(0,3,6,comLetter)
    return
  }
  //check if oppenent will win
  if (addSpots(gameArr[0],gameArr[4],gameArr[8]) == -2) {
    finishThree(0,4,8,comLetter)
    return
  }else if (addSpots(gameArr[2],gameArr[4],gameArr[6]) == -2) {
    finishThree(2,4,6,comLetter)
    return
  }else if (addSpots(gameArr[1],gameArr[4],gameArr[7]) == -2) {
    finishThree(1,4,7,comLetter)
    return
  }else if (addSpots(gameArr[3],gameArr[4],gameArr[5]) == -2) {
    finishThree(3,4,5,comLetter)
    return
  }else if (addSpots(gameArr[0],gameArr[1],gameArr[2]) == -2) {
    finishThree(0,1,2,comLetter)
    return
  }else if (addSpots(gameArr[2],gameArr[5],gameArr[8]) == -2) {
    finishThree(2,5,8,comLetter)
    return
  }else if (addSpots(gameArr[6],gameArr[7],gameArr[8]) == -2) {
    finishThree(6,7,8,comLetter)
    return
  }else if (addSpots(gameArr[0],gameArr[3],gameArr[6]) == -2) {
    finishThree(0,3,6,comLetter)
    return
  }
  //Place a piece
  if (checkSpace(4)=="open") {
    computerMove(4,comLetter)
  }else if (checkSpace(0)=="open") {
    computerMove(0,comLetter)
  }else if (checkSpace(2)=="open") {
    computerMove(2,comLetter)
  }else if (checkSpace(6)=="open") {
    computerMove(6,comLetter)
  }else if (checkSpace(8)=="open") {
    computerMove(8,comLetter)
  }else if (checkSpace(1)=="open") {
    computerMove(1,comLetter)
  }else if (checkSpace(7)=="open") {
    computerMove(7,comLetter)
  }else if (checkSpace(3)=="open") {
    computerMove(3,comLetter)
  }else if (checkSpace(5)=="open") {
    computerMove(5,comLetter)
  }


}

function checkSpace(location){
  let str = $("#"+location).text()
  if (str == "x") {
    return "x";
  }else if (str == "o") {
    return "o";
  }else{
    return "open"
  }
}

function computerMove(location,letter){
  $("#"+location).text(letter)
  board[location] = letter
}

//switch piece
function clearScore(){
  $(".Score").text("0")
}

function switchPieces(obj){
  boardReset(board);
  clearScore();
  if ($(obj).text() == "x") {
    aiPiece = "o"
    playerPiece = "x"
  }else{
    aiPiece = "x"
    playerPiece = "o"
  }
  return $(obj).text()
}


//game loop
$(".Tac-Square").click(function(){
  if (playerCount == 1) {
    if (gameStatus == 1) {
      gameStatus = 0
      if (move(currentMove,this)=="Correct") {
        moveCounter +=1;
        if (moveCounter == 9) {
          if (winCheck(currentMove,board) == "win") {
            setTimeout(function(){
            gameStatus = 1
            },3000)
          }else {
            boardReset(board);
            addScore("cats");
            gameStatus = 1
          }

        }else {
          if (winCheck(currentMove,board) == "win") {
            setTimeout(function(){
            gameStatus = 1
            },3000)

          }else{
            computerAI(playerPiece,aiPiece,board)
            moveCounter +=1;
            if (winCheck(aiPiece,board) == "win") {
              setTimeout(function(){
              gameStatus = 1
              },3000)
            }else {
              gameStatus = 1
            }
          }
        }
      }else{
        gameStatus = 1
      }
    }
  }else{
    if (gameStatus == 1) {
      gameStatus = 0
      if (move(currentMove,this)=="Correct") {
        moveCounter +=1;
        if (moveCounter == 9) {
          if (winCheck(currentMove,board) == "win") {
            setTimeout(function(){
            gameStatus = 1
            },3000)
          }else {
            boardReset(board);
            addScore("cats");
            gameStatus = 1
          }

        }else{
          winCheck(currentMove,board)
          currentMove = switchPlayer(currentMove);
        }
      }else{
        gameStatus = 1
      }
    }
  }

})

//Reset Game Button
$("#reset-button").click(function(){
  boardReset(board)
})
//clear score button
$("#clear-score").click(function(){
  clearScore()
})
//switch Piece Button clicks
$(".switch-button").click(function(){
  currentMove = switchPieces(this)
})

//player count button
$(".player-button").click(function(){
  if ($(this).text()== "One Player") {
    playerCount = 1;
    boardReset(board)
    clearScore()
  }else{
    playerCount = 2;
    boardReset(board)
    clearScore()
  }
})
