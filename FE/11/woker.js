function fn(n){
    return n<=2? 1 : fn(n-1) + fn(n-2);
}
console.log(this) // DedicatedWorkerGlobalScope
this.onmessage = function(event){
    const result = fn(event.data);
    postMessage(result);
}