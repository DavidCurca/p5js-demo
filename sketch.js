let typeOfGrowing = true;
let changeRate = 1;
let img,times = 0;
let imgWidth = 1024, imgHeight = 1024;
let ruri = new Array(1024);
let guri = new Array(1024);
let buri = new Array(1024);

for(let i = 0; i < 1024; i++){
  ruri[i] = new Array(1024);
  guri[i] = new Array(1024);
  buri[i] = new Array(1024);
}

function preload() {
  img = loadImage('assets/p5logo.png');
}

function setup() {
  createCanvas(1024, 1024);
  image(img, 0, 0, width, height);
  frameRate(1);
  loadPixels();
  background(220);
  const d = pixelDensity();

  for (let x = 0; x < imgWidth; x++) {
    for (let y = 0; y < imgHeight; y++) {
      const i = 4 * d*(y * d*width + x);
      const [r, g, b] = [pixels[i], pixels[i + 1], pixels[i + 2]];
      ruri[x][y] = r; guri[x][y] = g; buri[x][y] = b;
    }
  }
}

function draw() {
  image(img, 0, 0, width, height);
  loadPixels();
  background(255);
  
  if(changeRate == 1){
    changeRate = 2;
    image(img, 0, 0, width, height);
  }else{
    let newruri = new Array(1024);
    let newguri = new Array(1024);
    let newburi = new Array(1024);

    for(let i = 0; i < 1024; i++){
      newruri[i] = new Array(1024);
      newguri[i] = new Array(1024);
      newburi[i] = new Array(1024);
    }

    let indexY = 0;
    let indexX = 0;
    for (let x = 0; x < imgWidth; x+=changeRate) {
      for (let y = 0; y < imgHeight; y+=changeRate) {
        indexY++;
        noStroke()
        avR = (ruri[x][y]+ruri[x][y+1]+ruri[x+1][y]+ruri[x+1][y+1])/4;
        avG = (guri[x][y]+guri[x][y+1]+guri[x+1][y]+guri[x+1][y+1])/4;
        avB = (buri[x][y]+buri[x][y+1]+buri[x+1][y]+buri[x+1][y+1])/4;
        fill(avR,avG, avB);
        newruri[indexX][indexY] = avR;
        newguri[indexX][indexY] = avG;
        newburi[indexX][indexY] = avB;
        let size =  min(changeRate, 1024);
        ellipse(x+size/2, y+size/2,  size, size);
        rect(x, y, size, size, 30);
      }
      indexX++;
    }
    if(typeOfGrowing){
      changeRate *= 4;
    }else{
      changeRate /= 4;
    }
    for(let i = 0; i <= imgWidth/changeRate; i++){
      for(let j = 0; j <= imgHeight/changeRate; j++){
        ruri[i][j] = newruri[i][j];
        guri[i][j] = newguri[i][j];
        buri[i][j] = newburi[i][j];
      }
    }
    if(changeRate == 8192){
      typeOfGrowing = false;
    }else if(changeRate == 8){
      typeOfGrowing = true;
    }
  }
}
