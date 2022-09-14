
export function randomChar(stri = "") {
    let charcode = 0;
    for (let i = 0; i < stri.length; i++) {
        charcode += stri[i].charCodeAt();
    }
    return charcode;
}

export function encodeStr(someStr){
	if (someStr!=null) {
		let letterArr = "qwertyuioplkjhgfdsazxcvbnmZXCVBNMLKJHGFDSAQWERTYUIOP".split("");
		let someStrArr = someStr.slice("");
		let num = 0;
		for (let i=0;i<someStrArr.length;i++){
			if (someStrArr[i]==" "){
				num += 99;
			}
			else {
				let thisCode = letterArr.findIndex(ele=>ele==someStrArr[i]);
				if (thisCode>0) {
					num += 1 + thisCode;
				}
				else {
					num += 0;
				}
			}
		}
		return num;
	}
}