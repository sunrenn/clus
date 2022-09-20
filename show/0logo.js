
let cvsSz = ((basesize = [window.innerWidth, window.innerHeight],scale = 1) => { 
	let arr = [basesize[0]*scale, basesize[1]*scale];
	arr.push([arr[0]*0.5,arr[1]*0.5]);

	let canvasInfo = {
		ww: arr[0],
		hh: arr[1],
		cx: arr[2][0],
		cx: arr[2][1]
	}

	return canvasInfo; 
})([512,512],1.25);
// ([512, 512],1);

let logoSz = cvsSz["ww"]*0.5;
let logoHwRate = 1.35;


function style1(){

	logoSz = cvsSz["ww"]*0.5;
	logoHwRate = 1.35;
	
	noFill();
	stroke(0,0,0,100);
	strokeWeight(logoSz*0.16);
}

function style2(){
	noFill();
	stroke(0,0,0,80);
	strokeWeight(logoSz*0.1);
}


function setup() {
	createCanvas(cvsSz["ww"],cvsSz["hh"]);
	
	frameRate(30);
	colorMode(HSL,100);

	fill(100);
	noStroke();

}

function draw(){

	clear();
	// logoSz = cvsSz["ww"]*0.245*0.2+mouseX*300/cvsSz["ww"];

	let logoPosition = [cvsSz["ww"]*0.5,cvsSz["ww"]*0.5];
	style1();
	let adj = 0.08;
	drwWU(logoPosition[0],logoPosition[1]+logoSz*adj);
	drwXV(logoPosition[0],logoPosition[1]+logoSz*adj);
	circle(...logoPosition,logoSz*1.3);

}

function drwWU(xx,yy){
	drwU(xx-logoSz/3,yy);
	drwU(xx,yy);
	drwU(xx+logoSz/3,yy);
}

function drwU(xx,yy){
	let uLineSz = logoHwRate-0.5;
	let sz = logoSz/3;
	let dgr = [radians(0),radians(180)];
	line(xx-0.5*sz,yy-0.5*sz,xx-0.5*sz,yy-sz*uLineSz-0.5*sz);
	line(xx+0.5*sz,yy-0.5*sz,xx+0.5*sz,yy-sz*uLineSz-0.5*sz);
	arc(xx,yy-0.5*sz,sz,sz,...dgr);
}

function drwXV(xx,yy){
	drwX(xx-logoSz/6,yy+(logoSz/6)*logoHwRate);
	drwV(xx+logoSz/6,yy+(logoSz/6)*logoHwRate);
}

function drwV(xx,yy){
	line(xx,yy,xx-(logoSz/6),yy-(logoSz/6)*logoHwRate);
	line(xx,yy,xx+(logoSz/6),yy-(logoSz/6)*logoHwRate);
}
function drwX(xx,yy){
	line(xx,yy,xx-(logoSz/6),yy-(logoSz/6)*logoHwRate);
	line(xx,yy,xx+(logoSz/6),yy-(logoSz/6)*logoHwRate);
	line(xx,yy,xx-(logoSz/6),yy+(logoSz/6)*logoHwRate);
	line(xx,yy,xx+(logoSz/6),yy+(logoSz/6)*logoHwRate);
}