let sizePresets = [
    [512,512],    // 0
    [1920,1080],  // 1
    [2560,1080],  // 2
    [2560,1440],  // 3
    [3840,2160],  // 4
    [5120,2880]   // 5
  ];
  
  size = sizePresets[0];
  
  let xx;
  let yy;
  let vx, vvx;
  let vy, vvy;
  let dir;
  let aa;
  let theta;
  
  let resetBall = ()=>{
    xx = 0;
    yy = 0;
    vx = vvx = 20;
    vy = vvy = 0;
    dir = 1;
    aa = 0.98;
    theta = 0;
  };
  resetBall();
  function setup() {
    createCanvas(size[0],size[1]);
    frameRate(24);
    background(255, 255, 0);
  
  
    noStroke();
    for (let tt=0;tt<330;tt+=1){
      vy += aa*tt;
      xx += vx;
      yy += vy;
      if (yy>height) {
        yy = height;
        xx = (Math.sqrt(vy**2/aa**2 + 2*aa*yy/vx**2) - vy/vx)/(aa/vx**2);
        vy *= -1;
      }
      fill(255)
      text(Math.floor(xx)+" | "+Math.floor(yy),xx+15,yy+5);
      fill(255,222);
      circle(xx,yy,20);
    }
    resetBall();
  }
  
  function draw(){
    vy += aa*frameCount;
    xx += vx;
    yy += vy;
    if (yy>height) {
      yy = height;
      xx = (Math.sqrt((vy**2)/(vx**2) + 2*aa*height/(vx**(2))) + vy/vx)/(aa*vy**2);
      console.log(aa);
      vy *= -1;
    }
    fill(255)
    // text(Math.floor(xx)+" | "+Math.floor(yy),xx+15,yy+5);
    fill(0,222);
    circle(xx,yy,20);
  }
  
  class Ball {
    constructor(xStart,yStart,vxStart,vyStart,xAcc,yAcc){
      this.xx = xStart;
      this.yy = yStart;
      this.vvx = vxStart;
      this.vvy = vyStart;
      this.aa = xAcc;
      this.gg = yAcc;
    }
    moveAdd(){
      
    }
  }
  
  class Star {
    
  }
  