
let [pagesizew,pagesizeh] = ((basesize = [window.innerWidth, window.innerHeight],scale = 1) => { 
	let arr = [basesize[0]*scale, basesize[1]*scale];
	return arr; 
})([512, 512],1);

function setup() {
	createCanvas(pagesizew,pagesizeh);
	frameRate(30);
	background(0);
	fill(255);
	noStroke();
	let nd = new PersonalDesign;
	nd.backgroundPattern();
	nd.templateModel();
	nd.content();
}
  
function draw() {
	if (typeof(FLogo)=="function"){
		stroke(255);
		strokeWeight(0);
		var nlg = new FLogo([512,512],1,200);
		nlg.masterPlate();
	}
}

class DesignUnit {
	strokeColor='rgba(255,255,255,0.5)';
	strokeWeight=1;
	constructor(){
		
	}
}

class PersonalDesign {

	constructor(){
		this.type = ["wallpaper","wechatMoments","A4Print"];
		this.size = [[1920,1080],[512,512],[2100,2970]];
		this.pageOrientation = ["landscape","portrait"];
	}
	templateModel(){
		// 这里是固定的母版模版版式（是不是应该改成masterPlate）
	}
	content(){

		let txtContent = [];
		let txtsiz = 333;
		textSize(txtsiz);
		let sth2rmb = [];
		textAlign(LEFT,BOTTOM);
		sth2rmb.push("you & me");
		sth2rmb.push("now");
		sth2rmb.push("here");
		sth2rmb.push("everything");
		sth2rmb.push("nothing");
		// sth2rmb.push("“我”是厄运");

		txtContent.push(sth2rmb);


		sth2rmb = [];
		sth2rmb.push("call(?)");
		sth2rmb.push("NULL");
		sth2rmb.push("");

		txtContent.push(sth2rmb);

		let m=0;
		let strColor = 'rgba(0,255,0,'+str(1/30)+')';

		let txtsiz1,txtsiz2;
		txtsiz = 611;
		textAlign(CENTER,CENTER);
		let numLoop = 12;
		for (let k = 0; k<numLoop; k++){
			txtsiz1 = txtsiz-sin(radians(k*90/numLoop))*444;
			textFont('Courier',txtsiz1);
			let alp = parseFloat((pow((1+cos(radians(90+90*(numLoop-k)/numLoop))),2)).toFixed(2));
			strColor = (k==numLoop-1)?"255":'rgba(0,255,'+str((k*255/numLoop).toFixed(0))+','+alp+')';
			fill(strColor);
			text(txtContent[1][1], pagesizew/2,pagesizeh*(1-0.618));
			textFont('Courier',txtsiz1/33);
			text(alp.toFixed(2), pagesizew*0.618,pagesizeh*(0.7)+k*txtsiz1/44);
			// text(txtContent[1][0], pagesizew/2,50*(k+1));
		}
		
		strColor = 'rgba(0,255,255,'+str((8*1/30).toFixed(2))+')';
		fill(strColor);
		textFont('Courier',txtsiz1*0.25);
		text(txtContent[1][1], pagesizew/2,pagesizeh*(0.6));
		
		m=0;
		txtsiz2 = 36;
		textFont('Courier',txtsiz2);
		textAlign(LEFT,CENTER);
		for (let itm of txtContent[0]){
			strColor = 'rgba(0,255,'+str((m*255/9).toFixed(0))+','+str((0.2+m*1/12).toFixed(2))+')';
			fill(strColor);
			textWrap(CHAR);
			text(itm.toUpperCase(), -3,pagesizeh - txtsiz2*0.5*m);
			m++;
		}
	}
	backgroundPattern(){
		for (let i = 0; i<random(1,11); i++){
			stroke(0,255,(i%2)*122,random(66,111));
			strokeWeight(random(1,1));
			let y = random(0,pagesizeh);
			line(0, y, pagesizew, y);
		}
	}
}

