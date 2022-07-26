
export function ajaxP5JsFile(sId, url) {

    function objXMLHttpRequest(somefun) {
        
        let oXHR;

        if (window.XMLHttpRequest) // Gecko  
            oXHR = new XMLHttpRequest();
        else if (window.ActiveXObject) // IE  
            oXHR = new ActiveXObject("MsXml2.XmlHttp");

        oXHR.onreadystatechange = function () {
            if (oXHR.readyState == 4) {
                somefun(sId, url, oXHR.responseText);
            }
        }
        oXHR.open('GET', url, false); //这里要使用异步操作，设计回调程序。
        oXHR.send(null);
    }

    objXMLHttpRequest(replaceJS);

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
