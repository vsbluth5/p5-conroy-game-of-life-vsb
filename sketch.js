let boardWidth;
let boardHeight;
let fallSpeed;
let gravity
let score;
let gapSize;
let gems;
let prevX, prevY;
let blueImage, blueGem, redImage, redGem;

function setup() {
  createCanvas(400, 600);
  colorMode(HSL, 360)
  newGame();
}

function draw() {
  background(220, 90, 10);
  // add scoring
  text("score: " + score, 50, 200);

}

function mousePressed() {

}

function newGame() {
  boardWidth = 8;
  boardHeight = 8;
  blueImage = loadImage("https://cdn.glitch.com/5edd7c70-2d70-47e5-97ef-05e0c0718b7d%2Fblue.png.png?v=1623289767088");
  blueGem = {"sourcee":"https://cdn.glitch.com/5edd7c70-2d70-47e5-97ef-05e0c0718b7d%2Fblue.png.png?v=1623289767088" ,"color":"blue"}
  

}

class Gem {
  constructor(col){
    this.color = col;
  }
}

class Board {
  constructor(r, c){
    this.rows = r;
    this.cols = c;
    this.gems = [this.rows][this.cols];
    
  }
}
