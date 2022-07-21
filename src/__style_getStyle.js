

export function getStyle (elem,attr,pseudo=""){
    if (pseudo=="") {
        return elem.currentStyle ? elem.currentStyle[attr] : getComputedStyle(elem)[attr];
    }
    else {
        return getComputedStyle(elem,pseudo)[attr];
        // currentStyle如何处理伪类还没搞清楚
    }
}