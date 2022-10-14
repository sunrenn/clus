
let style = {
  rangeHueDynamic: 0.1,  // 0-1
  saturationStroke: 50,
  saturationBg: 50,
  lightFront:80,
  contrast:20,  //% 对比度
  alphaFront: 100,
  alphaMid: 0,
  alphaBg: 100,
}

let fHue,fSaturation,fLight,fAlpha;
let bHue,bSaturation,bLight,bAlpha;
let mHue,mSaturation,mLight,mAlpha;
let colorFront,colorBg,colorMid;


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
    (vabs[1]),
    width*(vrel[0]),
    50,
    style.alphaMid
  ]);
  [mHue,mSaturation,mLight,mAlpha]=tmpArr;
  
  setColorSystem();
}







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





// // Color System
// class Clr {
  
// }