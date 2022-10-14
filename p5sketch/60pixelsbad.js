let cnvsSize = [600, 400];
let oImg;
let ratioImgOrg = 1;

function preload() {
  oImg = loadImage("assets/photos/nowork.jpg");
}

function setup() {
  createCanvas(...cnvsSize);
  background(0);

  frameRate(1);
  pixelDensity(1); // ***
  
  ratioImgOrg *= 1;
  image(oImg, 0, 0, cnvsSize[0], cnvsSize[1], 0, 0, cnvsSize[0] * ratioImgOrg, cnvsSize[1] * ratioImgOrg);
  // ( video, x, y, (w), (h), startX, startY, copyW, copyH )
  // image after resize canvas, copy orginal size, then resize to new image size.
  // image is copy at every frame, why resize not for each time ?

  recolor();
}

function draw() {
  //recolor();
}

function mousePressed() {
  noLoop();
}

function recolor() {

  // let pink = color(255, 102, 204);
  let r, g, b, alp;
  let gry;

  let i=0;
  let thisPixColor = [];
  let dotsize = 2;
  
  loadPixels();
  for (let fy = 0; fy < height; fy += dotsize) {
    for (let fx = 0; fx < width; fx += dotsize) {
      // let i = (fx + fy * width) * 4;
      r = pixels[i];
      g = pixels[i + 1];
      b = pixels[i + 2];
      alp = pixels[i + 3];
      thisPixColor = [r, g, b, alp];
      gry = (r + g + b) / 3;

      //fill(r, g, b, alp);
      fill(gry);
      noStroke();
      rect(fx, fy, dotsize, dotsize);

      // i++; // this wouldn't work.
      // i = i+4; //this wouldn't work as well. Think of why :D
      i = i+4*dotsize; //this don't work too. Oh my god!!! :<
    }
  }

  //updatePixels(); // you don't have to update the pixels since you draw it with rect();
}

