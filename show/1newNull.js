
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
		console.log(nlg);
		var nlg = new FLogo([512,512],1,200);
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
	}
	content(){

		let txtContent = [];
		let sth2rmb = [];
		sth2rmb.push("alpha α");
		sth2rmb.push("beta β");
		sth2rmb.push("gamma γ");
		sth2rmb.push("delta δ");
		sth2rmb.push("epsilon ε");
		sth2rmb.push("zeta ζ");
		sth2rmb.push("eta η");
		sth2rmb.push("theta θ");
		sth2rmb.push("iota ι");
		sth2rmb.push("kappa κ");
		sth2rmb.push("lambda λ");
		sth2rmb.push("mu μ");
		sth2rmb.push("nu ν");
		sth2rmb.push("xi ξ");
		sth2rmb.push("omicron ο");
		sth2rmb.push("pi π");
		sth2rmb.push("rho ρ");
		sth2rmb.push("sigma σ");
		sth2rmb.push("tau τ");
		sth2rmb.push("upsilon υ");
		sth2rmb.push("phi φ");
		sth2rmb.push("chi χ");
		sth2rmb.push("psi ψ");
		sth2rmb.push("omega ω");

		txtContent.push(sth2rmb);
    

		sth2rmb = [];
		sth2rmb.push("null");

		txtContent.push(sth2rmb);


		sth2rmb = [];
		sth2rmb.push("neull4life");

		txtContent.push(sth2rmb);



    
		let txtsiz;
    txtsiz = 611;
		let m=0;    // for counter num
		let strColor = 'rgba(0,255,0,'+str(1/30)+')';
		let txtSzTitle,txtSzBottom;
		let numLoop = 12;

    pdTitle(txtContent[1].at(-1),txtContent[2].at(-1),txtsiz);

    function pdTitle(titleContent,subtitleContent,txtSize){

      textAlign(CENTER,CENTER);
      
      for (let k = 0; k<numLoop; k++){
        txtSzTitle = txtSize-sin(radians(k*90/numLoop))*444;
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
    let colnum = 4;
    let rownumpercol = Math.floor(txtContent[0].length/colnum);
		txtSzBottom = 14;
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



    console.log(rownumpercol,"rownumpercol");

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