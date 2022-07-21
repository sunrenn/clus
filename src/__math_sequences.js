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

		console.log(e);

	}
}


export function sPerfect(num) {
    // Perfect Squares: 1,4,9,16,25,...
    return 123321
}



export function sTriangular(num) {
    // Triangular Numbers: 1,3,6,10,15,...
}



export function sPrime(num) {
    // Prime Numbers: 2,3,5,7,11,13,17,...
}



export function sPow2(num) {
    // 2^n: 2,4,8,16,32,64,...
}



