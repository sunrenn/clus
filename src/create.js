var clusCreate = (()=>{

// --------------------------------------------------

    var createdom = (ele,content,id="")=>{
        var oEle = document.createElement(ele);
        var oTxt = document.createTextNode(content);
        oEle.appendChild(oTxt);
        document.body.appendChild(oEle);
        oEle.id = id;
    }

// --------------------------------------------------

    var engReadableWords = (numSyllable)=>{
        letterA = "aeiou";
        letterB = "qwrtypsdfghjlzcvbnmkx";
    };


// --------------------------------------------------

    var ajaxStudy = ()=>{
        
    };

// --------------------------------------------------
// --------------------------------------------------

    return {
        createdom: createdom
    };

// --------------------------------------------------
// --------------------------------------------------
})();
