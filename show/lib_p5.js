
// Canvas Size
class Cvs {
	constructor(){
		this.cvsSize;
		this.cvsCenterXY;
		this.cvsScale = 1;
		this.cvspadding = 0;
		this.cvsSize = [];
		this.cvsCenterXY = [];
	}
	size(){
		
		this.cvsSize = [window.innerWidth, window.innerHeight];
		this.cvsSize = [650,650];
		// this.cvsSize = [2160,5120];
		// this.cvsSize = [5120,3800];
		// this.cvsSize = [2160,3800];
		// this.cvsSize = [1024,1024];
		this.cvsSize = [this.cvsSize[0]*this.cvsScale-this.cvspadding,this.cvsSize[1]*this.cvsScale-this.cvspadding];
		return this.cvsSize;
	}
	center(){
		this.cvsCenterXY = [this.cvsSize[0]*0.5,this.cvsSize[1]*0.5];
		return this.cvsCenterXY;
	}
}

let cvs = new Cvs();



function mousePositionValue(r=[0,100]){
  let mouseXRate = mouseX/cvs.size()[0];
  let mouseYRate = mouseY/cvs.size()[1];
  let x01,y01,signx,signy;
  x01 = sin(0.5*PI*mouseXRate)**2*r[1]+r[0];  //sin(0 ~ PI/2) == 0 ~ 1
  y01 = sin(0.5*PI*mouseYRate)**2*r[1]+r[0];
  signx = -1*cos(PI*mouseXRate)**2;  //-( cos(0 ~ PI) )== -1 ~ 1
  signy = -1*cos(PI*mouseYRate)**2;
  return [mathRound(x01),mathRound(y01),mathRound(signx),mathRound(signy)];
}


function colorSquire(gColorSquare=createGraphics(...cvs.size())){
  if (displayColorSquare==1){
    gColorSquare.colorMode(HSL,100);
    gColorSquare.strokeWeight(1);
    gColorSquare.stroke(100);
    gColorSquare.rectMode(CENTER);
    gColorSquare.fill(colorBg);
    gColorSquare.rect(...cvs.center(),0.44*cvs.size()[0],0.44*cvs.size()[1]);
    gColorSquare.fill(colorMid[0],colorMid[1],colorMid[2],100);
    gColorSquare.rect(...cvs.center(),0.33*cvs.size()[0],0.33*cvs.size()[1]);
    gColorSquare.fill(colorFront);
    gColorSquare.rect(...cvs.center(),0.22*cvs.size()[0],0.22*cvs.size()[1]);
    image(gColorSquare,0,0);
  }
}


function showInfo(gInfo=createGraphics(...cvs.size())){
  if (displayShowInfo==1){

    let i=0;
    let a = "";
    let fontsz = 32;

    gInfo.clear();
    gInfo.colorMode(HSL,100);
    gInfo.fill(colorFront[0],colorFront[1],(100-colorFront[2]),100);
    gInfo.noStroke();
    gInfo.textAlign(CENTER);
    gInfo.textSize(fontsz);

    a = "colorFront: "+colorFront;
    gInfo.fill(colorFront[0],colorFront[1],(100-colorFront[2]),100);
    gInfo.text(a,cvs.center()[0],cvs.center()[1]+fontsz*(i-1.5));
    i++;

    a = "colorMid: "+colorMid;
    gInfo.fill(colorMid[0],colorMid[1],(100-colorMid[2]),100);
    gInfo.text(a,cvs.center()[0],cvs.center()[1]+fontsz*(i-1.5));
    i++;

    a = "colorBg: "+colorBg;
    gInfo.fill(colorBg[0],colorBg[1],(100-colorBg[2]),100);
    gInfo.text(a,cvs.center()[0],cvs.center()[1]+fontsz*(i-1.5));
    i++;

    // infoTxt.push("Please move your mouse, and stop and wait a while.");
    // infoTxt.push("You will get a unique painting by your mouse movement.");

    // gInfo.text(infoTxt,12,20);
    image(gInfo,0,0);
  }
}