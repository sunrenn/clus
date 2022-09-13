function setup() {

  createCanvas(512, 512);
  background(0,0,255);

}

function draw() {
  // clear();
  // background(0,0,0,50);
  what();
}

function what(){

  let x = y = 1.25;
  let cxy = (512) / 2; // center x y value

  let [oa, ob, oc, od] = [1,1,1,1];
  let mul= 0.01;
  let [varA,varB] = [mouseX,mouseY];
  [varA,varB] = [frameCount,mouseY];
  // let [pre_x, pre_y] = [1, 1];
  let [tempx, tempy] = [1, 1];
  // let [dax, day, xiaox, xiaoy] = [1, 1, 1, 1];
  let ff = Math.tan(radians(frameCount));

  // let [a, b, c, d] = [oa + ff, ob - ff, oc * ff, od / ff];
  let [a, b, c, d] = [cos(varA*mul),cos(varB*mul),sin(varA*mul),sin(varB*mul)];

  for (var i = 0; i < 30; i++) {

    // [pre_x, pre_y] = [tempx * 100 + cxy, tempy * 100 + cxy];
    
    tempx = Math.sin(a * y) + Math.cos(b * x);
    tempy = Math.sin(c * x) + Math.cos(d * y);
    let [px, py] = [tempx * cxy + 0.1*cxy, tempy * cxy + 0.1*cxy];
    shapeSth(i,px,py);
    [x, y] = [tempx, tempy]; // [10,10]
    // dax = (px > dax) ? px : dax;
    // day = (py > day) ? py : day;
    // xiaox = (px < xiaox) ? px : xiaox;
    // xiaoy = (py < xiaoy) ? py : xiaoy;
  }
}

function shapeSth(i,px,py){

  noFill();
  colorMode(HSL,100);
  stroke(60+i*0.2,100,50,33);
  strokeWeight(50 + i*1);
  point(px,py);
  // noStroke();
  // fill(255);
  // text(i,px, py);
}


var funcs = [];

for (var i=0;i<10;i++){
  funcs.push((function(value){
    return function(){
      let strA = 'echo';
      let name = new String('echo');
      name.age = value;
      console.log(strA);
      console.log(sex);
      console.log(name.age);
    }
  }(i)));
}

funcs.forEach(function(func){
  func();
})