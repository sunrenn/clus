var clusOneLine = (()=>{
    // https://livecodestream.dev/post/awesome-javascript-one-liners-to-look-like-a-pro/
    return {
        strReverse : str => str.split("").reverse().join(""),
        arrAverage : arr => arr.reduce((a,b) => a + b) / arr.length,
        arrPastWeek : [...Array(7).keys()].map(days => "\r\n"+(new Date(Date.now() - 86400000 * days))),
        strCapitalize : str => str.charAt(0).toUpperCase() + str.slice(1),
        arrRemoveDuplicates : (arr) => [...new Set(arr)],
        ifScrolledToBottom : () => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight,

        numToFixed : (n, d) => Number(Math.round(n + "e" + d) + "e-" + d),
    };

})();


clusCreate.createdom("p",(clusCommon.getStyle(document.querySelector("h1"),"font-family")));
clusCreate.createdom("p","1. strReverse: "+(clusOneLine.strReverse("[1,5]")));
clusCreate.createdom("p","2. arrAvaerage: "+(clusOneLine.arrAverage([1,5])));
clusCreate.createdom("p","3. arrPastWeek: "+(clusOneLine.arrPastWeek));
clusCreate.createdom("p","4. strCapitalize: "+(clusOneLine.strCapitalize("lots of words. but only the first word, so just for study.")));
clusCreate.createdom("p","5. arrRemoveDuplicates: "+(clusOneLine.arrRemoveDuplicates([1,3,5,2,3,5,1,3,12,3,4,5,4])));
