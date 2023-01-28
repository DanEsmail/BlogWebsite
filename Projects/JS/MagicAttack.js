
//seting up the canvas for the game *******************************************
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

//setting up varibles for the game*********************************************
let gameStatus = 1; //the status between monsters and players
let drawStatus = 1; //not in use at this point. decides if the player can draw cards
let score = 0;   //varible to hold score
let turns = 0;   //varible that changes turns
var monArr = []; //initalize the monster array to hold all monsters in play

//Utilliy function used later on in card*****************************************

function random(min, max){
  //random function used to pick a random number inbetween a min number and a max number
    //used in PullCard(), and FindRandomOpenSpace;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateMonsterArray(arr){
//updates the monster function if a monster dies
  //used in CheckIfHit()

  //starts new array to be pushed after updated
  let newArr = [];
  //sets a counter to id all monsters
  let counter = 0;
  $("#enemy-box").html(`
    <p class="center"> Enemies</p>
    <hr>
  `);
  //loop looks through old array
  for (var i = 0; i < arr.length; i++) {
    //if monster is not dead
    if (arr[i].status != "dead") {
      newArr.push(arr[i]); //push monster to new array
      arr[i].id = counter; //use the counter as the new id for the monster
      arr[i].CreateNameCard(); //create the new name card
      counter++; //increment counter
    }
  } //End For Loop
  //return the new array to be used as the new monster array
  return newArr;
}

function checkIfHit(player,arr,team,x,y,attack){
  //function to cheack if monster or player is alive based on who cast the attacks
    //used in Attack.CastAttack()
  let damageStatus = "alive"  //sets the damage status

  //loop to check if player casted the attack
  if (team == "player") {

  //for loop to check if anything in the monster array got hit at the x, and y
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].x-25 == x) {
      if (arr[i].y-25 == y) {
        //damage status check to see if the monster is dead or not
      damageStatus = arr[i].takeDamge(attack.dmg);
      }
    }
  }//end of for loop
  if (damageStatus == "dead") {
      monArr = updateMonsterArray(arr); //updates the monster array only if a monster dies
    }
  }// end of player's attack
  //if anyone other then the player attack
  else{
    if (player.x-25 == x) {
      if (player.y-25 == y) {
          //if the player is at the x and y of the attack take the damage
          player.takeDamge(attack.dmg);
      }
    }
  }// end of monster's attack
}

//Gameboard Varubles and function***********************************************

//gameboard 2D array
  //used to make sure the player and monsters can see eachother
const gameBoard = [
  ["open","open","open","open"],
  ["open","open","open","open"],
  ["open","open","open","open"],
  ["open","open","open","open"]];

function cordToNum(num){
//function used to change obj cordinates to a number in the gameboard 2D array
  //used in searchcord(), Hero.Move(), Monster.OpenAround(), and Monster.FindPlayer()

// each number in the switch is a cordinate and each return is the number it is on the board.
  if (num == 25) {
    return 0;
  }else{
    switch (num/5) {
      case 35:
        return 3;
      case 25:
        return 2;
      case 15:
        return 1;
      default:
    }
  }
}

function cleanUpBoard(arr){
//used to reset the gameBoard 2D array
  //used in gameBoardUpdate()
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      arr[i][j] = "open"; // set each array item to open
    }
  }
}

function searchcord(piece,arr){
  // find an Object's x and y on the board and occupies that space.
    //used in gameBoardUpdate()
  let xcord = cordToNum(piece.x); //find cordinates of Object's x
  let ycord = cordToNum(piece.y); //find cordinates of Object's y

  arr[xcord][ycord] = "closed"; //set object to closed
}

function numToCord(num){
// find the cordinates of an object based on their spot on the gameBoard array
  //used in createNewMonsters()

  //returns a cordinate based on a number
  switch (num) {
    case 0:
      return 25;
    case 1:
      return 75;
    case 2:
      return 125;
    case 3:
      return 175;
    default:

  }
}

function gameBoardUpdate(player1,arr){
//updateds the gameboard array based on player and monster array information.
  //used in Hero.Move(), Monster.Move(), CreateNameCard(), and gameStart()

  cleanUpBoard(gameBoard); //resets gameboard
  searchcord(player1,gameBoard); //search players cords and updating gameboard
  if (arr.length != 0) {
    //monster array isn't empty find all monster's locations
    for (var i = 0; i < arr.length; i++) {
      searchcord(arr[i],gameBoard); //updated monster's location in gameboard
    }
  }
}

