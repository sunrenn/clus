import * as comm from "./_index.js";
import "./siteData.js";
let sData = window.siteGlobal.siteData;

(() => {
  
  // comm.newNode("div", comm.sTriangular(33), "testnodest");
  comm.newNode("div", "", "p5refer");
  comm.newNode("a", "P5JS Reference", "a_p5ref", "p5refer");
  a_p5ref.href = "https://p5js.org/reference/";
  a_p5ref.target = "_blank";
  a_p5ref.style.color = "#fff";
  a_p5ref.style.position = "fixed";
  a_p5ref.style.left = "10px";
  a_p5ref.style.bottom = "10px";
  a_p5ref.style.fontSize = "11px";
  let param = comm.parameters();
  comm.ajaxP5JsFile("scrPi", "../p5sketch/_p5i.js");
  if ((param.params) && (param.params.length > 0) && (param.params[1] != "")) {
    if (param.params[2] == "ml5js") {
      comm.ajaxP5JsFile("ml5lib", "../assets/ml5/ml5.min.js");
    }
      comm.ajaxP5JsFile("scrA", "../"+param.params[0]+"/"+param.params[1]+".js");
  }
  else {
      comm.ajaxP5JsFile("scrA", "../p5sketch/0.js");
  }

  let itmlist = sData.items.dataContent;
    
  const handleClick = function (e) {
      window.location = ('/?'+this.itemSrc.split(".")[0].replace("/","&")+"&"+this.type);
  }
    
  let oItmLst = comm.newNode("div","","oItemList");
  oItmLst.style.position="absolute";
  oItmLst.style.top="30px";
  oItmLst.style.left="30px";
  oItmLst.style.zIndex="33";
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
    let logoTxt = sData.problems['dataContent'][noRandom%sData.problems['dataContent'].length];
    comm.newNode("div",logoTxt,"oLogo","oHeader");
    let targetX = document.querySelector("#oItemList").getBoundingClientRect().left;
    targetX = Math.floor(targetX) - 168;
        
    comm.acceler(oHeader,"left",targetX);

  }
  headerLogo();

    
  comm.newNode("h1",comm.nowTime(),"h1a");

})();
