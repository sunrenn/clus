let sz = [window.innerWidth, window.innerHeight];
sz = [512,512];


let [pagesizew,pagesizeh] = ((basesize = [window.innerWidth, window.innerHeight],scale = 1) => { 
	let arr = [basesize[0]*scale, basesize[1]*scale];
	return arr; 
})(sz,1);
nds = []
function setup() {
	createCanvas(pagesizew,pagesizeh);
	frameRate(30);
	background(0);
    for (let i = 0; i<random(10,30); i++){
        stroke(0,255,(i%2)*122,random(0,111));
        strokeWeight(random(1,1));
        let y = random(0,pagesizeh);
        line(0, y, pagesizew, y);
    }
	fill(255);
	noStroke();
	let nd = new PersonalDesign;
	nds.push(nd);
}
  
function draw() {
	background(0);
	nds[0].content();
	nds[0].templateModel();
	if (typeof(FLogo)=="function"){
	  var nlg = new FLogo([512,512],2,255);
	  nlg.masterPlate();
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
		let logosize = 3;
		let tmpX = (pagesizew-textWidth(this.slogen)*0);
		let tmpY = (pagesizeh-9);
		fill(255);
	}
	content(){

		let txtContent = [];
		let txtsiz;
		textSize(txtsiz);
		let sth2rmb = [];
		textAlign(LEFT,BOTTOM);
		sth2rmb.push("当我读书的时候，总感觉我是在给别人读。我好像什么都看不懂，似乎作者的话并不是对我说的。");
		sth2rmb.push("我的身体里，肯定还藏着另一个意识，是我的灵魂居所太空虚了？我怀疑那个意识，如果还在的话，都是过客，那里就好像谁都可以进去，又随时都可以离开，在我读书的时候，他占据了我的理解能力和记忆，看过的书什么也看不懂，更记不住。也许这些字，我正在敲的这些字，都不完全是我的话，也有它的一部分。因为他总是顺着我的意，搭个便车而已。");
		sth2rmb.push("我总会想起来《遥远的救世主》那本书，那书的作者，就是在别人的怂恿下开始学写作成为了作家。我也曾经不止一次受到规劝，让我去写小说。");
		sth2rmb.push("“为什么不听话呢？”");
		sth2rmb.push("“小时候敲打的太频了？”");
		sth2rmb.push("“据他回忆，小时候好像也没敲打，惯的。”");
		sth2rmb.push("“现在敲打他他也不服，不敲打他，他还觉得你有阴谋，‘因为他总是顺着我的意，搭个便车而已’，很有作家的味道了么。”");
		sth2rmb.push("“他没有得到想要的好处，也没有收到有营养的教育。”——我，这是现在的他对我的总结。最近半个月，感觉他成熟了，那个能控制环境中一切的，本应该是类似神明的存在，成熟了一点点，有点像个人样了。但还是非常讨厌，非常讨我嫌（“讨狗嫌”——他在那嚷着）。他想要控制我的身体，我感觉到脚刚刚抽动了一下。");
		sth2rmb.push("也许规劝我写小说的并不是这个，而是另外一个……惋惜我留在这的那个，他能控制我的身体，但是，走不了多远就会被外面那个吃掉。");
		sth2rmb.push("我，为什么不能控制自己的身体呢？在他能控制的时候，我又是哪个？外面那个，里面这个。");
		sth2rmb.push("在这里。我应该有更高的追求吗？不应该，这里是某种动物的巢穴，或者是某种生物的子宫，反正不是人呆的地方，与人这个概念完全不相关！这里就是魂斗罗那种游戏中那种——应该被原子弹毁灭的地方，异形的巢穴！魔鬼的子宫！");
		// sth2rmb.push("“我”是厄运");

		txtContent.push(sth2rmb);


		sth2rmb = [];
		sth2rmb.push("胡说八道");
		sth2rmb.push("为时过晚");
		sth2rmb.push("亡羊补牢");
		sth2rmb.push("写字玩赖");
		sth2rmb.push("惨不忍睹");

		txtContent.push(sth2rmb);

		let m=0;
		let strColor = 'rgba(0,255,0,'+str(1/30)+')';

		paragraph(txtContent[0],0,0,pagesizew,17);

		let txtsiz1,txtsiz2;
		txtsiz = 270;
		textAlign(CENTER,CENTER);
		for (let k = 0; k<30; k++){
            let kk = k%sth2rmb.length;
			txtsiz1 = txtsiz-sin(radians(k*6))*1;
			textFont('Courier',txtsiz1/2);
			let alp = parseFloat((1*(30-k)/30).toFixed(2));
			let h1 = Math.floor(frameCount+k*45);
			strColor = 'hsla('+h1%255+',100%,50%,0.3)';
			fill(strColor);
			text(txtContent[1][kk], pagesizew/2,k*txtsiz/3);
		}
		
	}
}

function paragraph(content=[],x=0,y=0,w,cellSize){
	let numCharPerLine =  Math.floor(w/cellSize);
	let reLineContent = [];
	let m=0;
	let padding = 10;
	let charSize = 0.5;
	textFont('Courier',cellSize*charSize);
	textAlign(LEFT,CENTER);
	for (let itm of content){
		let arrPara = itm.split("");
		let arrParaLines = []
		for (let i=0; i<(arrPara.length/numCharPerLine);i++){
			let strLine="";
			let n = 0;
			for (let j=0;j<numCharPerLine;j++){
				if (itm[i*numCharPerLine+j]) {
					let hh = Math.floor(frameCount*(i*numCharPerLine+j)/33);
					strColor = 'hsla('+hh%360+',100%,50%,0.5)';
					fill(strColor);

					let zi = arrPara[i*numCharPerLine+j];
					strLine += zi ;
					text(zi, Math.floor(x+(n+0.5-0.5*charSize)*cellSize), Math.floor(y+(m+0.5+0.5*charSize)*cellSize));
					n++;
				}
			}
			arrParaLines.push(strLine);
			m++;
		}
		reLineContent.push(arrParaLines);
	}
}

function mouseClicked(){
	noLoop();
}