function drawrect(area, width, height, x, y){
  //draws open squares to the canvas
    //used in drawboard()
  area.beginPath(); //begin path
  area.rect(x,y,width,height); //tell computer size of square
  ctx.stroke(); //draw square
}

function drawFillRect(area, width, height, x, y,color){
//draws a filled square to the canvas
  //used in Component.Draw(), and Attack.castAttack()
  area.fillStyle = color; //choose color for square
  area.beginPath(); //beign path
  area.fillRect(x,y,width,height); //tell computer square size
  ctx.stroke(); //draw square
  area.fillStyle = "FFFFFF"; //change square back
}

function clearCanvas(){
  //clears the canvas
    //used in updateGame()
  ctx.clearRect(0,0,300,300); //clears the whole canvas
}

function drawboard(){
  //draws the board to play the game
    //used in updateGame();

  //sets up two arrays to make four columns and four rows
  for (var x = 0; x < 4; x++) {
    for (var y = 0; y < 4; y++) {
      drawrect(ctx,50,50,x*50+50,y*50+50); //draws the open squares
    }
  }

}

//class functions***************************************************************


class Component {
  //main class for the player and the monster
  constructor(x,y){
    //constructor for Component
    this.x = x;
    this.y = y;
    this.color = "FFFFFF";
  }

  draw(area){
    //draws the Component
      //used for Hero Class and Player Class
    drawFillRect(area,this.width,this.height,this.x+37.5,this.y+37.5,this.color); //draws the Component
  }
}

class Hero extends Component {
  //the player class also extends the Component
  constructor(x,y) {
    super(x,y) // Component constructor
    this.color = "#8A2BE2"; //color of player
    this.width = 25;
    this.height = 25;
    this.faceDirection = "right"; //direction to attack
    this.attackBelt = []; //array for attacks
    this.deck = fireDeck; //current deck
    this.hp = 10; //health
    this.maxHp = 10;
    this.armor = 0;
    this.mana = 10;
    this.maxMana = 10;
    this.int = 1;
    this.status = "alive" ;
    this.lvl = 1;
    this.pClass = "Pyro Wizard"; //class
    this.maxCards = 6;
    this.speed = 2; //moves per round
    this.moves = 2;
  }

  setHpBar(){
    //reset player health bar on screen
      //used in Hero.TakeDamge()
    let hpPct = this.hp/this.maxHp * 100; //find percent of hp to max hp
    $(".health-bar").css("width",hpPct+"%"); //set width to hp percent
    $("#health").text(``+this.hp+`/`+this.maxHp+``); //set health on screen to new hp
  }

  setManaBar(){
  //set the players mana bar on screen
    //used in Hero.UseMana(), and Upkeep()
    let manaPct = this.mana/this.maxMana * 100; //find percent of mana to max mana
    $(".mana-bar").css("width",manaPct+"%"); //sets width on screen to percent
    $("#mana").text(``+this.mana+`/`+this.maxMana+``); //sets text to new mana
  }

  takeDamge(dmg){
    //how the player takes damage
     //used in checkIfHit()
    let realdmg = 1; //set realdmg
    if (dmg - this.armor <= 0) {
      realdmg = 1; //if armor negates all damage still take one damage
    }else{
      realdmg = dmg - this.armor;// if attack makes it through armor find damage minus armor
    }

    if (this.hp - realdmg <=0 ) {
      this.status = "dead"; //if player's hp reach 0 status equals dead
      this.hp = 0; //set hp to zero
      this.setHpBar(); //reset health bar on screen
    }else{
      this.hp = this.hp - realdmg; //set players health to zero
      this.setHpBar(); //reset health bar on screen
    }

  }

  useMana(cost){
  //uses players mana based off cost of spell
    //used in clicking the attack
    if (this.mana - cost <= 0) {
      this.mana = 0; // if mana is zero set mana to zero
      this.setManaBar(); //resets mana bar
    }else{
      this.mana = this.mana - cost; //set mana to correct mana
      this.setManaBar(); //resets mana bar
    }
  }

  setStats(){
    //sets the onscreen stats of the player goes through the html and adds js varibles
      //used in gameBoardUpdate();
    $(".stat-box").html(`
      <p class="center">Class: `+this.pClass+` | Level: `+this.lvl+`</p>
      <hr>
      <div class="stats-flex">
        <div class="full-bar">
          <div class="health-bar">
            <p class="bar-amount | center" id="health">`+this.hp+`/`+this.maxHp+`</p>
          </div>

        </div>
        <div class="full-bar">
          <div class="mana-bar">
            <p class="bar-amount | center" id="mana">`+this.mana+`/`+this.maxMana+`</p>
          </div>
        </div>
      </div>
      <div class="stats-flex">
        <p>Armor: `+this.armor+`</p>
        <p>Intellegance: `+this.int+`</p>
      </div>
      `);
  }

