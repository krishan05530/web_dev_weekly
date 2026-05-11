//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>week5>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// promise are the object of promise class, that represent the evantual result of asynchronous task , either its successs or failur
// its used in fetching data 



// promise need function 
// const pr = new Promise();
// console.log(pr);


const pr = new Promise((resolve, reject) => resolve);
const { error } = require("console");
// console.log(pr);
// state for promise
/*
1 pending  : default state of promise.it can convert into resolved or reject, like if file is read , then it beocmes solved, else rjected
2. resolved :operaton completed succesfully
3. rejected: operaton rejected
*/


// cerate a promisified verion of fs.readFile
// cerate a promisified verion of setTimeout
// cerate a promisified verion of fs.writefile


// this is how we do using callway function 
const fs = require("fs");

/*

//this return nothing
fs.readFile("a.txt", "utf-8", function (err, data) {
    if (err) {
        console.log("Error");
    }
    else {
        console.log(data);
    }

});
*/
// this fnction take callback function 


/*
// now by promises, if we assume this is promisified vrsion of fsreadfile then 
function fsReadFilePromisified(fineName, encoding)
{

}

// so this is how we will use the promisified verionof readfile
fsReadFilePromisified("a.tx","utf-18")
.then(function(data){
   console.log(data);
}).catch((function(error){
   console.log(error);
}))
*/

// whenver we have to make promisified veriosn of anythingg , it will return promise

function fsReadFilePromisified(fineName, encoding) {
    // promise takes a funciton , and this function take two function as inut , resolve & reject, its already written in Promise class
    return new Promise(function (resolve, reject) {
        // now write what u want in this fucntion to do

        // if file read if done then i will pass data to resolve , else err to reject and 
        fs.readFile(fineName, encoding, function (err, data) {
            if (err) {
                reject(" err while reading");
            }
            else {
                resolve(data);
            }
        })
    })
}

fsReadFilePromisified("a.txt", "utf-8")
    .then(function (data) {
        console.log(data);
    }).catch((function (error) {
        console.log(error);
    }))
// so we have write the promisified version of exisitng callback based asynchronous function



// now write promisified version of settimeout

// this is how we write the  setTimeOut fuction  , here function is callback function
setTimeout(function () {
    console.log("hi")
}, 1000);


// now we have to write promisified version of it , we wil send only delay time , as we want to write promise based setTimeut , so no callback function will be passed to it by user
// setTimout has only resolve state , as it doesnt has reject , cause its always run
function setTimeOutPromisified(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, ms);
    })
}

// dont pass the callback function in promisified version
/*
setTimeOutPromisified(1000)
    .then(function () {
        console.log("ji timmout")
    })
    .catch(function () {
        console.log("an error cause");
    })
    .finally(function () {
        console.log("finally after eithe then or catch")
    })
        */
// finally run always


// alwas promisifeid version will have one less argment , as callback funciton is not passed in promisified version

// creating another promisified version to read file and convert in uppercase




// so after making promisified , we can avaoid call back hell, and use async and await syntenx


// another way to write promisified fucniton 
async function main() {
    let file1content = await fsReadFilePromisified("b.txt", "utf-8");
    console.log(file1content);
}
//async and await are synthtic suger 
//using  await , so whatever this ashyc function resolve in will come in file1content

main();
console.log("hi")
console.log("hello")

// so now writitng all ways 
/*
1st callback based async function  




2nd promises with the .then syntex



3rd async await syntex

*/



// read the file and remove the extra space and then write the content again 
/*
//1st way using callbak way 
function cleanPath(pathfile, cb) {
    fs.readFile(pathfile, "utf-8", function (err, content) {
        const trimeContent = content.trim()
        fs.writeFile(pathfile, trimeContent, function () {
            cb();  /// call the function after wiritng 
        })
    })
}

cleanPath("a.txt", function () {
    console.log("done cleaning a.txt");
});
*/


// now wrte better using  Promise 

function cleanPath(pathfile) {
    return new Promise(function (resolve, reject) {
        fs.readFile(pathfile, "utf-8", function (err, content) {
            if (err) {
                reject();
            }
            else {
                const trimeContent = content.trim()
                fs.writeFile(pathfile, trimeContent, function (err) {
                    if (err) {
                        reject();
                    }
                    else {
                        resolve();
                    }
                })
            }
        })
    })

}

cleanPath("a.txt").then(function () {
    console.log("file has been cleaned")
})
    .catch(function () {
        console.log("Error while cleaning file")
    })
