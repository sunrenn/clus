
export function parameters() {
    let url = window.location.href;
    let paramString = new RegExp('(.*)[?](.*)').exec(url);
    if (null == paramString) {
        return {
            'base': url,
            'params': null
        };
    }

    if (paramString[2].includes("&amp;")) {
        var paramList = paramString[2].split("&amp;");
    } else {
        var paramList = paramString[2].split("&");
    }

    // let params = [];

    // for (let i = 0; i < paramList.length; i++) {
    //   let values = paramList[i].split("=");
    //   params[values[0]] = values[1];
    // }

    return {
        "base": paramString[1],
        "params": paramList
    };
}