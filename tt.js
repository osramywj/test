const variableX = 42;
// console.log({ variableX });
// console.error('I\'m sorry Dave, I\'m afraid I can\'t do that');
const obj = {
    propA: 1,
    propB: 2,
    propC: 3
  };
// console.table( obj );
// console.dir(obj);
// console.log(
//     '%cOK, things are really bad now!',
//     `
//     font-size: 2em;
//     padding: 0.5em 2em;
//     margin: 1em 0;
//     color: yellow;
//     background-color: red;
//     border-radius: 50%;
//     `
//   );
// const life= 42;
// console.assert(
//     life === 42,
//     'life is expected to be',
//     42,
//     'but is set to',
//     life
//   );
function callMeTwo() {
    console.trace();
    return true;
  }
  function callMeOne() {
    return callMeTwo();
  }
  const r = callMeOne();