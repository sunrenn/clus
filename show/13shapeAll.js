
// Canvas Size
let cvsSize;
let cvsCenterXY;
let cvsScale = 3;
let cvspadding = 0;
cvsSize = [window.innerWidth, window.innerHeight];
cvsSize = [650,650];
// cvsSize = [2160,5120];
// cvsSize = [5120,3800];
// cvsSize = [2160,3800];
//   cvsSize = [1024,1024];
cvsSize = [cvsSize[0]*cvsScale-cvspadding,cvsSize[1]*cvsScale-cvspadding];
cvsCenterXY = [cvsSize[0]*0.5,cvsSize[1]*0.5];

// NaN Abstract No.1
let [pre_x, pre_y] = [1, 1];
let xyBox = [];
let xyBoxlen = 2;	// records amount
let shapeMount = 128;
let displayColorSquare = 0;
let lineStyle = 0;

// NaN set
let startDraw = 0;


let wholeshitscale = 1;
let shitcenter = 1;


// Color and Style
let audioVisualRate = 24;
let driverType = 0; // -1 mp3 | -2 mic  | >=0 not by mouse
let noiseLevel = -3;
let motorbySong=0;

let style = {
  rangeHueDynamic: 0.1,  // 0-1
  saturationStroke: 50,
  saturationBg: 50,
  lightStroke:80,
  contrast:20,  //% 对比度
  alphaFront: 99,
  alphaMid: 0,
  alphaBg: 100,
}

let fHue,fSaturation,fLight,fAlpha;
let bHue,bSaturation,bLight,bAlpha;
let mHue,mSaturation,mLight,mAlpha;
let colorFront,colorBg,colorMid;

function setColorSystem(){
  colorFront = [fHue,fSaturation,fLight,fAlpha];
  colorBg = [bHue,bSaturation,bLight,bAlpha];
  colorMid = [mHue,mSaturation,mLight,mAlpha];
}

function resetColorSystem(){
  [fHue,fSaturation,fLight,fAlpha]=[0,style.saturationStroke,80,80];
  [bHue,bSaturation,bLight,bAlpha]=[0,style.saturationBg,50,80];
  [mHue,mSaturation,mLight,mAlpha]=[0,style.saturationBg,40,80];
  setColorSystem();
}

resetColorSystem();

function setColor(type=0,rdm=0){
  let mus;
  if (rdm==1) {
    mus = [Math.random()*100,Math.random()*100];
  }
  else {
    mus = mousePositionValue();
  }
  
  // type: 0=hue, 1=saturation, 2=light, 3=alpha
  colorFront[type]                 = mathRound(mus[0],0); // x position %
  colorBg[type] = colorMid[type]   = mathRound(mus[1],0); // y position %
}

function randomColor(){
  for (let i=0;i<4;i++){
    setColor(i,1);
  }
}

function matchColor(range=[35,65]){
  let vrel = mousePositionValue(range);
  let vabs = mousePositionValue();
  let tmpArr = [];


  tmpArr = rangeValue([
    vabs[0],
    style.saturationStroke*(1-vabs[3]),
    vabs[1],
    style.alphaFront
  ]);
  [fHue,fSaturation,fLight,fAlpha]=tmpArr;

  tmpArr = rangeValue([
    (vabs[0]%(100-range[0])+range[0]),
    style.saturationBg*(1-vabs[3]),
    100-vabs[1],
    style.alphaBg
  ]);
  [bHue,bSaturation,bLight,bAlpha]=tmpArr;

  tmpArr = rangeValue([
    (vabs[0]%(100-range[1])+range[1]),
    style.saturationBg*(1-vrel[3]),
    100-vrel[1],
    style.alphaMid
  ]);
  [mHue,mSaturation,mLight,mAlpha]=tmpArr;
  
  setColorSystem();
}

function rangeValue(arr,range=101){
  for (let i=0;i<arr.length;i++){
    arr[i] = mathRound(arr[i]%range,0);
  }
  return arr;
}


function mathRound(val,decimalPlaces=2){
  return(Number((((Math.round(val*(10**decimalPlaces)))/(10**(decimalPlaces))).toFixed(decimalPlaces))));
}

