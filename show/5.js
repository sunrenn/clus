
let balls = []
let csize = [512,512]
let cx,cy;
let bounceRate = 0.9;
function setup() {
	frameRate(30)
	createCanvas(csize[0],csize[1]);
	for (i=0;i<12;i++){
		let ball = new Ball((i+0.5)*512/12,0,0,0,sFibonacci(i+3));
		balls.push(ball);
	}

}

function draw() {
	background(222);
	textAlign(LEFT, BOTTOM);
	for (k=0;k<balls.length;k++){
		textAlign(RIGHT, BOTTOM);
		fill(166);
		noStroke();
		text((k)+": ",30,20*k+20);
		textAlign(LEFT, BOTTOM);
		fill(0);
		noStroke();
		text(sFibonacci(k+3),35,20*k+20);
		fill(11,66);
		stroke(0,200);
		balls[k].drop();
	}
	
}

class Ball {
	constructor(px,py,vx = random(1,22)/1,vy = random(1,22)/1,ballSize = random(11,110)){
		this.ballSize = ballSize;
		this.vx = vx;
		this.vy = vy;
		this.px = px;
		this.py = py;
		this.g = 9.8/11;
	}
	drop() {
		this.px += this.vx;
		this.py += this.vy;
		this.vy += this.g;

		if (this.py > csize[1]) {
			this.py = csize[1]-1;
			this.vy *= -1*bounceRate;
			this.vx *= bounceRate;
		}
		else if (this.py < 0) {
			this.py = 0+1;
			this.vy *= -1*bounceRate;
			this.vx *= bounceRate;
		}
		if (this.px > csize[0]) {
			this.vy *= bounceRate;
			this.px = csize[0]-1;
			this.vx *= -1*bounceRate;
		}
		else if (this.px < 0) {
			this.vy *= bounceRate;
			this.px = 0+1;
			this.vx *= -1*bounceRate;
		}
		circle(this.px,this.py,this.ballSize);
	}
}

function sFibonacci(num) {
	try{
		// Fibonacci Sequence: 1,1,2,3,5,8,...
		if (num==1){
			return 1;
		}
		else if (num==2){
			return 1;
		}
		else if (num>2){
			let res = sFibonacci(num-1) + sFibonacci(num-2);
			return res;
		}
		else if (num==0){
			return 0;
		}
		else {
			return 0;
		}
	}
	catch(e){
		console.log(e);
	}
}


