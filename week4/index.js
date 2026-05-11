const { use } = require("react");

// classes in js
function sum(a, b) {
    return a + b;
}

let ans = sum(1, 2);

// primitive types nubers ,integr, string , boolea 
// complex : objects, arrays 

let user = {
    name: "krish",
    age: 21
}

console.log(user.name);



// array 
let arr = [1, 2, 3, 4, 5];

let users = {
    name: "krish",
    age: 21,
    cities: ["delhi", "har", "bana"]
}

console.log(users.cities[0]);


// classes in js
// classes let u define the blueprint for creating obj(real life entity)
// It is mainly used in object-oriented programming (OOP) to group data (properties) and functions (methods) together.
// Encapsulation
// Inheritance
// Polymorphism
// Abstraction

class Rectangle {
    constructor(w, h, c) {
        this.width = w;
        this.height = h;
        this.color = c;
    }
    static whoami() {
        return "i am rec";
    }

    area() {
        const area = this.width * this.height;
        return area;
    }

    print() {
        console.log(`painting with color ${this.color}`);
    }


}

const react = new Rectangle(2, 4, 6);
const area = react.area();
console.log(area);


const d = new Date();
console.log(d.getMonth());
// now static method , it bleong to class , not to object 
//A static method is a method defined inside a class using the static keyword that can be called using the class name without creating an object.

// calling static method , directly on class
console.log(Rectangle.whoami())


// inheritence
// Inheritance in JavaScript means one class can use the properties and methods of another class.
//extends are use to inherit
class Parent {

}

class Child extends Parent {

}
/*
class Animal {
    speak() {
        console.log("hey");
    }
}

class Dog extends Animal {

}

const de = new Dog;
console.log(de.speak());
*/
// noe another example with constructor

/*
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(this.name + " make sound");
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);  // call parent constructor
        this.breed = breed;
    }

}

const dio = new Dog("tommy ", "lab");
dio.speak();
*/

// ----------------------now method overiding
/*
class Animal {
    speak() {
        console.log("Animal sound");
    }
}

class Dog extends Animal {
    speak() {
        console.log("Dog barks");
    }
}

const doo = new Dog();
doo.speak();
*/


// ------------------encapsulation ------------
//Encapsulation means hiding internal data and controlling access to it.
//# is used for private 
/*
class BankBalance {
    #balance = 0;  // its priavet , i cant accss it directly 
    deposit(amount) {
        this.#balance += amount;
    }

    getBalance() {
        return this.#balance;
    }
}

const acc = new BankBalance();
acc.deposit(100);
console.log(acc.getBalance());
*/

//---------------------------polymorphism--------------
// polymorphism mean same name but diferent behavior
/*
class Animal {
    speak() {
        console.log("Animal makes sound");
    }
}

class Dog extends Animal {
    speak() {
        console.log("Dog barks");
    }
}

class Cat extends Animal {
    speak() {
        console.log("Cat meows");
    }
}

new Dog().speak();
new Cat().speak();
*/
//Abstraction-----------
//Abstraction means show only important features and hide complexit
/*
class Car {
    start() {
        this.#igniteEngine();
        console.log("Car started");
    }

    #igniteEngine() {
        console.log("Engine ignition");
    }
}

car.start()
*/


// 2 problems → SDE sheet
// 1 problem → POTD
// 1 problem → revision

// map class
const map = new Map();
map.set('name', 'Alice');
map.set('age', 30);
console.log(map.get('name'));


//->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>promise----------------------------------------->>>>>>>>>>>>
/*
promise in js is object that represnt the evantual completion(or failure) of an asynchronous operation and its resulting value.
promise are use to handlet the ashynchonous task more efficiently than traditional callback function
to deal with the code that executee asynchrnously , such as api calls , file i/o or times
*/

function afterFileRead(err, content) {
    console.log(content);
}
const fs = require("fs");
const { resolve } = require("path");
const { rejects } = require("assert");
fs.readFile("a.txt", "utf-8", afterFileRead);   // this is a asynchrnous task ,OS will take its own time to read file and return its content

let s = 0;
for (let i = 0; i < 10000; i++) {
    s += i;
}
// so in this i am asking the os to read the file and when os is done , so this callback function willl be called
// while os is reading file, but js thread will do another task
// now we can write it 

//->>>>>>>>>>>>>Call back based async funciton -------------------->>>>>>>>>>>>>>>>>>>>
/*
function callback() {
    console.log("hi there");
}

setTimeout(callback, 5 * 1000);


for (let i = 0; i < 1000; i++) {
    pg += i;
}
console.log(pg);
*/
/*
first pg will print then hi therie , as settimout is asynchornous task.
If you write 5 more for loops, JavaScript will NOT check the callback queue after each loop.
It will execute all synchronous code first, then check the queue.
*/



/// now  we are calling promisified based async function
function callback() {
    console.log("hi there");
}
// its promisied version of settimeout
function setTimeoutPromisified(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// mean whn 3 seond complete then calll this callback function
setTimeoutPromisified(3000).then(callback);  // this is how we call settimeout with promise.

setTimeout(callback, 1000);  //settimeot without promise  // its traditional

// boht are smae , both doing async ,

// now another example

function readThis(err, data) {
    if (err) {
        console.log("Error while reading ");
    } else {
        console.log(data);
    }
}

fs.readFile("a.txt", readThis);

// now we will write the promisified version of "readfile callback based" version 

function fsReadFilePromisified(filepath, encoding) {

    // returning a obj of the promise class
    return new Promise((resolve, reject) => {

        // simply read the file and a callback function 
        fs.readFile(filepath, encoding, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })

    })
}

function callbackErr() {
    console.log("Error ");
}

// if prmosified version of this . if everything good the call callbakc function else calll callbackerr
fsReadFilePromisified("a.txt", "utf-8").then(callback).catch(callbackErr);
/*
Priority Order
Synchronous Code
      ↓
Microtask Queue (Promises)
      ↓
Macrotask Queue (setTimeout, setInterval, I/O)
*/
///------------------------------callback hell-------------------
// write a function which print hi there after 1 s and hello after 3 sec of first task, this create the callback hell
setTimeout(function () {
    console.log("hi there");
    setTimeout(function () {
        console.log("hello");
    }, 3000)
}, 1000)


// so comes the promise , to write cleaner

function setTimeoutPromisified(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// chained promise , its wrong way 

setTimeoutPromisified(1000).then(function () {
    console.log("hi");
    setTimeoutPromisified(3000).then(function () {
        console.log("hello");
        setTimeoutPromisified(5000).then(function () {
            console.log("last ji")
        })
    })
})


// now corrct way, using promisifie dverion of these asynch task
setTimeoutPromisified(1000)
    .then(function () {
        console.log("hi");
        return setTimeoutPromisified(3000)  // writing return is importnt , it mean wait for this promis before moving ahead
    })
    .then(function () {
        console.log("hello");
        return setTimeoutPromisified(5000)
    })
    .then(function () {
        console.log("last ji")
    })


// so writing the using promise to avaoid call back hell.



// underhood this work like thi
/*
new Promise((resolve, reject) => {
    // async work
})

call function
      ↓
create Promise
      ↓
setTimeout starts
      ↓
after ms milliseconds
      ↓
resolve() runs
      ↓
Promise is fulfilled
      ↓
.then() callback runs
*/