function mousePositionValue(r=[0,100]){
  let mouseXRate = mouseX/cvsSize[0];
  let mouseYRate = mouseY/cvsSize[1];
  let x01,y01,signx,signy;
  x01 = sin(0.5*PI*mouseXRate)**2*r[1]+r[0];  //sin(0 ~ PI/2) == 0 ~ 1
  y01 = sin(0.5*PI*mouseYRate)**2*r[1]+r[0];
  signx = -1*cos(PI*mouseXRate)**2;  //-( cos(0 ~ PI) )== -1 ~ 1
  signy = -1*cos(PI*mouseYRate)**2;
  return [mathRound(x01),mathRound(y01),mathRound(signx),mathRound(signy)];
}


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
    localSong = loadSound('assets/symphony__1_for_dot_matrix_.mp3');
  }
}

let txtarr=[];
let showInfoTimer = 0;
let displayTime = 1;

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
  if (driverType==-2){
    soundVisual.svSetup(objCvs);
  }
  else if (driverType==-1){
    objCvs.mousePressed(function(){
      localSong.play();
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
    motorbySong = amplitude.getLevel()*audioVisualRate - noiseLevel;
    motorbySong = (motorbySong>0)?motorbySong:0;
    soundRound(motorbySong);
  }
  // say();

  clear();
  background(...colorBg);
  // nan abstract No.1
  if (startDraw>0) {
    shapeSth(frameCount,motorbySong);
    image(gMid,0,0);
    image(gFront,0,0);
  }
  else if (frameCount==1) {
  }

  if (displayColorSquare==1){
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
  if (displayColorSquare==1){
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
  }
  if (key=="c"){
    noLoop();
  }
  if (key=="v"){
    // redraw();
    loop();
  }
  if (key=="x"){
    gFront.clear();
    gMid.clear();
  }
  if (key=="s"){
    saveCanvas(objCvs, 'abstractNo1_', 'jpg');
  }
}

function showInfo(){
  let fontsz = 12;
  let infoTxt = [];
  infoTxt.push("colorFront: "+colorFront);
  infoTxt.push("colorMid: "+colorMid);
  infoTxt.push("colorBg: "+colorBg);
  // infoTxt.push("Please move your mouse, and stop and wait a while.");
  // infoTxt.push("You will get a unique painting by your mouse movement.");
  gInfo.clear();
  gInfo.colorMode(HSL,100);
  gInfo.fill(colorFront[0],colorFront[1],(100-colorFront[2]),100);
  gInfo.noStroke();
  gInfo.textAlign(CENTER);
  gInfo.textSize(fontsz);
  let i=0;
  infoTxt.forEach((a,b,c)=>{
    i++;
    gInfo.text(a,cvsCenterXY[0],cvsCenterXY[1]+fontsz*(i-1.5));
  });
  // gInfo.text(infoTxt,12,20);
  image(gInfo,0,0);
  showInfoTimer+=deltaTime;
  
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
      stroke(colorMid[0]+nn*val,colorMid[1],colorMid[2],20+nn/2);
      strokeWeight(300+val*50-15*nn);
      point(...cvsCenterXY);
    }
  }
}

