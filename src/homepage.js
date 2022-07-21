// import * as comm from "./_index.js";

console.log("homepage中的comm：",comm);

(()=>{

    let siteData = [
        {
            dataType: "item",
            dataContent: [
                {
                    id: "INDEX",
                    type: "p5js",
                    itemName: "INDEX",
                    itemSrc: "/",
                },
                {
                    id: "call",
                    type: "p5js",
                    itemName: "NULL",
                    itemSrc: "show/1.js",
                },
                {
                    id: "money",
                    type: "p5js",
                    itemName: "no Money",
                    itemSrc: "show/2.js",
                },
                {
                    id: "notes",
                    type: "p5js",
                    itemName: "Notes",
                    itemSrc: "show/3.js",
                },
                {
                    id: "whiFlo",
                    type: "p5js",
                    itemName: "whistle in flowers",
                    itemSrc: "show/4.js",
                },
                {
                    id: "bb",
                    type: "p5js",
                    itemName: "bounce balls",
                    itemSrc: "show/5.js",
                },
            ]
        },
        {
            dataType: "problem",
            dataContent: [
                "啥?",
                "干啥?",
                "有啥用?",
            ]
        }
    ];
    
    let param = comm.parameters();
    if ((param.params)&&(param.params.length>0)) {
        // comm.ajaxP5JsFile("p5js", "../assets/p5/lib/p5.js");
        comm.ajaxP5JsFile("scrPi", "../show/_p5i.js");
        comm.ajaxP5JsFile("scrA", "../"+param.params[0]+"/"+param.params[1]+".js");
    }

    let itmlist = siteData[0].dataContent;
    
    const handleClick = function (e) {
        window.location = ('/?'+this.itemSrc.split(".")[0].replace("/","&"));
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
        let logoTxt = siteData[1]['dataContent'][noRandom%siteData[1]['dataContent'].length];
        comm.newNode("div",logoTxt,"oLogo","oHeader");
        let targetX = document.querySelector("#oItemList").getBoundingClientRect().left;
        targetX = Math.floor(targetX) - 168;
        
        comm.acceler(oHeader,"left",targetX);

    }
    headerLogo();

})();