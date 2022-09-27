

let objCvs;  // for Image File Saving.

// NaN set
let startDraw = 0;
let displayColorSquare = 1;


function setup() {
  objCvs = createCanvas(...cvs.size());
	background(100);
	objCvs.mousePressed(function(){
		clear();
		background(...colorBg);
	});
}

function draw() {
	circle(...cvs.center(), 20);

  if (displayColorSquare==1){
    colorSquire();
    showInfo();
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
  }
  if (key=="s"){
    saveCanvas(objCvs, 'nameit_', 'jpg');
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
    text("I dont have middle button",cvs.center()[0],cvs.center()[1]);
  }
}