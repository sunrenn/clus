
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
let titleArr = [];
function setup() {
	createCanvas(cvsSz["ww"],cvsSz["hh"]);
	console.log(cvsSz);
	frameRate(30);
	colorMode(HSL,100);
	background(0,50,5);
	fill(255);
	noStroke();
	let tt1 = new Title("Null",cvsSz["cx"],cvsSz["cy"]);
}

function draw(){

}

class Title {
	constructor(content,xx,yy,size,hslColor){
		this.content = content;
		this.xx = xx;
		this.yy = yy;
		this.baseSize = size;
		this.color = hslColor?[hslColor]:[[0,100,50],[0,50,50]];
		this.styleFill = ()=>{
			return function(){
				fill(this.color[0]);
				text(this.content,xx,yy);
			}
		}
	}
	effect(){
		for (i=0;i<10;i++){
			this.size +=i;
		}
	}
}








function tempMASS() {
	background(0);
	if (typeof(FLogo)=="function"){
		stroke(255);
		strokeWeight(0);
		console.log(nlg);
		var nlg = new FLogo([512,512],1,200);
		nlg.masterPlate();
	}
	let nd = new PersonalDesign;
	nd.backgroundPattern();
	nd.templateModel();
	nd.content();
	if (frameCount%10<=random(1,10)) {
		background(0);
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
		let sth2rmb = [];
		sth2rmb.push("event");
		sth2rmb.push("DOM&BOM");
		sth2rmb.push("AJAX");
		sth2rmb.push("regex");
		sth2rmb.push("Closure");
		sth2rmb.push("json");
		sth2rmb.push("mediaPlayer");
		sth2rmb.push("prototype");
		sth2rmb.push("timer");
		sth2rmb.push("Slider");
		sth2rmb.push("recursive");
		sth2rmb.push("LoadOnDemand");

		txtContent.push(sth2rmb);
    

		sth2rmb = [];
		sth2rmb.push("call(?)");
		sth2rmb.push("NULL");
		// sth2rmb.push("NaN");
		// sth2rmb.push("ES5");

		txtContent.push(sth2rmb);


		sth2rmb = [];
		sth2rmb.push("Still! Live 4 What?");
		// sth2rmb.push("JAVASCRIPT");

		txtContent.push(sth2rmb);

		sth2rmb = [];
		sth2rmb.push("I'V Fnshd, Yrtrn");
		// sth2rmb.push("JAVASCRIPT");

		txtContent.push(sth2rmb);



    
		let txtsiz;
    txtsiz = 200;
		let m=0;    // for counter num
		let strColor = 'rgba(0,255,0,'+str(1/30)+')';
		let txtSzTitle,txtSzBottom;
		let numLoop = 12;

    pdTitle(txtContent[1].at(-1),txtContent[2].at(-1),txtsiz);

    console.log(txtContent[1].at(-1),"txtContent");
    function pdTitle(titleContent,subtitleContent,txtSize){

      textAlign(CENTER,CENTER);
      
      for (let k = 0; k<numLoop; k++){
        txtSzTitle = txtSize+cos(radians(k*90/numLoop))*400*(1+sin((frameCount)));
        textFont('Courier',txtSzTitle);
        let alp = parseFloat((pow((1+cos(radians(90+90*(numLoop-k)/numLoop))),2)).toFixed(2));
        strColor = (k==numLoop-1)?"255":'rgba(0,255,'+str((k*255/numLoop).toFixed(0))+','+alp+')';
        fill(strColor);
        text(titleContent, pagesizew/2,pagesizeh*(1-0.618));
        textFont('Courier',txtSzTitle/33);
        text(alp.toFixed(2), pagesizew*0.618,pagesizeh*(0.7)+k*txtSzTitle/44);
      }

      strColor = 'rgba(0,255,255,'+str((8*1/30).toFixed(2))+')';
      fill(strColor);
      textFont('Courier',txtSzTitle*0.25);
      text(subtitleContent, pagesizew/2,pagesizeh*(0.6));

    }

		
		
		m=0;
    let itm,textcontent;
    let widthMaxPerCol=[];
    let tx=10,ty=0;
    let colnum = 3;
    let rownumpercol = Math.floor(txtContent[0].length/colnum);
		txtSzBottom = 17;
		textFont('Courier',txtSzBottom);
		textAlign(LEFT,CENTER);
    textWrap(CHAR);

    for (let numcol=0; numcol < colnum; numcol++){
      widthMaxPerCol[numcol] = 0
      for (let numrow=0; numrow< rownumpercol; numrow++){
        itm = txtContent[0][m];
        if (itm) {
          strColor = 'rgba(0,255,'+str((numrow*255/9).toFixed(0))+','+str((0.2+numrow*1/12).toFixed(2))+')';
          fill(strColor);
          ty = pagesizeh - txtSzBottom*1.1*numrow - 1*txtSzBottom;
          textcontent = itm;
          text(textcontent, tx, ty);
          if (textWidth(textcontent)>widthMaxPerCol[numcol]){
            widthMaxPerCol[numcol] = textWidth(textcontent);
          }
        }
        m++;
      }
      tx += widthMaxPerCol[numcol]+40;
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

// https://techwithandy.online/es2022-javascript-features/