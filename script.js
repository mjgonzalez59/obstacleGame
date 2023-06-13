document.onkeydown = (event) => {
  const square = document.querySelector(".square");
  audioGame.play();
  if(event.keyCode == 38){
    square.classList.add("animateSquare");
    setTimeout(() => {
      square.classList.remove("animateSquare");
    }, 700);
  }
  const distance = 100;
  if(event.keyCode == 39){
    squareX = parseInt(window.getComputedStyle(square, null).getPropertyValue("left"));
    square.style.left = (squareX + distance) + "px";
  }
  if(event.keyCode == 37){
    squareX = parseInt(window.getComputedStyle(square, null).getPropertyValue("left"));
    square.style.left = (squareX - distance) + "px";
  }
}

const updateScore = (scoreNum, scoreClass, text) => {
  const scoreDiv = document.querySelector(`.${scoreClass}`);
  scoreDiv.innerHTML = `${text}: ` + scoreNum;
}

const updateHighScore = (newScore) => {
  if(newScore > highScore){
    highScore = newScore;
    updateScore(highScore, "highScoreCount", "High Score");
  }
  localStorage.setItem("obtacleHighScore", highScore);
}

const getHighScore = () => {
  highScore = localStorage.getItem("obtacleHighScore");
  if(highScore === null){
    console.log("It does not exist");
    localStorage.setItem("obtacleHighScore", 0);
  } else {
    highScore = parseInt(localStorage.getItem("obtacleHighScore"));
  }
  updateScore(highScore, "highScoreCount", "High Score");
  return highScore;
}

let score = 0;
let crossed = true;
const audioGameOver = new Audio("gameover.mp3");
const audioGame = new Audio("audioGame.mp3");

window.onload = ("load", (event) => {
  const highestScore = getHighScore();
});


setInterval( () => {
  const square = document.querySelector(".square");
  const gameOver = document.querySelector(".gameOver");
  const obstacle = document.querySelector(".obstacle");
  const squarePositionX = parseInt(window.getComputedStyle(square, null).getPropertyValue("left")) ;
  const squarePositionY = parseInt(window.getComputedStyle(square, null).getPropertyValue("top"));
  
  const obstaclePositionX = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("left"));
  const obstaclePositionY = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("top"));

  const offSetX = Math.abs(squarePositionX - obstaclePositionX);
  const offSetY = Math.abs(squarePositionY - obstaclePositionY);

  if(offSetX < 42 && offSetY < 52){
    audioGame.pause();
    audioGameOver.play();
    gameOver.innerText = "Game Over";
    gameOver.style.fontSize = "10vw";
    obstacle.classList.remove("animateObstacle");
    setTimeout(() => {
      // audioGameOver.pause();
    }, 1000);
  }else if(50 > offSetX && offSetX < 190 && offSetY < 190 && crossed){
    crossed = false;
    setTimeout(() => {
      crossed = true;
    }, 1000);
    score+=1;
    updateScore(score, "scoreCount", "Your Score");
    updateHighScore(score);
    setTimeout(() => {
      animationDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration"));
      newDuration = animationDur - 0.1;
      obstacle.style.animationDuration = newDuration + "s";
    }, 500);
  }
}, 100);

