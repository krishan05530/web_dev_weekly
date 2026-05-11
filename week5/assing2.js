// write a promisified function that takes a file prefix as an input 
// and cleans (prefix)1.txt),(prefix)2.txt, {prefix}3.txt
const fs = require("fs");


//Note : use this way to call the synchonous function , insise a asynchrnous function  
function cleanFile(filePath) {
    // return a promise , promise always takes a function
    return new Promise(function (resolve, reject) {

        // now do the actual thing i am supposed to do   
        fs.readFile(filePath, "utf-8", function (err, content) {    //Note this is synchrnose , callback based function 
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


//  function cleanManyFiles(prefix) {
//     return new Promise(
//         async function (resolve, reject) {
//             try {
//                 await cleanFile(prefix + "1.txt");
//                 await cleanFile(prefix + "2.txt");
//                 resolve();
//             }
//             catch (err) {
//                 reject();
//                 return;
//             }
//         })
// }



// async function return a promise , as in the end it convert into a function tat return a function 
//NOTE when we have to call async function inside another async function use like this
async function cleanManyFiles(prefix) {  // its wring asybc fucntion on the top of other async function
    await cleanFile(prefix + "1.txt");  // if this reject whole function reject
    await cleanFile(prefix + "2.txt");  // these all are async function,
    return "hi there"   // this we will get in .then(data) as data
}


/*                              ||
                                || 
                                ||
                                || 
                                both are same
// underhood this function looks like this .
function cleanManyFiles(prefix) {
    return new Promise(function (resolve, reject) {
        cleanFile(prefix + "1.txt")
            .then(function () {
                cleanFile(prefix + "2.txt")
                    .then(function () {
                        cleanFile(prefix + "3.txt")
                            .then(function () {
                                resolve(); // as everything went well
                            })
                            .catch(reject);

                    })
                    .catch(function(){
                        reject();
                    })
            })
            .catch(function()
        {
            reject();
        })
    })
} 

*/





// so if its promise , how would i call it , if promise get resolve call then(callback) else call catch(Callback) callback function.
cleanManyFiles("a")
    .then(function (data) {
        console.log(data); // i will get "hi there"
        console.log("all files have been cleaned")
    })
    .catch(
        function () {
            console.log("error while cleaning the file");
        }
    )

// when we create promise the state is pending , when its get resolve, it state beome  fulfilled , so run .then(callback) , run this callback funciton