function colorSquire(){
  gColorSquare.colorMode(HSL,100);
  gColorSquare.strokeWeight(1);
  gColorSquare.stroke(100);
  gColorSquare.rectMode(CENTER);
  gColorSquare.fill(colorBg);
  gColorSquare.rect(...cvsCenterXY,0.55*cvsSize[1],0.33*cvsSize[1]);
  gColorSquare.fill(colorMid[0],colorMid[1],colorMid[2],100);
  gColorSquare.rect(...cvsCenterXY,0.44*cvsSize[1],0.22*cvsSize[1]);
  gColorSquare.fill(colorFront);
  gColorSquare.rect(...cvsCenterXY,0.33*cvsSize[1],0.11*cvsSize[1]);
  image(gColorSquare,0,0);
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
  theta = radians(motor*180/cvsSize[0]);
  xxx = yyy = motor*cvsSize[1]/[cvsCenterXY[0]+cvsCenterXY[1]];
  }
  // -1 mp3 | -2 mic  | >=0 not by mouse
  else if (driverType>=0) {
    [theta,xxx,yyy] = shapeMode[0]();
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

  for (var i = 0; i < shapeMount ; i++) {

    // [pre_x, pre_y] = [tempx * 100 + cvsCenterXY, tempy * 100 + cvsCenterXY];
    
    tempx = (Math.sin(a * yyy) - Math.cos(b * xxx))*2;
    tempy = (Math.sin(c * xxx) - Math.cos(d * yyy))*2;

    let [px, py] = [
      cvsCenterXY[0]*shitcenter + (tempx * 0.5*cvsCenterXY[0])*0.5*wholeshitscale, 
      cvsCenterXY[1]*shitcenter + (tempy * 0.5*cvsCenterXY[1])*0.5*wholeshitscale
    ];
    // 本来是个十字，把画面分成了四个象限，乘以二后，只显示第一象限。
    xyr.push([px,py]);
    let prex = 0;
    let prey = 0;
    if (xyBox.length>1){
      prex = xyBox[0][i][0];
      prey = xyBox[0][i][1];
      px = px + 0.1*(px-prex);
      py = py + 0.1*(py-prey);
    }
    // console.log(motor,i,px,py,prex,prey);
    funStyleBox[lineStyle](motor,i,px,py,prex,prey);
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
  gFront.colorMode(HSL,100);
  gMid.colorMode(HSL,100);
  let range = 20;
  let hueRange = style.rangeHueDynamic;
  let stepLen = dist(px,py,prex,prey);
  if ((stepLen<range)&&(stepLen>0.4)){
    if(style.alphaFront>0){
      gFront.stroke(px-prex+py-prey+i*0.2+colorFront[0]*hueRange,colorFront[1],colorFront[2],colorFront[3]);
      // gFront.strokeWeight(1+sin(radians(frameCount))*10*cvsScale/(1 + i*0.5));
      gFront.strokeWeight(20/(1+stepLen*2));
      gFront.point(px,py);
    }
  }
  else {
    if((style.alphaMid>0)&&(colorMid[0]!=0)){
      // gMid.stroke((px-prex+py-prey+i*0.2+colorMid[0]*hueRange),colorMid[1],colorMid[2],colorMid[3]);
      gMid.stroke((colorMid[0]),colorMid[1],colorMid[2]**2,colorMid[3]);
      gMid.strokeWeight(5);
      gMid.fill(((px-prex+py-prey)*i*1+colorBg[0]),colorBg[1],colorBg[2],colorBg[3]);
      gMid.circle(px,py,(px-prex+py-prey)*0.2);
    }
  }
}

funStyleBox[1] = function(motor,i,px,py,prex,prey){
  gFront.colorMode(HSL,100);
  gMid.colorMode(HSL,100);
  let stepLen = dist(px,py,prex,prey);
  let range = 50;
  let hueRange = style.rangeHueDynamic;
  console.log(prex,prey,px,py);
  if (stepLen<range){
    if(style.alphaFront>0){
      gFront.fill(px-prex+py-prey+i*0.2+colorFront[0]*hueRange,colorFront[1],colorFront[2],colorFront[3]);
      gFront.strokeWeight(5);
      gFront.stroke(100);
      gFront.noStroke();
      // gFront.circle(px,py,1+sin(radians(frameCount))*1*cvsScale*(1 + i*0.5));
      gFront.circle(px,py,2);
    }
  }
  else {
    if((style.alphaMid>0)&&(colorMid[0]!=0)){
      // gMid.stroke((px-prex+py-prey+i*0.2+colorMid[0]*hueRange),colorMid[1],colorMid[2],colorMid[3]);
      gMid.stroke((colorMid[0]),colorMid[1],colorMid[2]**2,colorMid[3]);
      gMid.strokeWeight(1);
      gMid.fill(colorBg[0],colorBg[1],colorBg[2],colorBg[3]);
      // gMid.circle(px,py,1+sin(radians(frameCount))*1*cvsScale*(1 + i*0.5));
      gMid.circle(px,py,11);
    }
  }
}

shapeMode[1] = function(){
  let theta,xxx,yyy;
  theta = radians(frameCount*1);
  xxx = yyy = sin(radians(frameCount));
  return [theta,xxx,yyy]
}

shapeMode[0] = function(){
  let theta,xxx,yyy;
  theta = radians(frameCount*mdv[6]*mdv[7])*18;
  xxx = cos(radians(frameCount*0.01*mdv[6])*mdv[6]);
  yyy = cos(radians(frameCount*0.01*mdv[7])*mdv[7]);
  return [theta,xxx,yyy]
}


// mdv[0] - mdv[3] 鼠标拖拽的起点xy和终点xy
// mdv[4],mdv[5] 拖拽距离像素绝对值(0~width/height)
// mdv[6],mdv[7] 拖拽距离画幅相对值(0~1)