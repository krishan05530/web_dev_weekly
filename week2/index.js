// to run file write in console , node index.js
// js is single thread laguaga . its interpreted language 

const fs = require("fs");

// read file from a.txt , wiht utf-8 formate encoding
const contents = fs.readFileSync("a.txt", "utf-8");
console.log(contents);

// as we r reading file sync , while program wait for file read , it will wait and when reading done then only program move to another line of code , 
// so its sync , line by line 

// but in async , it will not wait for program to complete it will move to another line of code and when asyn work return , then control will again go to async code 
// while i/o operation use js thread to do anything else , thats asynchonus operation

//----------------function as argument--------------------------
function summ(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function doarithmetic(a, b, fn) {
    return fn(a, b);
}

// passing the function into another funcion 
const ans1 = doarithmetic(1, 2, summ);
const ans2 = doarithmetic(1, 2, sub);

//  synchronous and asynchronous code

//  synchonous code execute line by line , in the order its written .
//Synchronous code runs line-by-line.
// Each task must finish before the next task starts.
// -------asynchronous ---------------------
//  IO heavy operation (input output operation )
// when program  read a file , so program simply wait for completion of this read . while waiting program doesnt do anything.its the OS which will return the file context

// example of IO heavy operations
//reading a file
// http req


function isLegal(name, age) {
    if (age >= 18) {
        console.log(name + "the vl");
    }
    else {
        console.log(name + "");
    }
}

// taking obj 
function isLegal(user) {
    if (user.age >= 18) {
        console.log(user.name + "the vl");
    }
    else {
        console.log(user.name + "");
    }
}

var user1 = {
    name: "krishan",
    age: 17,
    pass: "123nnn",
}
var user2 = {
    name: "rahi",
    age: 19,
    pass: "123nnn",
    address: {
        city: "chd"
    },
    metadata: {
        likes: "food"
    }
}

isLegal(user1.name, user1.age); // pass value to function , as object key value pair
isLegal(user1);// passing the user obj


var userName1 = "kris"
var pass = "123";

var age1 = 16;


// arrray to group together 
var users = ["krishn", "rman", "ml"];

console.log(users[1]);
console.log(users[0]);
console.log(users[2]);

for (let i = 0; i < 3; i++) {
    console.log(users[i]);
}

// array of obje
var users3 = [{
    name: "kris",
    age: 23,
    pass: "mml"
},
{
    name: "kalu",
    age: 23,
    pass: "mml"
}
]
let x = users3[0];

let nm = x.name;


let mmu = [{
    name: 'kki',
    age: 10,
}, {
    name: 'lli',
    age: 70
}];


/// returnin  func
function valu(mnu) {
    let legal = [];
    for (let i = 0; i < mnu.length; i++) {
        if (mnu[i].age > 18) {
            legal.push(mnu[i]);
        }
    }
    return legal;
}

var l = valu(mmu);
console.log(l);

//  synchronous code run line by line

function sum(n) {
    let ans = 0;
    for (let i = 0; i < n; i++) {
        ans += i;
    }
    return ans;
}

let n = sum(5);
// --------------------Week 3----------------------------------
// Asynchronous
// i/o operations  : those operation in which task in computer involvs a lot of data transfer b/w program and externam system or devics
// it req waiting for data to read from or written to source like disk , network , database or other externam device
// whcih can be time consuming
//example : reading a file from program  , http req

// const fs = require("fs");
// const contents = fs.readFileSync("a.txt", "utf-8");
// console.log(contents);
// readFileSync is reading file synchronously
// fs.readFileSync ask the OS to read the file untill the OS responed, this JS thread will be stuck here .
// so for the duration in whic OS was doing its work ,cpu was idle , as it was i/o operations

//  cpu task like for loops

// i/o bound tasks : liek reading file , 
//   functional arguments (mean passing a function as argument)

function sum(a, b) {
    return a + b;
}
function sub(a, b) {
    return a - b;
}
// here dosum is function
// paramter are the var use to define function 
function doperation(a, b, dosum) {
    if (dosum == "sum") {
        let s = sum(a, b);
    }
    else {
        sub(a, b);
    }
}


// 1,2,sum are arguments 
doperation(1, 2, "sum");
doperation(1, 2, "sub");

// asynchobnous code and callback function 

// herer reding file asynchronously
//fs.readFile("a.txt", "utf-8");



// now this is cpu heavy taks 
// let s = 0;
// for (let i = 0; i < 100000; i++) {
//     s += 1;
// }

// js will wait for file to be read , the js thread will come to next line and when file reading complete , js thread will go back to file reading . 
// js doesnt work like this .

// ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>Call back funciton >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//here i am using the call back functon ,when fie reading completes , then calll this function 
// fs.readFile("a.txt", "utf-8", function (err, data) {
//     console.log(contents);
// })

//  or we can write it like
// function filereadCallback(err, contents) {
//     console.log(contents);
// }
//fs.readFile("a.txt", "utf-8", filereadCallback);


let y = 0;
for (let i = 0; i < 100000; i++) {
    y += 1;
}
// so when the file get read , then context will switch to readfile and console the content , but till then thread will perform other operations
// errr , if error comes , thsi error will tell whats wrong, erro first call back function

console.log(y);
// y will get printed first then content
//  so how does it work ? architecture of js

// if cpu is keep busy doing the task it will do the task untill it get completed, even if OS is waiting to call the callback function .
// if js thread is busy doing cpu task , its doesnt matter if OS is ready  for this call back , cpu will keep doing the task , once the task is completed thn thread will check if any callback , if it , it will call callback funciton .



////->>>>>>>>>>>>>>>>>>>>>>

const a = 1;
const b = 1;

console.log(a);
console.log(b);

// wait for 1 second 
// hw can we wait for 1 sec
// here cpu is doin some task for 1s , its like forced wait done by cpu 
/* let befortime =Date.now();
for(let i=0; i<100000; i++)
{
  let cureenttime =Date.now();
  if(cureenttime-befortime>=1000)
  {
    break;
  }
}
*/

// // then do it
// console.log(a+b);

// i can do better , i can use callback function to be call after 1 second , so cpu dont have to do force wait and can do aythng else in that 1 sec
// function callback() {
//     console.log(a + b);
// }
// setTimeout(callback, 1000);
// so here cpu doesnt have to force wait for 1s , cpu can perform other task , and when 1 sec done ,callback function will get call.

// console.log("the directory is");
// console.log(__dirname);


// -----------------------create set watch 
let ctr = 0;
function callback() {
    console.log(ctr);
    ctr = ctr + 1;
}

//setInterval(callback, 1000); // it keeps callig functin after every sec


// so for that 1 sec , thread is free
let p = 0;
for (let i = 0; i < 40000000; i++) {
    p = p + 1;
}
console.log("p is " + p);

// so settimeinterval is asycnhronous task ,which will be call after 1 s, during this time js thread will work on for loop , untill this for loop completes , the setimeinterval wont be called , even if 1 sec is passed

// how does
// callback queue
// asynchounus task wait in callback queue , while js thread is completing a task , when thread gets free after completing the task, only then asychronous task comes into calstack to get completd
/*
flow of code 
things used:  call satck , web apis( asychnous task are called , ) , callback queue 
 code comes into call stack , if its synchronos , it will get completd .
 if task coming into call stack in asynchronous then it will move to web api section , mean go out of call stack to do its work(fetching data from DB, aPI call , file reading) 
 and if their is another task after it which is synchounously , it will comes into call stack and get completd .
 when the asynchornous task complets its wokr (like fetched data from DB or have read file . or like setimeout (callback , 1000)  1 sec completd )  , they dont go to callsatck directly
 as call stack may be doiing another task .
 so these asynchounous task wait into call back queue , and when call stack get empty after completing synchouns task , these asynchrnous task comes into call stack . and gets completd 

 -NOTE , setInterval(callback , 0) ,so it will get called after 0 sec , but still its asychronous task , so it will wait into callback queue, only when js thread become empty then only it will get completd 


*/