  move(direction){
    //how the player moves
      //use when player presses the w,a,s,or d key
    let row = cordToNum(this.x); //finds player location on the game board row
    let column = cordToNum(this.y); //finds player location on the game board column
    if (this.moves != 0) { // moves doesn't equal zero let player move
      switch (direction) {
        case "down":
          if (this.y >= 175 || gameBoard[row][column + 1] == "closed") {
          }else{
            this.y += 50; //move player up
          }
          break;
        case "up":
          if (this.y <= 25 || gameBoard[row][column - 1] == "closed") {
          }else{
            this.y -= 50; //moves player down
          }
          break;
        case "right":
          if (this.x >= 175 || gameBoard[row + 1][column] == "closed") {
          }else{
            this.x += 50; //moves player right
          }
          break;
        case "left":
          if (this.x <= 25 || gameBoard[row - 1][column] == "closed") {
          }else{
            this.x -= 50; //moves player left
          }
          break;
        default:
      }
      this.moves -= 1; //take away a move
    }
  }

  attack(newAttack){
    //puts an attack in the attack array
      //used in pullcard()
    this.attackBelt.push(newAttack); //pushed the attack into the array
  }

  drawAttackCard(num, id){
  //draw the attack card onto the html
   //used in Pullcard() and updateAttackArray()
    $("#attack-box").append(`
      <div class="attack" id="atk-`+id+`">
        <p class="attack-title | center">`+this.deck[num].name+`</p>
        <div class="flex-box">
          <p class="attack-des">Dmg: `+this.deck[num].dmg+`</p>
          <p class="attack-des" >Cost: `+this.deck[num].cost+`</p>
          <i class="`+this.deck[num].class+`"></i>
          <picture class="attack-img">
            <img src="`+this.deck[num].img+`" alt="">
          </picture>

        </div>
      </div>
      `);
  }

  pullCard(){
    //function that pulls a new attack card for the player.

    //use if max cards aren't met
    if(this.attackBelt.length != this.maxCards){
      let max = Object.keys(this.deck).length; // find length of deck
      let num = random(0, max-1); //pick random number inbetween 0 and length of deck
      let id = this.attackBelt.length; //find length of player attack array
      //creates new attack card
      this.attack(new Attacks(this.deck[num].name, this.deck[num].type, this.deck[num].squance, id, this.deck[num].dmg, this.deck[num].cost, this.deck[num].team));
      this.drawAttackCard(num,id); //draw the card to the board
    }
  }
}

let player = new Hero(25,25); // create the hero for everything else

class Monster extends Component {
  constructor(x,y,type,id) {
    super(x,y) //component constructor
    this.type = type;
    this.width = 25;
    this.height = 25;
    this.color = "#568203";
    this.hp = 4;
    this.id = id;
    this.status = "alive";
    this.faceDirection = "up";
    this.lvl = 1;
    this.attackSlot = [];
    this.mana = 1;
  }

  setAttack(obj){
    //sets the attack from the monster deck.
      //used in Monster.setAttack()
    this.attackSlot.push(new Attacks(obj.name, obj.type, obj.squance, 0, obj.dmg, obj.cost, obj.team)); //create an attack and stores it.
  }

  findAttack(){
    //finds the attack needed in the monster deck
      //used in createMonster()
    let obj = monsterAttacks[this.type]; //finds the card based off the type of monster
    this.setAttack(obj); //saves the card to the monster
  }

  attackPlayer(x,y){
    //attacks the player if close enough
      //used in Monster.findPlayer()
    if (x == 1) {
      this.faceDirection = "left"; //changes monsters direction to left
      this.attackSlot[0].castAttack(this); //casts monster attack to the left
    }else if (x == -1) {
      this.faceDirection = "right"; //changes monsters direction to right
      this.attackSlot[0].castAttack(this); //casts monster attack to the right
    }else if (y == 1) {
      this.faceDirection = "up";//changes monsters direction to up
      this.attackSlot[0].castAttack(this); //casts monster attack to the up
    }else if (y == -1) {
      this.faceDirection = "down";//changes monsters direction to down
      this.attackSlot[0].castAttack(this); //casts monster attack to the down
    }else{
      console.log(" error can't attack") //errors if monster can't attack
    }
  }

