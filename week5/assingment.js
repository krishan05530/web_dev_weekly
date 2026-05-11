//assingmet :read the file and remove the extra space from begining and write back
// create a cleanFile function

//Approrach 1 , sync function call
/*
const fs = require("fs");
function cleanFileSync(filePath) {
    let contetn = fs.readFileSync("a.txt", "utf-8");
    const trimContent = contetn.trim();
    console.log(trimContent);
    fs.writefileSync("a.txt", trimContent);
}
cleanFileSync("a.txt")
*/


// appreach 2 , usign async way callback based  , so thread doesnt get blocked
// in this when read is done then call the callback function ,

/*
const fs = require("fs");
function cleanFile(filePath, cb) {
    fs.readFile(filePath, "utf-8", function (err, content) {
        const trmiContent = content.trim();
        fs.writeFile(filePath, trmiContent, function () {
            cb();
        })
    });
}
// so when file reading is done , call this callback function
cleanFile("a.txt", function () {      // so this function is also passed to cleanFile
    console.log("done cleaning file")
})
*/


// now using promises, promised based function
/*
const fs = require("fs");
function cleanFile2(filePath) {
    // return a promise , promise always takes a function
    return new Promise(function (resolve, reject) {

        // now do the actual thing i am supposed to do
        fs.readFile(filePath, "utf-8", function (err, content) {
            if (err) reject();  // if something went wrong reject() called
            const trmiContent = content.trim();
            fs.writeFile(filePath, trmiContent, function () {
                resolve(); // when  everything went good , call resolve
            })
        });

    })
}


// assume this function get  promise , so we can call then , catch method
cleanFile2("a.txt").then(function () {
    console.log("file has been read")
})
    .catch(function () {
        console.log("error while readinf file")
    })
*/

// -----------------------------------------type 4 -----------------------------------------------------
// now using async and await 
// async await is suggercotting on promises
//We use await to wait for a Promise to finish before moving to the next line of code.
//await = pause this function until promise resolves
const fs = require("fs");
function cleanFile2(filePath) {
    // return a promise , promise always takes a function
    return new Promise(function (resolve, reject) {

        // now do the actual thing i am supposed to do
        fs.readFile(filePath, "utf-8", function (err, content) {
            if (err) {
                reject(err);  // if something went wrong reject() called
                return;
            }
            const trmiContent = content.trim();
            fs.writeFile(filePath, trmiContent, function (err) {
                if (err) {
                    reject(err);
                }
                resolve(); // when  everything went good , call resolve
            })
        });

    })
}

async function main() {
    try {
        await cleanFile2("a.txt");  // call the function
        console.log("cleaning done")
    } catch (e) {
        console.log("error while cleaning the file")
    }
}
main();


/*
The key idea: Promises don’t do the work themselves.
The actual async work happens outside the JavaScript thread, so JS is free to continue running.

JavaScript is single-threaded, but the environment (Node.js or browser) provides background workers / APIs that handle async tasks.
*/




// /example  for how does async and await work

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function main() {
    console.log("Start cleaning file");

    await wait(2000);   // wait 2 seconds

    console.log("File cleaned");
}

console.log("Program start");

main();

console.log("Program end");


/*
output
Program start
Start cleaning file
Program end
File cleaned
*/

//  how we write 
await wait(2000);
console.log("File cleaned");

// internally it become like this
wait(2000).then(() => {
    console.log("File cleaned");
});
/*
Pause THIS async function
until the promise resolves
But the JS thread keeps running other code.
*/

//  now funcs on event loop and how async function work -----------------------------------------------
/*
Correct Flow of async / await + Promises

Function enters the Call Stack

main()

When JavaScript sees await cleanFile2()

cleanFile2() runs

It returns a Promise

Because of await:

The async function pauses

It does NOT block the JS thread

The rest of the code outside continues executing

When the async task finishes (like fs.readFile):

The Promise resolves or rejects

The callback is placed in the Microtask Queue (not normal queue)

When the Call Stack becomes empty

The Event Loop pushes the microtask into the Call Stack

Execution continues after the await line
*/

/*
Call Stack
    |
    v
Async operation (fs.readFile / fetch / setTimeout)
    |
Node APIs / Web APIs
    |
    v
Promise resolved/rejected
    |
Microtask Queue (.then / await continuation)
    |
Event Loop
    |
Call Stack
*/

// so when we arite async , it mean it return a promise and ,await mean for for the completion of this async task