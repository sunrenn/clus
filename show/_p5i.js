
class FLogo {

    constructor(arrPageSize = [512,512], logoIndex = 0, logoColor = 0) {

        this.type = ["wallpaper","wechatMoments","A4Print"];
        this.size = [[1920,1080],[1080,1920],[512,512],[2100,2970],[2970,2100]];
        this.pageOrientation = ["landscape","portrait"];

        this.pw = arrPageSize[0];  // 用于内部尺寸的度量
        this.ph = arrPageSize[1];  // 用于内部尺寸的度量

        this.logoIndex = logoIndex;
        this.logoColor = logoColor;

        this.logoArr = [];
    }

    pageSize(){
        let [pagesizew,pagesizeh] = ((basesize = [window.innerWidth, window.innerHeight],scale = 1) => { 
            let arr = [basesize[0]*scale, basesize[1]*scale];
            return arr; 
        })([ this.pw, this.ph ],1);
    }

    logoInfo(){

        let slogen;
        let logotxt;

        slogen = "no Use & Learn less";
        logotxt = "NULL";
        this.logoArr.push([logotxt, slogen]);

        slogen = "something to remember";
        logotxt = "sth2RMB";
        this.logoArr.push([logotxt, slogen]);

        slogen = "assertion & assert";
        logotxt = "ASS";
        this.logoArr.push([logotxt, slogen]);

        slogen = "sth know but I don't know";
        logotxt = "now";
        this.logoArr.push([logotxt, slogen]);

    }

    masterPlate(){
        // 这里是固定的母版模版版式（是不是应该改成 masterPlate ）
        const logosize = 9;
        const [pw,ph] = [ this.pw, this.ph ];

        this.logoInfo();

        let tmpX = (pw-textWidth(this.slogen)*0);
        let tmpY = (ph-logosize);

        fill(this.logoColor);

        textFont('Georgia',logosize);
        textAlign(RIGHT,BOTTOM);
        text(this.logoArr[this.logoIndex][0],tmpX,tmpY);

        textFont('Helvetica',0.618*logosize);
        textAlign(RIGHT,BOTTOM);
        text(this.logoArr[this.logoIndex][1],tmpX,tmpY+logosize);

    }

}
