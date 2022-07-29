import * as comm from "./_index.js";
import "./siteData.js";
let sData = window.siteGlobal.siteData;

(()=>{
    
    let param = comm.parameters();
    if ((param.params)&&(param.params.length>0)&&(param.params[1]!="")) {
        if (param.params[2]=="ml5js") {
            comm.ajaxP5JsFile("ml5lib", "../assets/ml5/ml5.min.js");
        }
        comm.ajaxP5JsFile("scrPi", "../show/_p5i.js");
        comm.ajaxP5JsFile("scrA", "../"+param.params[0]+"/"+param.params[1]+".js");
    }

    let itmlist = sData[0].dataContent;
    
    const handleClick = function (e) {
        window.location = ('/?'+this.itemSrc.split(".")[0].replace("/","&")+"&"+this.type);
    }
    
    comm.newNode("div","","oItemList");
    for (let i=0; i < itmlist.length; i++) {
        comm.newNode("div",itmlist[i].itemName,"o"+itmlist[i].id,"oItemList");
        let newid = "o"+itmlist[i].id;
        let newele = window[newid];
        newele.className += "btnp5";
        newele.itemSrc = itmlist[i].itemSrc;
        newele.type = itmlist[i].type;
        newele.addEventListener("click", handleClick);
    }



    
    function headerLogo(){

        comm.newNode("header","","oHeader");
        let noRandom = (param.params)?comm.randomChar(param.params[1]):0;
        let logoTxt = sData[1]['dataContent'][noRandom%sData[1]['dataContent'].length];
        comm.newNode("div",logoTxt,"oLogo","oHeader");
        let targetX = document.querySelector("#oItemList").getBoundingClientRect().left;
        targetX = Math.floor(targetX) - 168;
        
        comm.acceler(oHeader,"left",targetX);

    }
    headerLogo();

    
    // console.log("index中的comm：");
    comm.newNode("h1","hiHhiHhiHhiH~","h1a");
    let txtResult = comm.nowTime();
    h1a.innerHTML = txtResult;

})();
