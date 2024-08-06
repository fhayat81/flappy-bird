let game = "start";
let background = document.querySelector(".background").getBoundingClientRect();
let score = document.querySelector("#score");
let msg = document.querySelector(".message");
let msg1 = document.querySelector("#title");
let msg2 = document.querySelector("#m1");
let msg3 = document.querySelector("#m2");
let music = new Audio("soundTrack/01-main-theme-overworld.mp3");
let dead = new Audio("soundTrack/08-you-re-dead.mp3");
let point = new Audio("soundTrack/point.mp3");
let bird = document.querySelector(".bird-img");
let birdPos = bird.getBoundingClientRect();

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    msg.style.display = "none";
    game = "play";
    play();
  }
});

document.addEventListener("touchstart", (e) => {
  msg.style.display = "none";
  game = "play";
  play();
});

let birdChng = 0;

document.addEventListener("keydown", (e) => {
  if ((e.key === "ArrowUp" || e.key === " ") && game === "play") {
    birdChng = -7;
    bird.src = "./assets/bird-down.png";
  }
});

document.addEventListener("touchstart", (e) => {
  console.log(e);
  birdChng = -7;
  bird.src = "./assets/bird-down.png";
});

document.addEventListener("keyup", (e) => {
  if ((e.key === "ArrowUp" || e.key === " ") && game === "play") {
    bird.src = "./assets/bird-up.png";
  }
});

document.addEventListener("touchend", (e) => {
  bird.src = "./assets/bird-up.png";
});

function play() {
  music.play();
  music.loop = true;

  function fall() {
    if (game != "play") return;
    let gravity = 0.5;
    birdChng += gravity;

    if (birdPos.top <= 0 || birdPos.bottom >= background.bottom) {
      game = "end";
      music.pause();
      dead.play();
      msg1.innerHTML = "Game Over";
      msg1.style.color = "red";
      msg.style.display = "flex";
      msg2.remove();
      msg3.remove();
      setTimeout(() => {
        window.location.reload();
      }, [3000]);
    }

    bird.style.top = birdPos.top + birdChng + "px";
    birdPos = bird.getBoundingClientRect();
    requestAnimationFrame(fall);
  }
  requestAnimationFrame(fall);

  let pipeGapLength = 0;
  let gap = 40;
  function createPipe() {
    if (game != "play") return;
    if (pipeGapLength >= 110) {
      pipeGapLength = 0;
      let pipePos = Math.floor(Math.random() * 50);

      let pipe = document.createElement("div");
      pipe.style.top = pipePos - 60 + "vh";
      pipe.className = "pipe";
      document.body.appendChild(pipe);

      let pipe2 = document.createElement("div");
      pipe2.style.top = pipePos + gap + "vh";
      pipe2.className = "pipe";
      document.body.appendChild(pipe2);
    }
    pipeGapLength++;
    requestAnimationFrame(createPipe);
  }
  requestAnimationFrame(createPipe);

  setInterval(()=>{
    if(game === "play"){
      if(parseInt(score.innerHTML)%100 === 0) point.play();
      score.innerHTML = parseInt(score.innerHTML) + 1;
    }
  }, [500])

  function move() {
    if (game != "play") return;

    let move_speed = 3;
    let pipes = document.querySelectorAll(".pipe");
    pipes.forEach((element) => {
      let elementPos = element.getBoundingClientRect();
      let birdPos = bird.getBoundingClientRect();
      if (elementPos.right <= 0) {
        element.remove();
      }
      if (
        birdPos.right - 5 > elementPos.left &&
        birdPos.left + 7 < elementPos.right &&
        birdPos.bottom - 3> elementPos.top &&
        birdPos.top + 3 < elementPos.bottom
      ) {
        game = "end";
        music.pause();
        dead.play();
        msg1.innerHTML = "Game Over";
        msg1.style.color = "red";
        msg.style.display = "flex";
        msg2.remove();
        msg3.remove();
        setTimeout(() => {
          window.location.reload();
        }, [3000]);
      } 
      element.style.left = elementPos.left - move_speed + "px";
    });

    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);
}
