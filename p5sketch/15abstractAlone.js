cvs = new Cvs([650,650],1,0);

cvsSize = cvs.size();
cvsCenterXY = cvs.center();


style = {
  rangeHueDynamic: 0.1,  // 0-1
  saturationStroke: 50,
  saturationBg: 50,
  lightFront:80,
  contrast:20,  //% 对比度
  alphaFront: 100,
  alphaMid: 0,
  alphaBg: 100,
}

// NaN Abstract No.1 set
let xyBox = [];


const xyBoxlen = 15;	// records amount
const xyBoxGetAt = 3;
const xyBoxGAAdj = [0,0];

const filterRange = 100;

const shapeMount = 24;  // >=2

const ifDisplayColorSquare = 0;

const lineStyle = 2;
const shapeModeId = 0;
const boundDrawAmount = 800;
const brushWidth = cvsSize[0]*0.001;

const wholeshitscale = 
// [2.73,2.73];
[0.8,0.8];
const shitcenter = 
[1,1];
// [2,3];
// [2.5,2.5];



// Color and Style
let audioVisualRate = 24;
let driverType = 0; // -1 mp3 | -2 mic  | >=0 not by mouse
let noiseLevel = -3;
let motorbySong=0;

let objCvs;  // for Image File Saving.
let gInfo; // graphic for info
let gColorSquare; // graphic for ColorSquare
let gFront; // graphic for Abstract
let gMid; // graphic for Abstract

let soundVisual = {
  mmiicc:null,
  micLevel:null,
  svSetup: function(cvs){
    cvs.mousePressed(userStartAudio);
    this.mmiicc = new p5.AudioIn();
    this.mmiicc.start();
  },
  svDraw: function(){
    this.micLevel = this.mmiicc.getLevel();
    let y = height - this.micLevel * height;
    ellipse(width/2, y, 10, 10);
  },
  svGetVal: function(){
    this.micLevel =   this.mmiicc.getLevel();
    let svval =       this.micLevel*2000  *mouseY/height;
    svval =           this.micLevel*2000  *0.1*audioVisualRate;
    
    return svval;
  }
};

let localSong;
function preload() {
  if (driverType==-1){
    soundFormats('mp3', 'ogg');
    localSong = loadSound('assets/mp3/minimal_sweetyElectristI');
  }
}

let txtarr=[];
let showInfoTimer = 12;
let displayTime = 1;

let startDraw = 0;
let counterStp = 0;

function setup() {
  objCvs = createCanvas(...cvsSize);
  colorMode(HSL,100);
  randomColor();
  blendMode(BLEND);
  background(...colorBg);
  gInfo = createGraphics(...cvsSize);
  gColorSquare = createGraphics(...cvsSize);
  gFront = createGraphics(...cvsSize);
  gMid = createGraphics(...cvsSize);
  gFront.colorMode(HSL,100);
  gMid.colorMode(HSL,100);
  if (driverType==-2){
    soundVisual.svSetup(objCvs);
  }
  else if (driverType==-1){
    objCvs.mousePressed(function(){
      localSong.stop();
      // localSong.play();
      startDraw=1;
      clear();
      background(...colorBg);
    });
    amplitude = new p5.Amplitude();
  }

  textAlign(CENTER);

  txtarr.push("你好");
  txtarr.push("");
  txtarr.push(String(""));

}

function draw() {
  // clear();
  // background(...colorBg);
  if (driverType==-2){
    soundRound(soundVisual.svGetVal());
  }
  else if (driverType==-1){
    clear();
    background(colorBg);
    motorbySong = amplitude.getLevel()*audioVisualRate - noiseLevel;
    motorbySong = (motorbySong>0)?motorbySong:0;
    soundRound(motorbySong);
    shapeSth(counterStp,motorbySong);
    counterStp++
    // push();
    // gFront.rotate(PI / 4);
    image(gMid,0,0);
    image(gFront,0,0);
    // pop();
  }
  else {
    clear();
    background(colorBg);
    // nan abstract No.1
    if (startDraw>0) {
      shapeSth(counterStp,1);
      counterStp++
      // push();
      // gFront.rotate(PI / 4);
      image(gMid,0,0);
      image(gFront,0,0);
      // pop();
    }
    else if (frameCount==1) {
    }
  }
  // say();


  if (ifDisplayColorSquare==1){
    colorSquire();
    showInfo();
  }

}


