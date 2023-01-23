let c = document.getElementById("canvas");
let ctx = c.getContext("2d");


//other functions
function random(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function checkIfHit(player,arr,team,x,y){
  if (team = "player") {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].x-25 == x) {
        if (arr[i].y-25 == y) {
          console.log("hit")
        }else{
          console.log("no hit")
        }
      }else{
          console.log("no hit")
      }

      }
    }else{
      if (player.x-25 == x) {
        if (player.y-25 == y) {
          console.log("hit")
        }else{
          console.log("no hit")
        }
      }else{
          console.log("no hit")
      }
    }
  }

//gameboard

const gameBoard = [
  ["open","open","open","open"],
  ["open","open","open","open"],
  ["open","open","open","open"],
  ["open","open","open","open"]]
var monArr = [];

function cordToNum(num){
  if (num == 25) {
    return 0
  }else{
    switch (num/5) {
      case 35:
        return 3
      break;
      case 25:
        return 2
      break;
      case 15:
        return 1
      break;
      default:
    }
  }
}

function cleanUpBoard(arr){
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      arr[i][j] = "open"
    }
  }
}

function searchcord(piece,arr){
  let xcord = cordToNum(piece.x);
  let ycord = cordToNum(piece.y);

  arr[xcord][ycord] = "closed";
}

function numToCord(num){
  switch (num) {
    case 0:
      return 25;
    break;
    case 1:
      return 75;
    break;
    case 2:
      return 125;
    break;
    case 3:
      return 175;
    break;
    default:

  }
}

function gameBoardUpdate(player1,arr){
  cleanUpBoard(gameBoard)
  searchcord(player1,gameBoard);
  if (arr.length == 0) {

  }else{
    for (var i = 0; i < arr.length; i++) {
      searchcord(arr[i],gameBoard)
    }
  }

}

//draw board

function drawrect(area, width, height, x, y){
  area.beginPath();
  area.rect(x,y,width,height)
  ctx.stroke()
}

function drawFillRect(area, width, height, x, y,color){
  area.fillStyle = color
  area.beginPath();
  area.fillRect(x,y,width,height)
  ctx.stroke()
  area.fillStyle = "FFFFFF"
}

function clearCanvas(){
  ctx.clearRect(0,0,300,300)
}

function drawboard(){
  for (var x = 0; x < 4; x++) {
    for (var y = 0; y < 4; y++) {
      drawrect(ctx,50,50,x*50+50,y*50+50)
    }
  }

}

//class functions

class Component {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.color = "FFFFFF"
  }
  draw(area){
    drawFillRect(area,this.width,this.height,this.x+37.5,this.y+37.5,this.color)
  }
}




class Hero extends Component {
  constructor(x,y) {
    super(x,y)
    this.color = "#8A2BE2"
    this.width = 25;
    this.height = 25;
    this.faceDirection = "right"
    this.attackBelt = [];
  }

  move(direction){
    switch (direction) {
      case "down":
        if (this.y >= 175 ) {

        }else{
          this.y += 50
        }
        break;
      case "up":
        if (this.y <= 25 ) {

        }else{
          this.y -= 50
        }
        break;
      case "right":
        if (this.x >= 175 ) {

        }else{
          this.x += 50

        }
        break;
      case "left":
        if (this.x <= 25 ) {

        }else{
          this.x -= 50
        }
        break;
      default:

    }
  }

  attack(newAttack){
    this.attackBelt.push(newAttack);
  }
}

let player = new Hero(25,25);



//enemy class
class Monster extends Component {
  constructor(x,y,type,id) {
    super(x,y)
    this.type = type;
    this.width = 25;
    this.height = 25;
    this.color = "#568203";
    this.hp = 4;
    this.id = id;
  }
  draw(area){
    drawFillRect(area,this.width,this.height,this.x+37.5,this.y+37.5,this.color)
  }
  CreateNameCard(){
    $("#enemy-box").append(`
      <div class="enemy-box" id="`+this.id+`">
        <p class="enemy-title | center">Goblin</p>
        <div class="enemy-status">
          <p class="enemy-hp | center">Hp: `+this.hp+`</p>
        </div>
      </div>  `)
  }
}





//player move

$(document).keydown(function(e){
  switch (e.key) {
    case "a":
      player.move("left")
      break;
    case "w":
      player.move("up")
      break;
    case "d":
      player.move("right")
      break;
    case "s":
      player.move("down")
      break;
    default:

  }
})

