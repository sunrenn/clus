
export function ajaxP5JsFile(sId, url) {
    var oXmlHttp = GetHttpRequest();
    oXmlHttp.onreadystatechange = function () {
        if (oXmlHttp.readyState == 4) {
            includeJS(sId, url, oXmlHttp.responseText);
        }
    }
    oXmlHttp.open('GET', url, false); //同步操作  
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
                oScript.text = source;
                // oScript.text += source;
            }
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
