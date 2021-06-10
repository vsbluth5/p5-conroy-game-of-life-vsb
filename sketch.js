let boardWidth;
let boardHeight;
let fallSpeed;
let gravity
let score;
let gapSize;
let jewels;
let prevX, prevY;
let blueImage, blueGem;
let redImage, redGem;
let yellowImage, yellowGem;
let greenImage, greenGem;
let purpleImage, purpleGem;
let pinkImage, pinkGem;
let orangeImage, orangeGem;

let gameBoard;;

function setup() {
  createCanvas(400, 600);
  colorMode(HSB, 360);
  boardWidth = 8;
  boardHeight = 9;
  blueImage = loadImage("https://cdn.glitch.com/5edd7c70-2d70-47e5-97ef-05e0c0718b7d%2Fblue.png.png?v=1623289767088");
  redImage = loadImage("https://cdn.glitch.com/5edd7c70-2d70-47e5-97ef-05e0c0718b7d%2Fred.png.png?v=1623289770888")
  yellowImage = loadImage("https://cdn.glitch.com/5edd7c70-2d70-47e5-97ef-05e0c0718b7d%2Fyellow.png.png?v=1623289793357")
  greenImage = loadImage("https://cdn.glitch.com/5edd7c70-2d70-47e5-97ef-05e0c0718b7d%2Fgreen2.png?v=1623289735274")
  purpleImage = loadImage("https://cdn.glitch.com/5edd7c70-2d70-47e5-97ef-05e0c0718b7d%2Fpurple.png.png?v=1623289756175")
  pinkImage = loadImage("https://cdn.glitch.com/5edd7c70-2d70-47e5-97ef-05e0c0718b7d%2Fpink.png.png?v=1623289743473")
  orangeImage = loadImage("https://cdn.glitch.com/5edd7c70-2d70-47e5-97ef-05e0c0718b7d%2Forange.png.png?v=1623289759358")
  
  blueGem = {"source": blueImage, "color":"blue"}
  redGem = {"source": redImage, "color":"red"}
  yellowGem = {"source": yellowImage, "color":"yellow"}
  greenGem = {"source": greenImage, "color":"green"}
  purpleGem = {"source": purpleImage, "color":"purple"}
  pinkGem = {"source": pinkImage, "color":"pink"}
  orangeGem = {"source": orangeImage, "color":"orange"}
  
  
  jewels = [blueGem, redGem, greenGem, purpleGem, pinkGem, yellowGem, orangeGem];
  newGame();
}

function draw() {
  background(220, 90, 10);
  // add scoring
  stroke(220, 0, 100)
  textSize(20)
  text("score: " + score, 50, 520);
  // Draw the logo at the new position.
  gameBoard.draw();
  

}

function mousePressed() {

}

function newGame() {
  
  gameBoard = new Board(boardHeight, boardWidth)
  
}


class Board {
  constructor(r, c){
    this.rows = r;
    this.cols = c;
    this.gems = [];
    for (let r = 0; r < this.rows; r++ ){
      this.gems[r] = [];
      for (let c = 0; c < this.cols; c++){
        let jewel = random(jewels);
        // console.log(jewel)
        this.gems[r][c] = jewel;
      }
    }
    
  }
  draw(){
    for (let r = 1; r < this.rows; r++ ){
      for (let c = 0; c < this.cols; c++){
        image(this.gems[r][c].source, c*50, r*50, 50, 50);
      }
    }
  }
}
