
function canvasSize(basesize = [window.innerWidth, window.innerHeight],scale = 1) {
	stagesize = [basesize[0]*scale, basesize[1]*scale];
	// stagesize = [210, 297];
	// stagesize = [297, 210];
	// stagesize = [2560, 1080];

	return stagesize;
}
[pagesizew,pagesizeh] = canvasSize([512, 512],1);


function setup() {
	createCanvas(pagesizew,pagesizeh);
	frameRate(30);
	background(222);
	let nd = new PersonalDesign;
	nd.templateModel();
	nd.content();
	if (typeof(FLogo)=="function"){
		var nlg = new FLogo([512,512],1,22);
		nlg.masterPlate();
	}
}
  
function draw() {
}

class PersonalDesign {
	// some typical design：A4 (print), wallpaper(digital), 朋友圈分享图
	// Fullscreen get screen size, to get type of wallpaper design size
	// 模板模子
	// 没有图层，不能取代photoshop

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
	}
	content(){

		let txtContent = [];
		let txtsiz = 66;
		textSize(txtsiz);
		let sth2rmb = [];
		textAlign(LEFT,BOTTOM);
		sth2rmb.push("viscus");
		sth2rmb.push("splanchna");
		sth2rmb.push("gut");
		sth2rmb.push("chawdron");
		sth2rmb.push("entralis");
		sth2rmb.push("viscera");
		sth2rmb.push("internal organs");
		// sth2rmb.push("“我”是厄运");

		txtContent.push(sth2rmb);


		sth2rmb = [];
		sth2rmb.push("nothing");

		txtContent.push(sth2rmb);


		let m=0;
        let lastWordWidth=0;
        let txtX=0;
		for (let itm of txtContent[0]){
            txtX = 22;
			textWrap(CHAR);
            if ( lastWordWidth + textWidth(itm)<width) {
                txtX = 11+lastWordWidth;
            }

			text(itm, txtX,txtsiz*0.7*(m+3));
			m++;
            lastWordWidth = textWidth(itm);
		}
	}
}

