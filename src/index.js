import "./homepage.js";
import "../assets/p5/lib/p5.js";

window.onload = ()=>{
    // console.log("index中的comm：");
    // console.log(comm);
    clusCreate.createdom("h1","hi~","h1a");
    let txtResult = clusCommon.nowTime();
    h1a.innerHTML = txtResult;
}