function createMonster(x,y,type,arr){
  let monsterID = arr.length
  arr.push(new Monster(x,y,type,monsterID))
  arr[monsterID].CreateNameCard()
}

function drawMonsters(arr){
  if (arr.length == 0) {
  }else{
    for (var i = 0; i < arr.length; i++) {
      arr[i].draw(ctx)
    }
  }
}

function findRandomOpenSpace(arr){
  let row = random(0,3);
  let column = random(0,3);
  let spot = []
  if (arr[row][column] == "open") {
    spot.push(row);
    spot.push(column);
    return spot;
  }else{
    return "fail";
  }

}

function createNewMonsters(num,failCount){
  let fails = 0
  for (var i = 0; i < num; i++) {
    do{
      let cords = findRandomOpenSpace(gameBoard)
      if (cords != "fail") {
        let x = numToCord(cords[0]);
        let y = numToCord(cords[1]);
        createMonster(x,y,"Goblin",monArr);
        gameBoardUpdate(player,monArr)
        break;
      }else{
        fails++
      }
    }while(fails < failCount)
  }
}


//player attacks
function changeAttackDirection(piece){
  switch (piece.faceDirection) {
    case "up":
      $(".attack-img").css("transform","rotate(0deg)");
      $("#direction-text").text("Current Direction: right")
      piece.faceDirection = "right"
    break;
    case "right":
      $(".attack-img").css("transform","rotate(90deg)");
      $("#direction-text").text("Current Direction: down")
      piece.faceDirection = "down"
    break;
    case "down":
      $(".attack-img").css("transform","rotate(180deg)");
      $("#direction-text").text("Current Direction: left")
      piece.faceDirection = "left"
    break;
    case "left":
      $(".attack-img").css("transform","rotate(270deg)");
      $("#direction-text").text("Current Direction: up")
      piece.faceDirection = "up"
    break;
    default:

  }
}

$(".direction-button").click(function(){
  changeAttackDirection(player)
})

class Attacks {
  constructor(name, type, squance, id, dmg, cost) {
    this.name = name;
    this.type = type
    this.squance = squance;
    this.id = id;
    this.dmg = dmg;
    this.cost = cost;
  }
  newDirection(num,direction){
    console.log(direction)
    switch (direction) {
      case "up":
        return num;
      break;
      case "right":
        if (num == 0) {
          return 0;
        }else if (num+2>8) {
          return num+2-8
        }else{
          return num+2
        }
      break;
      case "down":
      if (num == 0) {
        return 0;
      }else if (num+4>8) {
        return num+4-8
      }else{
        return num+4
      }
      break;
      case "left":
      if (num == 0) {
        return 0;
      }else if (num+6>8) {
        return num+6-8
      }else{
        return num+6
      }
      break;
      default:

    }
  }

  sequanceReader(seq,direction){
    let arr = []
    for (var i = 0; i < seq.length; i++) {
      arr.push(this.newDirection(seq[i],direction))

    }
    return arr
  }

  drawPath(str,direction){

  }

  castAttack(caster){
    let x = caster.x-25
    let y = caster.y-25
    let newSeq = []
    if (caster.faceDirection =="up") {
      newSeq = this.squance;
    }else{

      newSeq = this.sequanceReader(this.squance, caster.faceDirection)

    }
    for (var i = 0; i < newSeq.length; i++) {
        switch (newSeq[i]) {
          case 1:

            y -=50;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,"player",x,y)
          break;
          case 2:
            x +=50;
            y -=50;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,"player",x,y)
          break;
          case 3:
            x +=50;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,"player",x,y)
          break;
          case 4:
            x +=50 ;
            y +=50;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,"player",x,y)
          break;
          case 5:

            y +=50;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,"player",x,y)
          break;
          case 6:
            x -=50;
            y +=50;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,"player",x,y)
          break;
          case 7:
            x -=50;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,"player",x,y)
          break;
          case 8:
            x -=50;
            y -=50;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,"player",x,y)
          break;
          case 0:
            x = caster.x-25;
            y = caster.y-25;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,"player",x,y)
          break;
          default:

        }

    }
  }
}
  //draw attacks

  //see who gets hit

//player stats

// score

//lives

//status effects

//game frames
function updateGame(){
  clearCanvas()
  drawboard()
  player.draw(ctx)
  drawMonsters(monArr)
}


function gameStart(){
  gameBoardUpdate(player,monArr)
  player.attack(new Attacks("fireball", "fire", [1,1,1], 1))
  setInterval(function () {
    updateGame()
  }, 20);
}

gameStart();
