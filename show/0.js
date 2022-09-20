// Color and Style

let audioVisualRate = 5;

let style = {
  rangeHueDynamic: 0.1,  // 0-1
  saturationStroke: 50,
  saturationBg: 50,
  lightStroke:80,
  contrast:20,  //% 对比度
  alphaFront: 99,
  alphaMid: 99,
  alphaBg: 99,
}

let fHue,fSaturation,fLight,fAlpha;
let bHue,bSaturation,bLight,bAlpha;
let mHue,mSaturation,mLight,mAlpha;
let colorFront,colorBg,colorMid;

function setSwatches(){
  colorFront = [fHue,fSaturation,fLight,fAlpha];
  colorBg = [bHue,bSaturation,bLight,bAlpha];
  colorMid = [mHue,mSaturation,mLight,mAlpha];
}

function resetSwatches(){
  [fHue,fSaturation,fLight,fAlpha]=[0,style.saturationStroke,80,80];
  [bHue,bSaturation,bLight,bAlpha]=[0,style.saturationBg,50,80];
  [mHue,mSaturation,mLight,mAlpha]=[0,style.saturationBg,40,80];
  setSwatches();
}

resetSwatches();

function setColor(type=0,rdm=0){
  let mus;
  if (rdm==1) {
    mus = [Math.random()*100,Math.random()*100];
  }
  else {
    mus = mousePositionValue();
  }
  // console.log([Math.random()*100,Math.random()*100]);
  
  // type: 0=hue, 1=saturation, 2=light, 3=alpha
  colorFront[type]                 = mathRound(mus[0],0); // x position %
  colorBg[type] = colorMid[type]   = mathRound(mus[1],0); // y position %
}

function randomColor(){
  for (let i=0;i<4;i++){
    setColor(i,1);
  }
}

function matchColor(range=[20,90]){
  let vrel = mousePositionValue(range);
  let vabs = mousePositionValue();
  let tmpArr = [];
  tmpArr = rangeValue([
    vabs[0],
    style.saturationStroke,
    vabs[1],
    style.alphaFront
  ]);
  [fHue,fSaturation,fLight,fAlpha]=tmpArr;

  tmpArr = rangeValue([
    (vabs[0]+vrel[0]),
    style.saturationBg,
    100-vabs[1]+(100-vabs[1])*vabs[3],
    style.alphaBg
  ]);
  [bHue,bSaturation,bLight,bAlpha]=tmpArr;
  tmpArr = rangeValue([
    (vabs[0]+vrel[0]+range[0]-(range[1])),
    style.saturationBg,
    100-vabs[1]+(100-vabs[1])*vabs[3]*0.5,
    style.alphaMid
  ]);
  [mHue,mSaturation,mLight,mAlpha]=tmpArr;
  
  setSwatches();
}

function rangeValue(arr,range=100){
  for (let i=0;i<arr.length;i++){
    arr[i] = mathRound(arr[i]%range,0);
  }
  return arr;
}

// Canvas Size

let cvsSize;
let cvsCenterXY;
let cvsScale = 1;
let cvspadding = 120;
cvsSize = [window.innerWidth, window.innerHeight];
// cvsSize = [650,650];
// cvsSize = [2160,5120];
// cvsSize = [2160,3800];
//   cvsSize = [1024,1024];
cvsSize = [cvsSize[0]*cvsScale-cvspadding,cvsSize[1]*cvsScale-cvspadding];
cvsCenterXY = [cvsSize[0]*0.5,cvsSize[1]*0.5];

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

let soundVisual = {
  mmiicc:null,
  micLevel:null,
  svSetup: function(cvs){
    cvs.mousePressed(userStartAudio);
    this.mmiicc = new p5.AudioIn();
    this.mmiicc.start();
    console.log(this.mmiicc.getSources());
  },
  svDraw: function(){
    this.micLevel = this.mmiicc.getLevel();
    let y = height - this.micLevel * height;
    ellipse(width/2, y, 10, 10);
  },
  svGetVal: function(){
    this.micLevel = this.mmiicc.getLevel();
    let svval =   this.micLevel*2000  *mouseY/height;
    svval =       this.micLevel*2000  *0.1*audioVisualRate;
    // console.log(svval);
    
    return svval;
  }
};

let txtarr=[];
function setup() {
  objCvs = createCanvas(...cvsSize);
  colorMode(HSL,100);
  randomColor();
  blendMode(BLEND);
  background(...colorBg);
  gInfo = createGraphics(cvsSize[0],100);
  soundVisual.svSetup(objCvs);

  textAlign(CENTER);

  txtarr.push("你好");
  txtarr.push("");
  txtarr.push(String(""));
}

function draw() {
  clear();
  background(...colorBg);
  colorSquare(soundVisual.svGetVal());
  say();
}

function mouseDragged(){
  matchColor();
}

function keyPressed(){
  if (key==" "){
    matchColor();
  }
  if (key=="r"){
    randomColor();
  }
  if (key=="c"){
    resetSwatches();b
  }
  if (key=="s"){
    saveCanvas(objCvs, 'abstractNo1_', 'jpg');
  }
}

function showInfo(){
  let ms = mousePositionValue();
  let infoTxt = ["mouseX:"+ms[0]+", mouseY:"+ms[1]];
  infoTxt.push("colorFront: "+colorFront);
  infoTxt.push("colorBg: "+colorBg);
  infoTxt.push("colorMid: "+colorMid);
  gInfo.fill(...colorFront);
  gInfo.noStroke();
  gInfo.clear();
  gInfo.background(...colorMid);
  let i=0;
  infoTxt.forEach((a,b,c)=>{
    i++;
    gInfo.text(a,12,20*(i));
  });
  // gInfo.text(infoTxt,12,20);
  image(gInfo,0,0);
}


function drawaline(x,y,nn,val=0){
  length = val*20;
  stroke(colorFront[0]+nn*val,colorFront[1],colorFront[2],colorFront[3]);
  strokeWeight(2);
  line(x-length,y-length,x+length,y+length);
}

function colorSquare(val){
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


function say(){

  txtlen = txtarr.length;
  for (let ii=0;ii<txtlen;ii++) {
      noStroke();
      fill(...colorFront);
      text(txtarr[ii],(ii+0.5)*width/txtlen,frameCount%height);
  }
}