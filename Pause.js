let paused = false;

function togglePause(){
paused = !paused;

document.getElementById("pauseScreen").style.display =
paused ? "block" : "none";
}
