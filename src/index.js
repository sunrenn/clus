import "./homepage.js";

window.onload = ()=>{
    clusCreate.createdom("h1","hi~","h1a");
    let txtResult = clusCommon.nowTime();
    h1a.innerHTML = txtResult;
}