  CreateNameCard(){
    //creates the monster card in the enemy box
      //used in createMonster(), and updateMonsterArray()

      //writes html to screen
    $("#enemy-box").append(`
      <div class="enemy-box" id="mon-`+this.id+`">
        <p class="enemy-title | center">Goblin</p>
        <div class="enemy-status">
          <p class="enemy-hp | center">Hp: `+this.hp+`</p>
        </div>
      </div>  `);
  }

  openAround(arr){
    //finds what locations are open around the monster
      //used in Monster.Move()
    let xBox = cordToNum(this.x); //finds monster row in gameboard array
    let yBox = cordToNum(this.y); //finds monsters column in gamebaord array
    const boxAround = ["open","open","open","open"]; //initalizes four cardnal directions around monster as open
    if (yBox - 1 < 0 || arr[xBox][yBox - 1] == "closed" ) {
      boxAround[0] = "closed"; //closed in north is closed
    }
    if (xBox + 1 > 3|| arr[xBox+1][yBox] == "closed" ) {
      boxAround[1] = "closed"; //closed if east is closed
    }
    if (yBox + 1 > 3  || arr[xBox][yBox + 1] == "closed" ) {
      boxAround[2] = "closed"; //closed if south is closed
    }
    if (xBox - 1 < 0 || arr[xBox - 1 ][yBox] == "closed" ) {
      boxAround[3] = "closed"; //closed if west is closed
    }
    return boxAround; //return the array
  }

  move(x,y){
  //moves the monster to an available spot
    //used in Monster.findPlayer()
    let arr = this.openAround(gameBoard); //finds all open spots around the monster

    if (Math.abs(x) > Math.abs(y)) { //checks if the player is close in the y or x axies
      if (x > 0 && arr[3] == "open") { //if x is positive player is west monster
        this.x -= 50; //move west if open
      }else if(arr[1] =="open"){
        this.x += 50; //move east if open
      }else if(y < 0 && arr[2] =="open"){
        this.y += 50; // move south if open
      }else if(arr[0] =="open"){
        this.y -= 50; // move north if open
      }else{
        console.log("can't move"); //error if no movements
      }
    }else{
      if (y > 0 && arr[0] == "open") {
        this.y -= 50; //move north if open
      }else if(arr[2] =="open"){
        this.y += 50; //move south if open
      }else if(x < 0 && arr[1] =="open"){
        this.x += 50; //move east if open
      }else if(arr[3] =="open"){
        this.x -= 50; //move west if open
      }else{
        console.log("can't move"); //error if can't move
      }
    }
    gameBoardUpdate(player, monArr); //reset the gameboard array
  }

  findPlayer(target){
    //finds where the player is from the monster
      //used in monstersTurn()
    let monsterX = cordToNum(this.x); //find monsters x in gameboard array
    let monsterY = cordToNum(this.y); //finds monster y in gameboard array
    let playerX = cordToNum(target.x); //finds players x in gameboard array
    let playerY = cordToNum(target.y); //finds players y in gameboard array
    let xAway = monsterX - playerX; //checks what direction the player is on the x axies
    let yAway = monsterY - playerY; //checks what direction the player is on the y axies

    if (xAway + yAway == 1 || xAway + yAway == -1) {
      this.attackPlayer(xAway,yAway); //attacks player if player is within one square
    }else{
      this.move(xAway,yAway); //moves towards player
    }
  }

  takeDamge(dmg){
    //what to do when monster takes damage
      //used in checkIfHit()
    if (this.hp-dmg <=0 ) { //if damage sets monster to zero or past zero
      this.hp = 0; //set hp to zero
      this.status = "dead"; //change status to dead
      score += 10; //add 10 to score
      $("#mon-" + this.id).html(`
        <p class="enemy-title | center">Goblin</p>
        <div class="enemy-status">
          <p class="enemy-hp | center">Hp: `+this.hp+`</p>
        </div>
          `); //change monsters health on screen
          return "dead"; //return dead
    }else{
      this.hp -= dmg; //if not dead take damage and remove from health
      $("#mon-" + this.id).html(`
        <p class="enemy-title | center">Goblin</p>
        <div class="enemy-status">
          <p class="enemy-hp | center">Hp: `+this.hp+`</p>
        </div>
          `); //change health on monsters card
          return "alive"; //return alive
    }
  }
}

