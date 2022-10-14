let info = [];
let imgPath = "assets/photos/";
// info = {
//     imgName: "1.jpg",
//     coloradj: [1,1,1],
//     paperSize: [350,350,1],
//     imgTranslate: [222,0]
// }

info = {
    imgName: "jz_stage.jpg",
    coloradj: [0.8,1,1.4],
    paperSize: [297,210,4],
    imgTranslate: [0,0]
}
// info = {
//     imgName: "nowork.jpg",
//     coloradj: [1.4s,1.3,1.5],
//     paperSize: [297,210,4],
//     imgTranslate: [0,0]
// }
// info = {
//     imgName: "iceriver_playground.jpg",
//     coloradj: [1,1,1],
//     paperSize: [210,297,4],
//     imgTranslate: [0,0]
// }
// info = {
//     imgName: "snowriver_sunset.jpg",
//     coloradj: [1,1.1,1.2],
//     paperSize: [297,210,4],
//     imgTranslate: [0,0]
// }
// info = {
//     imgName: "over_maybe_shanghai.jpg",
//     coloradj: [1,1,1],
//     paperSize: [210,297,4],
//     imgTranslate: [0,0]
// }
info = {
    imgName: "winter_fire.jpg",
    coloradj: [1,1,1],
    paperSize: [297,210,4],
    imgTranslate: [0,0]
}
info = {
    imgName: "street.jpg",
    coloradj: [1,1,1],
    paperSize: [297,210,4],
    imgTranslate: [0,0]
}


const imgUrl = imgPath+info.imgName;



let cvsSize = [info.paperSize[0], info.paperSize[1]];
cvs = new Cvs(cvsSize,info.paperSize[2],0);

cvsSize = cvs.size();
let cvsCenter = cvs.center();
let oImg;
let ratioImgOrg = 1;
const clrAdj = info.coloradj;

let pixSize = 4;
let minPixSz = 4;
let dotsize = [0,0];

const testSwitch = 2;
let gTst;
const testSegNum = 10;

function preload() {
    oImg = loadImage(imgUrl);
}

function setup() {
    objCvs = createCanvas(...cvsSize);
    gTst = createGraphics(...cvsSize);
    background(0);

    frameRate(1);
    pixelDensity(1); // ***

    ratioImgOrg *= 1;

    // ( video, x, y, (w), (h), startX, startY, copyW, copyH )
    // image after resize canvas, copy orginal size, then resize to new image size.
    // image is copy at every frame, why resize not for each time ?
    if (testSwitch==1) {
        testSeg();
        image(gTst,0,0,...cvsSize);
    }
    else {
        imgPic();
    }
    mosaic();
}

function testSeg() {

    gTst.background(22,0,25);
    let rectSz = [cvsSize[0]/testSegNum, cvsSize[1]/testSegNum];

    for (let ww=0;ww<testSegNum;ww++) {
        for (let hh=0;hh<testSegNum;hh++) {
            gTst.noStroke();
            gTst.fill((testSegNum-hh)*200/testSegNum,(testSegNum*2-hh-ww)*200*0.5/testSegNum,ww*166/testSegNum);
            gTst.rect(ww*rectSz[0],hh*rectSz[1],...rectSz);
        }
    }

}

function draw() {}


// let mv = [];

// function mousePressed(){
//     mv = [mouseX,mouseY];
// }

// function mouseDragged() {
//     pixSize = Math.floor(minPixSz+(mouseX-mv[0])**2/200);
// }

function mouseReleased(){
    pixSize = Math.floor(minPixSz+(mouseX)*0.25);
    if (testSwitch==1) {
        testSeg();
    }
    else {
        imgPic();
    }
    mosaic(undefined,undefined,pixSize);
}

function imgPic(){
    let imgScl = Math.min(oImg.width/cvsSize[0], oImg.height/cvsSize[1]);
    let imgTranslate = info.imgTranslate;
    image(
        oImg, 
        0, 0, cvsSize[0], cvsSize[1], 
        imgTranslate[0], imgTranslate[1], // 起点
        (cvsSize[0]*imgScl), (cvsSize[1]*imgScl)  // 宽高，不是终点
    );
    
}

function mosaic(aa=[0,0],bb=cvsSize,sz=3) {
    let r, g, b, alp;
    // let gry;

    let i = 0;
    let thisPixColor = [];
    dotsize = [sz,sz];
    let numRowCol = [
        Math.floor(cvsSize[0]/sz),
        Math.floor(cvsSize[1]/sz),
    ];
    dotsize = [
        Math.ceil(cvsSize[0]/numRowCol[0]),
        Math.ceil(cvsSize[1]/numRowCol[1]),
    ]

    loadPixels();
    for (let fy = aa[1]; fy < bb[1]; fy += dotsize[1]) {
        for (let fx = aa[0]; fx < bb[0]; fx += dotsize[0]) {
            let i = (fx + fy * width) * 4;
            r = pixels[i];
            g = pixels[i + 1];
            b = pixels[i + 2];
            alp = pixels[i + 3];
            thisPixColor = [r*clrAdj[0], g*clrAdj[1], b*clrAdj[2], alp];
            // gry = (r + g + b) / 3;

            //fill(r, g, b, alp);
            fill(thisPixColor);
            noStroke();
            rect(fx, fy, dotsize[0], dotsize[1]);

            // i++; // this wouldn't work.
            // i = i+4; //this wouldn't work as well. Think of why :D
            // i = i + 4 * dotsize; //this don't work too. Oh my god!!! :<
        }
    }
}


function keyPressed(){
    if (key==" "){
    }
    if (key=="c"){
    }
    if (key=="v"){
    }
    if (key=="x"){
    }
    if (key=="s"){
      saveCanvas(objCvs, 'fotoBlock_'+info.imgName.split(".")[0]+'_'+dotsize[0]+'_'+dotsize[1], 'png');
    }
  }