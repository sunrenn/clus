
export function ajaxP5JsFile(sId, url) {
    var oXmlHttp = GetHttpRequest();
    oXmlHttp.onreadystatechange = function () {
        if (oXmlHttp.readyState == 4) {
            replaceJS(sId, url, oXmlHttp.responseText);
        }
    }
    oXmlHttp.open('GET', url, false); //这里要使用异步操作，设计回调程序。
    oXmlHttp.send(null);

    function GetHttpRequest() {
        if (window.XMLHttpRequest) // Gecko  
            return new XMLHttpRequest();
        else if (window.ActiveXObject) // IE  
            return new ActiveXObject("MsXml2.XmlHttp");
    }

    function includeJS(sId, fileUrl, source) {
        if (source != null) {
            var oScript = document.getElementById(sId);
            if (!(oScript)) {
                var oHead = document.getElementsByTagName('HEAD').item(0);
                var oScript = document.createElement("script");
                oScript.type = "text/javascript";
                oScript.id = sId;
                oScript.text = source;
                oHead.appendChild(oScript);
            }
            else {
                // oScript.text = source;
                oScript.text += source;
            }
        }
    }

    function replaceJS(sId, fileUrl, source) {
        if (source != null) {
            var oScript = document.getElementById(sId);
            if (oScript) {
                oScript.remove();
            }
            var oHead = document.getElementsByTagName('HEAD').item(0);
            var oScript = document.createElement("script");
            oScript.type = "text/javascript";
            oScript.id = sId;
            oScript.text = source;
            oHead.appendChild(oScript);
        }
    }

    function rebuildJS(sId, fileUrl, source) {
        if (source != null) {
            var oScript = document.getElementById(sId);
            if (oScript) {
                oScript.remove();
            }
            var oHead = document.getElementsByTagName('HEAD').item(0);
            var oScript = document.createElement("script");
            oScript.type = "text/javascript";
            oScript.id = sId;
            oScript.text = source;
            oHead.appendChild(oScript);
        }
    }

}
