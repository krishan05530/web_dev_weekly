const fs = require("fs");

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

// will all these run parallel, yes as all three are async funcion, all three fire simultanously
cleanFile("a.txt").then(function () {
    console.log("a read");
})
cleanFile("a1.txt").then(function () {
    console.log("a1 read");
})
cleanFile("a2.txt").then(function () {
    console.log("a2 read");
})

// the op can be any seq as file can take longer time to read than other