let mouseDraggedValue = [];
let mdv = mouseDraggedValue;

function mousePressed(){
  mdv = [mouseX,mouseY];
}
function mouseReleased(){
  mdv.push(mouseX);
  mdv.push(mouseY);
  mdv.push((mdv[2]-mdv[0])/1);  //[4]
  mdv.push((mdv[3]-mdv[1])/1);  //[5]
  mdv.push((mdv[2]-mdv[0])/width);  //[6]
  mdv.push((mdv[3]-mdv[1])/height); //[7]
  startDraw=1;
  if (ifDisplayColorSquare==1){
    colorSquire();
    showInfo();
  }
}
// mdv[0] - mdv[3] 鼠标拖拽的起点xy和终点xy
// mdv[4],mdv[5] 拖拽距离像素绝对值(0~width/height)
// mdv[6],mdv[7] 拖拽距离画幅相对值(0~1)


function mouseDragged(){
  // gFront.clear();
  // gMid.clear();

  if (mouseButton === LEFT) {
    matchColor();
    background(colorBg);
  }
  else if (mouseButton === CENTER) {

  }
  else if (mouseButton === RIGHT) {
    text("I dont have middle button",cvsCenterXY[0],cvsCenterXY[1]);
  }
}

function keyPressed(){
  if (key==" "){
    randomColor();
    clear();
    background(colorBg);
    // counterStp = Math.floor(Math.random()*boundDrawAmount)%500;
    counterStp = 0;
  }
  if (key=="a"){
    for (let i=0;i<boundDrawAmount;i++) {
      shapeSth(counterStp,motorbySong);
      counterStp++;
    }
  }
  if (key=="r"){
    randomColor();
    gInfo.clear();
    gColorSquare.clear();
    gFront.clear();
    gMid.clear();
    clear();
    
    background(colorBg);
  }
  if (key=="c"){
    noLoop();
  }
  if (key=="v"){
    // redraw();
    loop();
  }
  if (key=="R"){
    // redraw();
    gInfo.clear();
    gColorSquare.clear();
    gFront.clear();
    gMid.clear();
    clear();
    loop();
  }
  if (key=="x"){
    gFront.clear();
    gMid.clear();
  }
  if (key=="s"){
    saveCanvas(objCvs, 'abstractNo1_', 'png');
  }
  if (key=="f"){
    gInfo.clear();
    gColorSquare.clear();
    gFront.clear();
    gMid.clear();
    clear();
    saveFrames('abstractFrame_', 'png', 15, 3);
  }
}


function drawaline(x,y,nn,val=0){
  length = val*20;
  stroke(colorFront[0]+nn*val,colorFront[1],colorFront[2],colorFront[3]);
  strokeWeight(2);
  line(x-length,y-length,x+length,y+length);
}

function soundRound(val){
  let stepNum = [5,8];
  let nn=0;
  for (let ii=0;ii<stepNum[0]; ii++){
    for (let jj=0;jj<stepNum[1]; jj++){
      nn++;
      drawaline((0.5+ii)*width/stepNum[0],(0.5+jj)*height/stepNum[1],nn,val*0.25);
      stroke(colorMid[0]+nn*val,colorMid[1],colorMid[2],1+nn/2);
      strokeWeight(300+val*50-15*nn);
      point(...cvsCenterXY);
    }
  }
}


function say(){

  txtlen = txtarr.length;
  for (let ii=0;ii<txtlen;ii++) {
      noStroke();
      fill(...colorFront);
      text(txtarr[ii],(ii+0.5)*width/txtlen,frameCount%height);
  }
}