class Attacks {
  constructor(name, type, squance, id, dmg, cost,team) {
    this.name = name;
    this.type = type
    this.squance = squance;
    this.id = id;
    this.dmg = dmg;
    this.cost = cost;
    this.team = team;
  }

  newDirection(num,direction){

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
            checkIfHit(player,monArr,this.team,x,y,this)

          break;
          case 2:
            x +=50;
            y -=50;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,this.team,x,y,this)
          break;
          case 3:
            x +=50;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,this.team,x,y,this)

          break;
          case 4:
            x +=50 ;
            y +=50;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,this.team,x,y,this)
          break;
          case 5:

            y +=50;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,this.team,x,y,this)
          break;
          case 6:
            x -=50;
            y +=50;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,this.team,x,y,this)
          break;
          case 7:
            x -=50;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,this.team,x,y,this)
          break;
          case 8:
            x -=50;
            y -=50;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,this.team,x,y,this)
          break;
          case 0:
            x = caster.x-25;
            y = caster.y-25;
            drawFillRect(ctx,50,50,x+50,y+50,"#AA0000")
            checkIfHit(player,monArr,this.team,x,y,this)
          break;
          default:

        }

    }
  }



}



//game buttons******************************************************************

$(document).keydown(function(e){
  if (gameStatus == 1) {
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
  }

})

function createMonster(x,y,type,arr){
  let monsterID = arr.length;
  arr.push(new Monster(x,y,type,monsterID));
  arr[monsterID].CreateNameCard();
  arr[monsterID].findAttack();
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

$("#attack-box").on("click", ".direction-button",function(){
  changeAttackDirection(player)
})



$("#attack-box").on("click", ".attack",function(){
  if (gameStatus == 1) {
    let str = $(this).attr("id")
    let arr = str.split("-")
    let num = parseInt(arr[1])
    if (player.mana - player.attackBelt[num].cost < 0) {

    }else{
      player.useMana(player.attackBelt[num].cost )
      player.attackBelt[num].castAttack(player)
      player.attackBelt = updateAttackArray(player.attackBelt, num, player)
      gameStatus = 0;
      turns++;
    }

  }

})

$("#attack-box").on("click",".draw-card",function(){
  if (player.attackBelt.length != player.maxCards) {
    player.pullCard()
    gameStatus = 0;
  }


})

function updateAttackArray(arr,oldId,caster){
  let newArr= [];
  let counter = 0;
  let num;
  $("#attack-box").html(`
      <p class="center">Attacks</p>
      <button class="draw-card | button-class" type="button" name="button">Draw Card</button>
      <button class="| button-class" id="rest" type="button" name="button">Rest</button>
        <button class="direction-button | button-class" type="button" name="button">Switch Direction</button>
        <p class="center no-margin" id="direction-text">Current Direction: `+caster.faceDirection+ `</p>
      <hr>
    </div>
    `)

  for (var i = 0; i < arr.length; i++) {
    if (i == oldId) {

    }else{
      newArr.push(arr[i]);
      arr[i].id = counter;
      for (var j = 0; j < Object.keys(caster.deck).length; j++) {
        if (caster.deck[j].name == arr[i].name) {
          num = j;

          break;
        }
      }
      caster.drawAttackCard(num,counter)
      counter++
    }

  }
  return newArr
}
function updateScore(){
  $("#score").text("Score : "+score+ " | Turns: " + turns)
}

function monstersTurn(arr){
  for (var i = 0; i < arr.length; i++) {
    arr[i].findPlayer(player)
  }

}
function upKeep(){
  if (player.mana != player.maxMana) {
    player.mana +=1;
    player.setManaBar()
  }
  updateScore();
}

$("#attack-box").on("click", "#rest",function(){

  if (player.mana + 2 > player.maxMana) {
    console.log("overload");
  }else{
    player.mana +=2;
    gameStatus = 0;
  }
})

//lives

//status effects

//game frames
function updateGame(){
  clearCanvas()
  drawboard()
  player.draw(ctx)
  drawMonsters(monArr)
  if (monArr.length == 0) {
    createNewMonsters(3,3)
  }
  if (gameStatus == 0) {
    monstersTurn(monArr)
    upKeep()
    player.pullCard();
    player.moves = player.speed;
    gameStatus = 1;
  }
}


function gameStart(){

  gameBoardUpdate(player,monArr);
  player.setStats();
  createNewMonsters(3,3);
  player.pullCard();
  player.pullCard();
  player.pullCard();
  setInterval(function () {
    updateGame()
  }, 20);
}

gameStart();
