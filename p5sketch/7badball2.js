let sw = Symbol("box width");
let sh = Symbol("box height");
let cx = Symbol("center X");
let cy = Symbol("center Y");
let aa = Symbol("acceleration X");
let gg = Symbol("acceleration Y");
let shorter = Symbol("box shorter side length");

let myBox = {
  [sw]:0,
  [sh]:0,
  [cx]:0,
  [cy]:0,
  [shorter]:0,
  [aa]:0,
  [gg]:9.8,
  f_CC: function (rate, size = 1920) {
    // function Create_Canvas
    // rate = [16,9] 生成壁纸的比例
    // size = 1920 生成壁纸的长边像素值
    
    if (rate == undefined) {
      [this[sw], this[sh]] = [window.innerWidth, window.innerHeight];
      rate = [window.innerWidth , window.innerHeight];
    } else {
      this[sw] = (rate[0] >= rate[1]) ? size : (size * rate[0] / rate[1]);
      this[sh] = (rate[0] < rate[1]) ? size : (size * rate[1] / rate[0]);
    }
    this[cx] = this[sw] / 2;
    this[cy] = this[sh] / 2 ;

    this[shorter] = (rate[0] >= rate[1]) ? this[sw] : this[sh];
  },

  f_rc: function (i) {
    // function random color
    // rcstr = 'hsl('+Math.floor(random(1,360))+', 0%, 100% )';
    // rc = color(rcstr);
    rc = color(0);
    rc.setAlpha(900 / i);
    return rc;
  },
};

myBox.f_CC([1,1],512);

let sizePresets = [
  [512,512],    // 0
  [1920,1080],  // 1
  [2560,1080],  // 2
  [2560,1440],  // 3
  [3840,2160],  // 4
  [5120,2880]   // 5
];
let cvsSize = sizePresets[0];

let cvsPadding = 0.125;
let cvsInner = [
  cvsSize[0]*cvsPadding,
  cvsSize[1]*cvsPadding,
  cvsSize[0]*(1-cvsPadding),
  cvsSize[1]*(1-cvsPadding)
]


// let xx;
// let yy;
// let vx, vvx;
// let vy, vvy;
// let dir;
// let aa;
// let theta;

// let resetBall = ()=>{
//   xx = 0;
//   yy = 0;
//   vx = vvx = 20;
//   vy = vvy = 0;
//   dir = 1;
//   aa = 0.98;
//   theta = 0;
// };
// resetBall();


let ballbox = [];
let xx = Symbol("X value of current position");
let yy = Symbol("Y value of current position");
let vvx = Symbol("velocity of the x-axis");
let vvy = Symbol("velocity of the y-axis");
let mass = Symbol("mass of ball");
let rm = Symbol("energy remain after evorment drawed");
let ii = Symbol("counter of a loop, better for find and replace");

let fc; //frameCount under control


let planStep = 128;
let debugGrph;
function setup() {
  createCanvas(cvsSize[0],cvsSize[1]);
  frameRate(24);
  background(255, 255, 0);

  slider = createSlider(0, 100, 90, 10);
  slider.position(10, 10);
  slider.style('width', '80px');
  let eSld = document.querySelector("body>input[type='range']");
  document.querySelector("body>main").appendChild(eSld);
  eSld.style.cssText = "position:absolute; left:24px; top:66px";
  
  for (let ii = 0;ii<1;ii++){
    let aball = new Ball(setPara(ii));
    ballbox.push(aball);
  }

  for (let kk = 0;kk<planStep;kk++){
    for (let ii = 0;ii<ballbox.length;ii++){
      ballbox[ii].fall(myBox[aa],myBox[gg]);
      ballbox[ii].badbounce();
      ballbox[ii].move();
      ballbox[ii].show(ballbox[ii].style2);
    }
  }

  ballbox = [];
  for (let ii = 0;ii<1;ii++){
    let aball = new Ball(setPara(ii));
    ballbox.push(aball);
  }

  debugGrph = createGraphics(200, 100);
}

function draw(){
  let rmSliderVal = slider.value();
  if (frameCount>128*2) {
    // noLoop();
  }
  // background(255, 255, 0);
  let denser = 1;
  for (let kk = 0;kk<denser;kk++){
    for (let ii = 0;ii<ballbox.length;ii++){
      ballbox[ii].fall(myBox[aa],myBox[gg]);
      ballbox[ii].badbounce(rmSliderVal*0.01);
      ballbox[ii].move();
      ballbox[ii].show();
      debugGrph.background(255);
      debugGrph.fill(0);
      debugGrph.text("x: "+ballbox[ii][xx],12,2+16);
      debugGrph.text("y: "+ballbox[ii][yy],12,2+16*2);
      debugGrph.text("G: "+myBox[gg],12,90);
      debugGrph.text("bouced remain: "+rmSliderVal+"%",12+50,90);
      image(debugGrph, 15, 15);
    }
  }
}
// function mouseDragged(){
//   if (frameCount>planStep){
//     myBox[gg] = mouseY*10/512;
//   }
// }
let tempflag = 0;
class Ball {
  constructor(para){
    let k = 0.1; // adjustment
    this[xx] = para[xx];
    this[yy] = para[yy];
    this[vvx] = para[vvx]*k;
    this[vvy] = para[vvy]*k;
    this[mass] = para[mass]*k;
    this[rm] = para[rm];
  }
  move(){
    this[xx] += this[vvx];
    this[yy] += this[vvy];
  }
  fall(aa,gg){
    this[vvx] += this[mass]*aa;
    this[vvy] += this[mass]*gg;
  }
  badbounce(remain=this[rm]){
    if (tempflag<3) {
      tempflag=10;
    }
    if ((this[xx]>cvsSize[0])||(this[xx]<0)) {
      this[vvx] = Math.abs(this[vvx])*(Math.sign(cvsSize[0]-this[xx]))*remain;
    }
    if ((this[yy]>cvsSize[1])||(this[yy]<0)) {
      this[vvy] = Math.abs(this[vvy])*(Math.sign(cvsSize[1]-this[yy]))*remain;
    }
  }

  push(cvsBorder=100){
    if ((this[xx]>(cvsSize[0]-cvsBorder))||(this[xx]<cvsBorder)) {
      this[vvx] = Math.abs(this[vvx])*(Math.sign(cvsSize[0]-this[xx]))*this[rm];
    }
    if ((this[yy]>(cvsSize[1]-cvsBorder))||(this[yy]<cvsBorder)) {
      this[vvy] = Math.abs(this[vvy])*(Math.sign(cvsSize[1]-this[yy]))*this[rm];
    }
  }

  style1(x,y){
    fill(255,0,255);
    noStroke();
    circle(x,y,10);
  }

  style2(x,y){
    noFill();
    fill(255,255,255);
    circle(x,y,24);
  }
  show(style = this.style1){
    style(this[xx],this[yy]);
  }
}

function setPara(ii){

  let ballParameters = {
    [xx]:12*ii,
    [yy]:150,

    [vvx]:130*(ii+1),
    [vvy]:0,

    [mass]:1,
    [rm]:0.9
  };
  return ballParameters;
}