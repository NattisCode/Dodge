let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

// IMAGES
let playerImg = new Image();
playerImg.src = "images/player.png";

let enemyImg = new Image();
enemyImg.src = "images/enemy.png";

let bgImg = new Image();
bgImg.src = "images/bg.jpg";

// GAME STATE
let player, obstacles, score;
let left=false, right=false;

// RESIZE
function resize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// START GAME
function initGame(){

player = {
x: canvas.width/2 - 25,
y: canvas.height - 100,
size: 50,
speed: 7
};

obstacles = [];
score = 0;

// SPAWN
setInterval(()=>{
obstacles.push({
x: Math.random()*(canvas.width-50),
y: -50,
size: 50,
speed: 3 + Math.random()*4
});
}, 700);

gameLoop();
}

// CONTROLS
document.addEventListener("keydown", e=>{
if(e.key==="ArrowLeft") left=true;
if(e.key==="ArrowRight") right=true;
});

document.addEventListener("keyup", e=>{
if(e.key==="ArrowLeft") left=false;
if(e.key==="ArrowRight") right=false;
});

canvas.addEventListener("touchstart", e=>{
if(e.touches[0].clientX < canvas.width/2) left=true;
else right=true;
});

canvas.addEventListener("touchend", ()=>{
left=false;
right=false;
});

// LOOP
function gameLoop(){

if(!paused){

// BACKGROUND
ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

// MOVE
if(left && player.x > 0) player.x -= player.speed;
if(right && player.x < canvas.width - player.size) player.x += player.speed;

// GLOW
ctx.shadowColor = "white";
ctx.shadowBlur = 15;

// PLAYER
ctx.drawImage(playerImg, player.x, player.y, player.size, player.size);
ctx.shadowBlur = 0;

// ENEMIES
obstacles.forEach(o=>{
o.y += o.speed;

ctx.drawImage(enemyImg, o.x, o.y, o.size, o.size);

// COLLISION
if(
player.x < o.x + o.size &&
player.x + player.size > o.x &&
player.y < o.y + o.size &&
player.y + player.size > o.y
){
playBeep();

// SAVE SCORE
let hs = localStorage.getItem("highScore") || 0;
if(score > hs){
localStorage.setItem("highScore", score);
}

alert("💀 Game Over! Score: " + score);
location.reload();
}
});

// CLEAN
obstacles = obstacles.filter(o=>o.y < canvas.height);

// SCORE
score++;
document.getElementById("score").innerText = score;

}

requestAnimationFrame(gameLoop);
}
