
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var scale = canvas.width/10;

var player = {
  x: Math.floor(Math.random()*canvas.width/scale),
  y: Math.floor(Math.random()*canvas.height/scale),
  score: 0,
  direction: 0
}



var tailLength = 0;
var tail = new Array();

function spawnApple(){
  document.getElementById("score").innerHTML = "Score: " + tailLength;
  window.apple = {
    x: Math.floor(Math.random()*canvas.width/scale),
    y: Math.floor(Math.random()*canvas.height/scale)
  }
}

/* Direction:
  0 = upp
  1 = höger
  2 = ner
  3 = vänster
*/

spawnApple();
draw();


var lastMove = Date.now();



function draw(){

  if(player.x == apple.x && player.y == apple.y){
    tailLength++;
    spawnApple();
  }

  if(player.y < 0) player.y = (canvas.height/scale)-1;
  if(player.x < 0) player.x = (canvas.width/scale)-1;

  if(player.y > (canvas.height/scale)-1) player.y = 0;
  if(player.x > (canvas.width/scale)-1) player.x = 0;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for(let i = 0; i < (canvas.width/scale); i++){
    ctx.fillStyle = "black";
    ctx.fillRect(i*scale, 0, 1, canvas.height);
    ctx.fillRect(0, i*scale, canvas.width, 1);
  }

  if(Date.now() - lastMove > 100){

    tail.splice(0, 0, {x: player.x, y: player.y});

    /* Move player forward in direction */
    lastMove = Date.now();
    if(player.direction === 0) player.y--;
    if(player.direction === 1) player.x++;
    if(player.direction === 2) player.y++;
    if(player.direction === 3) player.x--;
  }

  ctx.fillStyle = "green";
  ctx.fillRect(player.x*scale, player.y*scale, scale, scale);

  for(let i = 0; i < tailLength; i++){
    ctx.fillRect(tail[i].x*scale, tail[i].y*scale, scale, scale);
  }

  while(tailLength+1 < tail.length){
    tail.splice(tail.length-1, 1);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(apple.x*scale, apple.y*scale, scale, scale);


  for(let i = 0; i < tail.length; i++){
    if(player.x == tail[i].x && player.y == tail[i].y){
      endGame();
      return;
    }
  }

  requestAnimationFrame(draw);
}

function endGame(){
document.getElementById("score").innerHTML ="You lost! - Reload the page to play again! Score: " + tailLength;
}

document.body.addEventListener("keydown", function(e){
  if(e.keyCode == 38) player.direction = 0;
  if(e.keyCode == 39) player.direction = 1;
  if(e.keyCode == 40) player.direction = 2;
  if(e.keyCode == 37) player.direction = 3;

});
