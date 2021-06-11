let boardWidth;
let boardHeight;
let iterations;
let liveCellImage;
let adding;
let running;
let message;
let size;
let popSound, sighSound, popSound2;
let osc, freq, amp;

let petrieDish;

function setup() {
  boardWidth = 100;
  boardHeight = 100;
  size = 6;

  colorMode(HSB, 360, 100, 100, 1);

  popSound = loadSound(
    "https://cdn.glitch.com/7a34e2d8-bdb8-42a0-9e02-02f035677157%2Fpop.wav.wav?v=1623370544079"
  );
  sighSound = loadSound(
    "https://cdn.glitch.com/7a34e2d8-bdb8-42a0-9e02-02f035677157%2Fsigh.mp3?v=1623370540063"
  );

  liveCellImage = loadImage(
    "https://cdn.glitch.com/5edd7c70-2d70-47e5-97ef-05e0c0718b7d%2Fgreen2.png?v=1623289735274"
  );

  osc = new p5.Oscillator("sine");
  petrieDish = new Board(boardHeight, boardWidth);
  newGame();

  createCanvas(boardWidth * size + 10, boardHeight * size + 80);
}

function draw() {
  background(220, 90, 20, 1);
  // add scoring
  fill(220, 0, 100, 1);
  textSize(18);
  text(message, 50, height - 60);
  text("iteration: " + iterations, 50, height - 20);
  // Draw the logo at the new position.
  petrieDish.draw();

  // freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  // amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

  if (running) {
    petrieDish.checkNeighbors();
    iterations++;

    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }
}

function mousePressed() {
  if (adding) {
    popSound.play();
    petrieDish.addCells(mouseX, mouseY);
  }
}

function keyPressed() {
  // console.log(`${key} ${keyCode}`)
  if (key === " " && !adding) {
    adding = true;
    running = false;

    // ramp amplitude to 0 over 0.5 seconds
    osc.amp(0, 0.5);

    message =
      "Add cells by clicking the mouse at locations \nPress ENTER to play.";
  } else if (keyCode === ENTER && !running && adding) {
    adding = false;
    running = true;
    message =
      "Press the space bar to pause and add more, \n or press Enter again to reset";
    osc.start();
  } else if (keyCode === ENTER && running && !adding) {
    // ramp amplitude to 0 over 0.5 seconds
    osc.amp(0, 0.5);
    newGame();
  }
}

function newGame() {
  iterations = 0;
  message = "To add live cells, press the space bar";
  adding = false;
  running = false;
  petrieDish.reset();
  petrieDish.draw();
}

class Board {
  constructor(r, c) {
    this.rows = r;
    this.cols = c;
    this.numAlive = 0;
    this.cells = [];
    for (let r = 0; r < this.rows; r++) {
      this.cells[r] = [];
      for (let c = 0; c < this.cols; c++) {
        this.cells[r][c] = "empty";
        // this.cells[r][c] = "alive";
      }
    }
    this.neighbors = [];
    for (let r = 0; r < this.rows; r++) {
      this.neighbors[r] = [];
      for (let c = 0; c < this.cols; c++) {
        this.neighbors[r][c] = 0;
      }
    }
  } // end of constructor

  draw() {
    noStroke();
    this.numAlive = 0:
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.neighbors[r][c] == 3) {
          fill(220, 20, 85, 1);
        } else if (this.neighbors[r][c] == 0) {
          fill(220, 90, 10, 1);
        } else if (this.neighbors[r][c] < 2) {
          fill(220, 90, 20, 0.5);
        } else if (this.neighbors[r][c] == 2) {
          fill(220, 20, 100, 0.5);
        } else if (this.neighbors[r][c] >= 4) {
          fill(220, 80, 60, 0.5);
        }

        rect(c * size + 5, r * size + 5, size, size);
        if (this.cells[r][c] == "alive") {
          image(liveCellImage, c * size + 5, r * size + 5, size, size);
          this.numAlive++;
        }
      }
    }
    freq = constrain(map(this.numAlive, 0, this.rows*this.cols, 100, 500), 100, 500);
    amp = constrain(map(this.numAlive, this.rows*this.cols, 0, 0, 1), 0, 1);
  } // end of draw

  addCells(x, y) {
    // Let's add 9 cells centered at x,y
    // console.log("Mouse at ("+x+", "+y+")")
    let startR = Math.floor(y / size) - 2;
    if (startR <= 0) startR = 0;
    else if (startR + 3 >= this.rows) startR = this.rows - 3;

    let startC = Math.floor(x / size) - 2;
    if (startC < 0) startC = 0;
    else if (startC + 3 > this.cols) startC = this.cols - 3;
    // console.log(`(startR, startC) = (${startR}, ${startC})`);
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        this.cells[r + startR][c + startC] = "alive";
      }
    }
  } // end addCells

  checkNeighbors() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.neighbors[r][c] = 0;
        if (r != 0 && c != 0 && this.cells[r - 1][c - 1] == "alive")
          this.neighbors[r][c]++;
        if (r != 0 && this.cells[r - 1][c] == "alive") this.neighbors[r][c]++;
        if (c != 0 && this.cells[r][c - 1] == "alive") this.neighbors[r][c]++;
        if (
          r != this.rows - 1 &&
          c != this.cols - 1 &&
          this.cells[r + 1][c + 1] == "alive"
        )
          this.neighbors[r][c]++;
        if (r != this.rows - 1 && this.cells[r + 1][c] == "alive")
          this.neighbors[r][c]++;
        if (c != this.cols - 1 && this.cells[r][c + 1] == "alive")
          this.neighbors[r][c]++;
        if (r != 0 && c != this.cols - 1 && this.cells[r - 1][c + 1] == "alive")
          this.neighbors[r][c]++;
        if (r != this.rows - 1 && c != 0 && this.cells[r + 1][c - 1] == "alive")
          this.neighbors[r][c]++;
      }
    } // end counting neighbors

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.neighbors[r][c] == 3) {
          this.cells[r][c] = "alive";
        } else if (this.neighbors[r][c] < 2 || this.neighbors[r][c] >= 4) {
          this.cells[r][c] = "empty";
        } else if (this.neighbors[r][c] == 2) {
        }
      }
    } // end of reassigning status
  } // end of checkNeighbors

  reset() {
    this.numAlive = 0:
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.cells[r][c] = "empty";
      }
    }
    
     for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.neighbors[r][c] = 0;
      }
    }
  } // end of reset
} // end of Board
