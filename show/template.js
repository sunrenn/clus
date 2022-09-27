
// Canvas Size
let cvsSize;
let cvsCenterXY;
let cvsScale = 1;
let cvspadding = 0;
cvsSize = [window.innerWidth, window.innerHeight];
cvsSize = [650,650];
// cvsSize = [2160,5120];
// cvsSize = [5120,3800];
// cvsSize = [2160,3800];
//   cvsSize = [1024,1024];
cvsSize = [cvsSize[0]*cvsScale-cvspadding,cvsSize[1]*cvsScale-cvspadding];
cvsCenterXY = [cvsSize[0]*0.5,cvsSize[1]*0.5];

function setup(){
	createCanvas(...cvsSize);
  colorMode(HSL,100);
  background(1);
}

function draw(){

}