function shapeSth(fc,motor=1){
  let theta;
  let xxx, yyy;
  if ((driverType==-1)||(driverType==-2)){
    [theta,xxx,yyy] = shapeMode[shapeModeId](motor);
  }
  // -1 mp3 | -2 mic  | >=0 not by mouse
  else if (driverType>=0) {
    [theta,xxx,yyy] = shapeMode[shapeModeId](motor);
  }
  else {
    theta = radians(mouseX*180/cvsSize[0]);
    xxx = yyy = mouseY/[cvsCenterXY[0]+cvsCenterXY[1]];
  }
  // xxx = mouseY/cvsCenterXY[0];
  // yyy = mouseY/cvsCenterXY[1];
  let mul= 0.001;
  let [tempx, tempy] = [1, 1];  // init
  let ff = Math.tan(radians(fc));

  let [a, b, c, d] = [cos(fc*mul),sin(fc*mul),cos(fc*mul+theta),sin(fc*mul+theta)];

  let xyr = [];

  for (var iii = 0; iii < shapeMount ; iii++) {

    // [pre_x, pre_y] = [tempx * 100 + cvsCenterXY, tempy * 100 + cvsCenterXY];
    
    tempx = (Math.sin(a * yyy) - Math.cos(b * xxx))*2;
    tempy = (Math.sin(c * xxx) - Math.cos(d * yyy))*2;

    let [px, py] = [
      cvsCenterXY[0]*shitcenter[0] + (tempx * 0.5*cvsCenterXY[0])*0.5*wholeshitscale[0], 
      cvsCenterXY[1]*shitcenter[1] + (tempy * 0.5*cvsCenterXY[1])*0.5*wholeshitscale[1]
    ];
    // 本来是个十字，把画面分成了四个象限，乘以二后，只显示第一象限。
    xyr.push([px,py]);
    let prex = 0;
    let prey = 0;
    if ((xyBox.length>=xyBoxGetAt)&&(xyBox[xyBoxGetAt])){
      let t1,t2;
      [t1,t2] = [(xyBoxGetAt+xyBoxGAAdj[0]+sin(frameCount)),(xyBoxGetAt+xyBoxGAAdj[1]+sin(frameCount))];
      [t1,t2] = [(xyBoxGetAt+xyBoxGAAdj[0]).toFixed(0),(xyBoxGetAt+xyBoxGAAdj[1]).toFixed(0)];
      if ((xyBox[t1])&&(xyBox[t2])){
        prex = xyBox[t1][iii][0];
        prey = xyBox[t2][iii][1];
      }
      else {
        // console.log(xyBox.length,[t1,t2],frameCount);
      }
      px = px + 0.1*(px-prex);
      py = py + 0.1*(py-prey);
    }
    
    funStyleBox[lineStyle](motor,iii,px,py,prex,prey);
    [xxx, yyy] = [tempx, tempy]; // [10,10]
  }
  xyRecoder(xyr);
  


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

let funStyleBox = [];
let shapeMode = []

funStyleBox[0] = function(motor,i,px,py,prex,prey){
  
  let range = 20;
  let hueRange = style.rangeHueDynamic;
  let stepLen = dist(px,py,prex,prey);
  if ((stepLen<range)&&(stepLen>0.4)){
    if(style.alphaFront>0){
      gFront.blendMode(LIGHTEST);
      gFront.stroke(px-prex+py-prey+i*0.2+colorFront[0]*hueRange,colorFront[1],colorFront[2],colorFront[3]);
      // gFront.strokeWeight(1+sin(radians(frameCount))*10*cvsScale/(1 + i*0.5));
      gFront.strokeWeight(brushWidth/(1+stepLen*2));
      gFront.point(px,py);
    }
  }
  else {
    if((style.alphaMid>0)&&(colorMid[0]!=0)){
      // gMid.stroke((px-prex+py-prey+i*0.2+colorMid[0]*hueRange),colorMid[1],colorMid[2],colorMid[3]);
      gMid.fill((colorMid[0]),colorMid[1],colorMid[2]**2,colorMid[3]);
      gMid.noStroke();
      // gMid.fill(((px-prex+py-prey)*i*1+colorBg[0]),colorBg[1],colorBg[2],colorBg[3]);
      gMid.circle(px,py,(px-prex+py-prey)*0.1);
    }
  }
}

funStyleBox[1] = function(motor,i,px,py,prex,prey){
  let stepLen = dist(px,py,prex,prey);
  let range = filterRange;
  let hueRange = style.rangeHueDynamic;
  if (stepLen<range){
    if(style.alphaFront>0){
      gFront.blendMode(LIGHTEST);
      gFront.stroke(
        (colorFront[0]-sin(frameCount)*100*hueRange)%100,
        colorFront[1],
        colorFront[2],
        colorFront[3]
      );
      gFront.noFill();
      gFront.strokeWeight(30);
      gFront.strokeCap(ROUND);
      // gFront.circle(px,py,1+sin(radians(frameCount))*1*cvsScale*(1 + i*0.5));
      gFront.line(prex,prey,px,py);
    }
  }
  else {
    if((style.alphaMid>0)&&(colorMid[0]!=0)){
      // gMid.stroke((px-prex+py-prey+i*0.2+colorMid[0]*hueRange),colorMid[1],colorMid[2],colorMid[3]);
      gMid.fill(colorMid[0],colorMid[1],colorMid[2]**2,colorMid[3]);
      gMid.NoStroke();
      // gMid.circle(px,py,1+sin(radians(frameCount))*1*cvsScale*(1 + i*0.5));
      gMid.circle(px,py,11);
    }
  }
}

funStyleBox[2] = function(motor,numid,px,py,prex,prey){
  if (numid>0){
    // the first one (numid==0) is too bore;
    let stepLen = dist(px,py,prex,prey);
    let hueRange = style.rangeHueDynamic;
    if (stepLen<filterRange){
      if(style.alphaFront>0){
        gFront.stroke(
          (colorFront[0]-sin(frameCount)*100*hueRange)%100,
          colorFront[1],
          colorFront[2],
          colorFront[3]
        );
        gFront.noFill();
        gFront.strokeWeight(brushWidth*motor*stepLen);
        gFront.point(px,py);
        // gFront.line(px,py,prex,prey);
      }
    }
    else {
      if((style.alphaMid>0)&&(colorMid[0]!=0)){
        gMid.stroke((px-prex+py-prey+i*0.2+colorMid[0]*hueRange),colorMid[1],colorMid[2],colorMid[3]);
        gMid.fill(colorMid[0],colorMid[1],colorMid[2]**2,colorMid[3]);
        // gMid.NoStroke();
        // gMid.circle(px,py,1+sin(radians(frameCount))*1*cvsScale*(1 + i*0.5));
        gMid.circle(px,py,11);
      }
    }
  }
}

shapeMode[1] = function(motor){
  let theta,xxx,yyy;
  theta = radians(frameCount*motor);
  xxx = yyy = sin(radians(frameCount*motor));
  return [theta,xxx,yyy]
}

shapeMode[0] = function(motor){
  let theta,xxx,yyy;
  theta = radians(frameCount*mdv[6]*mdv[7])*35;
  xxx = cos(radians(frameCount*0.01*mdv[6])*mdv[6]);
  yyy = cos(radians(frameCount*0.01*mdv[7])*mdv[7]);
  return [theta,xxx,yyy]
}


// mdv[0] - mdv[3] 鼠标拖拽的起点xy和终点xy
// mdv[4],mdv[5] 拖拽距离像素绝对值(0~width/height)
// mdv[6],mdv[7] 拖拽距离画幅相对值(0~1)