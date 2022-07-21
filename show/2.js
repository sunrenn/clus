
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

    for (let i = 0; i<random(10,30); i++){
        stroke((i%2)*122,random(0,333));
        strokeWeight(random(1,111));
        let y = random(0,pagesizeh);
        line(0, y, pagesizew, y);
    }
}
  
function draw() {
	if (typeof(FLogo)=="function"){
		stroke(255);
		strokeWeight(1);
		var nlg = new FLogo([512,512],1,0);
		nlg.masterPlate();
	}
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
	}
	content(){

		let txtContent = [];
		let txtsiz = 66;
		textSize(txtsiz);
		let sth2rmb = [];
		textAlign(LEFT,BOTTOM);
		sth2rmb.push("radians(deg)");
		sth2rmb.push("dichotomy");
		sth2rmb.push("reliabilism");
		sth2rmb.push("coherentism");
		sth2rmb.push("stencil");
		sth2rmb.push("master plate");
		sth2rmb.push("stencil-plate");
		// sth2rmb.push("“我”是厄运");

		txtContent.push(sth2rmb);


		sth2rmb = [];
		sth2rmb.push("我即厄运");
		sth2rmb.push("");
		sth2rmb.push("");
		sth2rmb.push("“我”来设计一定丑");
		sth2rmb.push("");
		sth2rmb.push("所以");
		sth2rmb.push("把设计还给命运");

		txtContent.push(sth2rmb);

		let m=0;

		textFont('Alibaba-PuHuiTi-H',111);
        text(txtContent[1][0], 22,txtsiz*0.5*(m+3));
		textSize(12);
		for (let itm of txtContent[1]){
			textWrap(CHAR);
			if (m>0) {
                text(itm, 22,txtsiz*0.5*(m+3));
            }
			m++;
		}
	}
}

