function startGame(){
document.getElementById("menu").style.display="none";
initGame();
}

window.onload = () => {
let hs = localStorage.getItem("highScore") || 0;
document.getElementById("highScore").innerText = hs;
}
