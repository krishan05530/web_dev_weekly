// --------------------------------array funciton --------------------

function summm(a, b) {
    return s + b;

}

const v = (a, b) => { return a + b };

// app.get("/", (req, res) => {
// })

//   map 

// given an array give me back a new array in which every val is * by 2
//[1,2,3,4,5]
const inp = [1, 2, 3, 4, 5];
const newarray = [];

// for (let i = 0; i < inp.length; i++) {
//     newarray.push(inp[i] * 3)
// }

// another way
// transform function transform the all value 
function transform(i) {
    return i * 2;
}
// here transform funciton will transform all 

const ans = inp.map(transform);
console.log(ans);

// another way 

inp.map(function tran(i) {
    return i * 3;
})

console.log(inp);


// filter 
//  what if I tell u , given an input array , give me all even val from it 
const vv = [1, 2, 3, 4, 5];
for (let i = 0; i < vv.length; i++) {
    if ((vv[i] % 2) == 0) {
        newarray.push(inp[i]);
    }
}
console.log("arrray is");
console.log(newarray);
/*
function filtering(n) {
    if (n % 2 == 0) return true;
    else return false;
}
const ansu = vv.filter(filtering);
*/

const ansu = vv.filter(function filtering(n) {
    if (n % 2 == 0) return true;
    else return false;
});


console.log(ansu);

// filter take only odd value 
// const valll = vv.filter((i) => (i % 2) == 1);
//console.log(valll);

const valll = vv.filter((i) => {
    if (i % 2 == 0) return true;
    else false;
}
);
console.log(valll);