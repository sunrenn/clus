import { getStyle } from "./__style_getStyle.js";

export function acceler(oSth,attr,targx,v=100,w=1){

    clearInterval( numIntervID );
    clearTimeout( numTimerID );

    let speedV = v/1000;  // frame per sec
    let damper = 0.1; 
    let targetX = targx;
    let weight = w;
    let accelerationA= 0;
    let framePerSec = 30;
    let runningTime = 0;
    var numTimerID;
    var numIntervID;
    let initx = parseInt(getStyle(oSth,attr));
    let runningValue = initx;
    let distance = ( targetX - runningValue );
    numTimerID = setTimeout(()=>{
        numIntervID = setInterval( animRun ,(1000/ framePerSec ));
    },3);

    function animRun(){
        // 速度越来越快（重力，被目标吸引） 或者速度越来越慢（冲刺，瞄准目标）。
        // 撞击停止（接近或超过目标直接改为目标值）  或者 弹性减速停止
        runningValue = runningValue + speedV ;
        speedV = speedV*damper + accelerationA;
        oSth.style[attr] = runningValue +"px";
        distance = ( targetX - runningValue );
        // weight
        accelerationA = (1000/1000)*( distance /( targetX - initx )*2)
        // console.log("runningValue: "+runningValue);
        // console.log("accelerationA: "+accelerationA);
        // console.log("speedV: "+speedV);
        // console.log("distance: "+distance);
        runningTime = runningTime + 1000/24;
        if ((( distance < 1 )&&( speedV < 0.01 ))||( distance > 10000 )) {
            clearInterval ( numIntervID );
            clearTimeout ( numTimerID );
        }
    }
}

