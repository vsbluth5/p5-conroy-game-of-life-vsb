let boardWidth;
let boardHeight;
let fallSpeed;
let gravity
let score;
let gapSize;
let jewels;
let prevX, prevY;
let blueImage, blueGem;
let gameBoard;;

function setup() {
  createCanvas(400, 600);
  colorMode(HSL, 360)
  newGame();
}

function draw() {
  background(220, 90, 10);
  // add scoring
  stroke(360, 0, 100)
  textSize(16)
  text("score: " + score, 50, 20);
  // Draw the logo at the new position.
  gameBoard.draw();
  

}

function mousePressed() {

}

function newGame() {
  boardWidth = 8;
  boardHeight = 8;
  blueImage = loadImage("https://cdn.glitch.com/5edd7c70-2d70-47e5-97ef-05e0c0718b7d%2Fblue.png.png?v=1623289767088");
  blueGem = {"source": blueImage, "color":"blue"}
  jewels = [blueGem];
  gameBoard = new Board(boardWidth, boardHeight)
  
}


class Board {
  constructor(r, c){
    this.rows = r;
    this.cols = c;
    this.gems = [];
    for (let r = 0; r < this.rows; r++ ){
      this.gems[r] = [];
      for (let c = 0; c < this.cols; c++){
        let jewel = jewels[random(jewels.length)];
        this.gems[r][c] = jewel;
        
      }
    }
    
  }
  draw(){
    for (let r = 0; r < this.rows; r++ ){
      for (let c = 0; c < this.cols; c++){
        image(blueGem.source, i*50, j*50, 50, 50);
      }
    }
  }
}
