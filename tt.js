const n1 = Date.now();
let pi = 0
for (let i =0; i< 1000000000; i++){
  pi += 4 * 1/(2*i+1) * Math.pow(-1, i);
}
console.log(pi);
console.log(Date.now() - n1);