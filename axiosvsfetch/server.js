const axios = require("axios");

// function main() {
//     fetch("http://localhost:3000/")                   /*convert its response into json  */
//         .then(async response => {
//             const json = await response.json();
//             console.log(json);
//         })
// }
//  another way to write it 


// async function main(params) {
//     const response = await fetch("http://localhost:3000/")
//     const json = await response.json();
//     console.log(json);       // it has json {message : hello}
// }

// post req
// get this url from http dup website
/*
async function main() {
    const response = await fetch("https://httpdump.app/dumps/14e9a912-b71f-4cbf-80ed-ab23dcf8b9d6", {
        method: "POST",     //GET is default 
        body: JSON.stringify({            // in fecth body cant be simple obje , itr ust be stringify
            username: "krishan",
            password: "123"
        }),
        headers: {
            "Authorization": "Bearer 123"
        }
    })
    const txt = await response.text();
    console.log(txt);       // it has json {message : hello}
}
*/



//  now axios , as axios is  external library so 

// async function main() {

//     const response = await axios.get("http://localhost:3000/")
//     // in axios we get the response data , in response.data .
//     console.log(response.data.message)   // hello
// }

// POST method in axios 
// in axios 2nd argument is body , 3rd argument is header
/*
async function main() {
    const response = await axios.post("https://httpdump.app/dumps/14e9a912-b71f-4cbf-80ed-ab23dcf8b9d6",
        // body
        {
            username: "krishan",
            password: "1234"
        },
        // headers
        {
            headers: {
                "Authorization": "Bearer 123"
            },
        }
    )
    // in axios we get the response data , in response.data .
    console.log(response.data.message)   // hello
}
*/

// if we send get req, then 2nd argument is headers , and we cant send body in get req
async function main() {
    const response = await axios.get("https://httpdump.app/dumps/14e9a912-b71f-4cbf-80ed-ab23dcf8b9d6",
        // headers
        {
            headers: {
                "Authorization": "Bearer 123"
            },
        }
    )
    // in axios we get the response data , in response.data .
    console.log(response.data.message)   // hello
}

main();

//  in get req u cannot send body .
