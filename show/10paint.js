let presentSz,cvsSize,szscale;
let cvsCenterXY;
let objCvs;
presentSz = [window.innerWidth, window.innerHeight];
presentSz = [650,650];
presentSz = [5120,2160];
// cvsSize = [1024,1024];
szscale = 0.125;
cvsSize = [presentSz[0]*szscale,presentSz[1]*szscale];
cvsCenterXY = [cvsSize[0]*0.5,cvsSize[1]*0.5]; // center x y value

let startDraw = 0;
// let gphGround, gphDraw;

let styleSaturation = 50;
let styleBgSaturation = 20;
let styleHiddenAlpha = 0;
let strkHueRange = 0.1;

let dhsl = [0,styleSaturation,50,80];  // default HSL Color
let sHue,sSaturation,sLight,sAlpha;
let bgColor = [30,styleBgSaturation,88,100];
let StrokeColor = [sHue,sSaturation,sLight,sAlpha];
let hiddenStrokeColor = [bgColor[0],bgColor[1],bgColor[2],styleHiddenAlpha];

function mouseLuckyDrawABCD(){
  let mouseXRate = mouseX/cvsSize[0];
  let mouseYRate = mouseY/cvsSize[1];
  let aa,bb,cc,dd;
  aa = sin(0.5*PI*mouseXRate)**2*100;  //sin(0 ~ PI/2) == 0 ~ 1
  bb = sin(0.5*PI*mouseYRate)**2*100;
  cc = cos(0.5*PI*mouseXRate)**2*100;  //cos(0 ~ PI/2) == 1 ~ 0
  dd = cos(0.5*PI*mouseYRate)**2*100;
  return [aa,bb,cc,dd];
}


function setup() {
  objCvs = createCanvas(...cvsSize);
  
  // createCanvas(512, 512);
  frameRate(24);
  colorMode(HSL,100);
  blendMode(SOFT_LIGHT);
  background(bgColor);
}

let [pre_x, pre_y] = [1, 1];
let xyBox = [];
let xyBoxlen = 12;
let shapeMount = 36;
function draw() {
  // clear();
  // background(0,0,0,50);
  if (startDraw>0) {
    shapeSth(frameCount);
  }
  else if (frameCount==1) {
    
    textAlign(CENTER);
    fill(100);
    noStroke();
    textSize(80);
    text(cos(0)+"Please move your mouse, and stop and wait a while.",cvsCenterXY[0],cvsCenterXY[1]-100);
    text("You will get a unique painting by your mouse movement.",cvsCenterXY[0],cvsCenterXY[1]);
  }

}

function mouseMoved(){
  if (startDraw==0){
    clear();
    background(bgColor);
    startDraw = 1;
  }
}

function mouseDragged(){
  
  if (mouseButton === LEFT) {
    sHue = mouseX*100/cvsSize[0];
    sSaturation = mouseY*100/cvsSize[1];
  }
  if (mouseButton === RIGHT) {
    // text("I dont have middle button",cvsCenterXY[0],cvsCenterXY[1]);
  }
  if (mouseButton === CENTER) {
    sLight = mouseX*100/cvsSize[0];
    sAlpha = mouseY*100/cvsSize[1];
  }
}

function keyPressed(){
  if (key==" "){
    dhsl[0] = mouseLuckyDrawABCD()[0];  // stroke hue x 0-1
    bgColor[0] = mouseLuckyDrawABCD()[1];  // bg hue y 0-1
    bgColor[2] = mouseLuckyDrawABCD()[3];  // light y 1-0
    hiddenStrokeColor = [bgColor[0],styleBgSaturation,bgColor[2],styleHiddenAlpha];
    clear();
    background(bgColor);
  }
  if (key=="c"){
    sHue = 0;
    sSaturation = 50;
    sLight = 50;
    sAlpha = 80;
  }
  if (key=="b"){
    bgColor = [30,20,11];
  }
  if (key=="w"){
    bgColor = [30,20,88];
  }
  if (key=="s"){
    saveCanvas(objCvs, 'abstractNo1_', 'jpg');
  }
}

function shapeSth(fc,theta=radians(mouseX*180/cvsSize[0])){
  let xxx = yyy = mouseY/[cvsCenterXY[0]+cvsCenterXY[1]];
  // xxx = mouseY/cvsCenterXY[0];
  // yyy = mouseY/cvsCenterXY[1];
  let mul= 0.001;
  
  let [tempx, tempy] = [1, 1];  // init
  let ff = Math.tan(radians(fc));

  let [a, b, c, d] = [cos(fc*mul),sin(fc*mul),cos(fc*mul+theta),sin(fc*mul+theta)];

  let xyr = [];
  for (var i = 0; i < shapeMount ; i++) {

    // [pre_x, pre_y] = [tempx * 100 + cvsCenterXY, tempy * 100 + cvsCenterXY];
    
    tempx = (Math.sin(a * yyy) - Math.cos(b * xxx))*2;
    tempy = (Math.sin(c * xxx) - Math.cos(d * yyy))*2;
    let [px, py] = [cvsCenterXY[0] + tempx * 0.5*cvsCenterXY[0], cvsCenterXY[1] + tempy * 0.5*cvsCenterXY[1]];
    xyr.push([px,py]);
    let prex = 0;
    let prey = 0;
    if (xyBox.length>1){
      prex = xyBox[1][i][0];
      prey = xyBox[1][i][1];
      px = px + 0.5*(px-prex);
      py = py + 0.5*(py-prey);
    }
    strokeSth(i,px,py,prex,prey,sHue,sSaturation,sLight,sAlpha);
    [xxx, yyy] = [tempx, tempy]; // [10,10]
    // dax = (px > dax) ? px : dax;
    // day = (py > day) ? py : day;
    // xiaox = (px < xiaox) ? px : xiaox;
    // xiaoy = (py < xiaoy) ? py : xiaoy;
  }
  xyRecoder(xyr);

}

function strokeSth(i,px,py,prex,prey,hue=dhsl[0],saturation=dhsl[1],light=dhsl[2],alpha=dhsl[3],hueRange = strkHueRange){

  colorMode(HSL,100);
  let range = 3;
  if ((px-prex)<range||(py-prey)<range){
    stroke(px-prex+py-prey+i*0.2+hue*hueRange,saturation,light,alpha);
    strokeWeight(1+sin(radians(frameCount))*300*szscale/(1 + i*0.5));
  }
  else {
    // stroke(hiddenStrokeColor);
    // strokeWeight(5 + i*1);
  }
  point(px,py);
  // noStroke();
  // fill(255);
  // text(i,px, py);
}



function xyRecoder(sth,len=xyBoxlen,atEnd = 0){
  if (atEnd==0){
    xyBox.unshift(sth);
    if (xyBox.length>len){
      xyBox.pop();
    }
  }
  else {
    xyBox.push(sth);
    if (xyBox.length>len){
      xyBox.shift();
    }
  }
  return xyBox;
}
 