export function factorial(num,a=1){
  if (num<2) {
    return a;
  }
  return factorial(num-1,a*num);
};

export function sFibonacci(num) {
    // Fibonacci Sequence: 1,1,2,3,5,8,...
	try{

		let res = 0;

		if (num==1){
			res =  1;
		}
		else if (num==2){
			res =  1;
		}
		else if (num>2){
			res = sFibonacci(num-1) + sFibonacci(num-2);
		}
		else if (num==0){
			res = 0;
		}
		else {
			res = 0;
		}

		return res;

	}
	catch(e){


	}
}


export function sPerfect(intP, arrM) {
  // Perfect Squares: 1,4,9,16,25,...
  // Now given a sequence and a parameter p, you are supposed to find from the sequence as many numbers as possible to form a perfect subsequence.
  // 翻译：给出了一个正整数序列和另一个正整数p，该序列称为“完全序列”，如果M≤m*p，其中M和m分别是序列中的最大数和最小数。

  return true;
};



export function sTriangular(num) {
  // Triangular Numbers: 1,3,6,10,15,...
  if (typeof num !== 'number'){
    throw {
      name: "TypeError",
      message: "input the number"
    }
  }
  else {
    if (num > 0){
      let res=0;
      for (let i=0; i<num; i++){
        // let res = (num + sTriangular(num-1));
        // console.log(res);
      }
      return res
    }
  }
};



export function sPrime(num) {
    // Prime Numbers: 2,3,5,7,11,13,17,...
}



export function sPow2(num) {
    // 2^n: 2,4,8,16,32,64,...
}



