let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let colorSelection = 0xe; // startvalue color selection
let jsonObj = "";
let ega = ["#000000", "#0000aa", "#00aa00", "#00aaaa", "#aa0000", "#aa00aa", "#aa5500", "#aaaaaa", "#ffffff", "#5555ff", "#55ff55", "#55ffff", "#ff5555", "#ff55ff", "#ffff55", "#555555"]; // colors
let pallet = [];
let drawing = [];
let boxWidth = boxHeight = 40;
let refreshTimer = window.setInterval(serverGetJson, 2000); // timer get data from server
class Bit {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.colorBit = false;
    addEventListener('mousedown', (e) => {
      let box = canvas.getBoundingClientRect();
      let mouseX = e.clientX - box.left; // is mouse in the box?
      let mouseY = e.clientY - box.top; // is mouse in the box?
      if (mouseX > this.x && mouseX < this.x + boxWidth && mouseY > this.y && mouseY < this.y + boxHeight) {
        if (this.colorBit) {
          colorSelection = this.color;
        } else {
          this.color = colorSelection;
          this.draw(context);
          serverWriteJson(drawing);
        }
      }
    })
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = ega[this.color];
    context.rect(this.x, this.y, boxWidth, boxHeight);
    context.stroke();
    context.fill();
    context.closePath();
  }
}




function init() {
  context.canvas.width = 12 * boxWidth; // set canvas width
  context.canvas.height = 8 * boxHeight; // set canvas height
  // init pallet
  for (let i = 0; i < 0x10; i++) {
    let numOnRow = 2;
    let bitWidth = boxWidth;
    let x = 10*boxWidth + (i % numOnRow) * bitWidth;//pallet starts at position 11 
    let y = Math.floor(i / numOnRow) * bitWidth;
    let bit = new Bit(x, y, i);
    bit.colorBit = true;
    bit.draw(context);
    pallet.push(bit);
  }
  // init playfield
  for (i = 0; i < 80; i++) {
    //grid 10 cols x 8 rows
    let numOnRow = 10;
    let bitWidth = boxWidth;
    let x = (i % numOnRow) * bitWidth;
    let y = Math.floor(i / numOnRow) * bitWidth;
    let bit = new Bit(x, y, 0xf); // 0xf background color from ega array
    bit.draw(context);
    drawing[i] = bit; //opslag van de tekening tbv export naar json
  }
}

function readJson(jsonString) {
  jsonObj = JSON.parse(jsonString);
  for (i = 0; i < 80; i++){
  drawing[i].x = jsonObj[i].x;
  drawing[i].y = jsonObj[i].y;
  drawing[i].color = jsonObj[i].color;
  drawing[i].draw(context);
  }}

init();

