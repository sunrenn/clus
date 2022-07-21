export function nowTime (){
    //倒计时 时间差 = 未来的时间-当前的时间
    //1.获取当前时间
    let dNow = new Date();
    dNow = new Date(2020,4-1,29,11,11,11);

    //2.获取未来时间
    let dFuture = new Date("2072,5,1,00:00:00");

    //3.相减得到时间差
    let time = parseInt((dFuture - dNow)/1000); //得到两个时间之间的毫秒数

    //4.将时间差转换成天 
    var t = parseInt(time/86400); //time/60/60/24
    var h = parseInt(time%86400/3600);
    var m = parseInt(time%3600/60);
    var s = time%60;

    some_innerHTML = "现在距离51放假还剩："+t+"天 "+to0x(h)+":"+to0x(m)+":"+to0x(s);

    //5.获取时间戳
    let tStamp = Date.now()-24*60*60*1000;

    intFullYear_yyyy = dNow.getFullYear();
    intMonth_0to11 = dNow.getMonth();
    intDate_1to31 = dNow.getDate();
    intHours_0to23 = dNow.getHours();
    intMinutes_0to59 = dNow.getMinutes();
    intSeconds_0to59 = dNow.getSeconds();
    intMilliseconds_0to999 = dNow.getMilliseconds();
    intTimeDate = dNow.getTime();  // milliseconds since January 1, 1970
    intDay_0to6 = dNow.getDay();

    return dNow;
}
