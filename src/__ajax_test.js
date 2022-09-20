export function createXHR(url, somefun, isSync = true, meth = 'GET') {
  let oXHR;
  if (window.XMLHttpRequest) // Gecko  
    oXHR = new XMLHttpRequest();
  else if (window.ActiveXObject) // IE  
    oXHR = new ActiveXObject("MsXml2.XmlHttp");
}

function startRequest() {
  createXHR();
  oXHR.onreadystatechange = handleStateChange;
  oXHR.open("GET", "innerHTML.xml", true);
  oXHR.send(null);
}

function handleStateChange(somefunc) {
  if (oXHR.readyState == 4) {
    if (oXHR.status == 200) {
      somefunc(oXHR.responseText);
    }
  }
}

funResponseText(rtStr) {
}



function fetchExample() {
  fetch("https://api.nomics.com/v1/currencies/ticker?key=54b37d19b9d2fc7cbe43cc21fabdf8d82b75075e&ids=BTC,ETH,XRP&interval=1d,30d&convert=EUR&platform-currency=ETH&per-page=100&page=1")
    .then(response => response.json())
    .then(data => console.log("data"));
}