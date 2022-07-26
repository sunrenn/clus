import "./homepage.js";
import * as comm from "./_index.js";
window.onload = ()=>{
    // console.log("index中的comm：");
    console.log(comm);
    comm.newNode("h1","hiHhiHhiHhiH~","h1a");
    let txtResult = comm.nowTime();
    h1a.innerHTML = txtResult;
}
