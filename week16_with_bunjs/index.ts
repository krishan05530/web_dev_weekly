/*console.log("Hello via Bun!");
function  greet(firstname:string)
{
    console.log("hello"+firstname);
}

greet("krishan")  


// type inference

function sum(a:number,b:number)
{
    return a+b;
}

let x=1;   // her i am not providing the any kind of the data type , string , number but strill 
let y=2; // here it has type inference , s it see 2 is number so it assume its number
let z="krish";  // her doe to type inference , z becomes string automatically

  console.log(sum(x,y));   // here i am passing the value , so it will assume(inference ) th type 

  //  number string , boolean , null and undefiend  ------- these are premittive type data type

  //  write a function first_element
  // that takes an array as input , 
  // it returnt  the first element if it exist ,
  // if it doesnt exist retun null
   

  // i can prvoide the composite return type 
  let vl: number|string=1;

  vl="asssc";  // good 
  vl=12223;   // good
   



//  her we specified the return type also
  function first_element (arr:number[]):null |number
  {
    if(Array.length>0)
    {
       // return arr[0];  // typescript feels arr[0] can be undefined  or number
         return arr[0] ?? null;  // so now its number or null
    }
    else return null;
  }


  // return type of it can be number | null
let ans=  first_element([1,2,3]);// good
//first_element(["asvssd"]);//cant do it



function islegal(age:number)
{
    if(age>18)
    {
        return true;
    }
    else return false;
}


console.log(islegal(2));


// create a function that takes another function as input and runs it after a second

function delayedCal(fn:(a:number,b:number)=>void)   // ()=>void , it mean it takes 0 argument and return the void 
{

  
    setTimeout(()=>{
         console.log(fn(3,4));
    }, 1000);
}

function summ(s:number,b:number)
{
    return s+b;
}
console.log( delayedCal(summ));
*/

// ---------------------------------------------------------type intereface---------------

//const express = require('express');

// we can use  modern
/*
import express  from "express"
import jwt from "jsonwebtoken"
const app =express();

interface SignUpInput{

    username:string,
    pssword:string,
    address:{
        city:string,
        pincode:number
    }
}


// zod provide run time type checking
// interface help me in type checking at compile time

app.post("/signup",(req,res)=>{
const body : SignUpInput=req.body;   // the shape fo body we want is SignUpInput, so added the type , SignUpInput, still we need zod ,as we, this type is checked at compile time but for run time we need zod

// body has only  SignUpInput element
// push t0 db

res.json({
    message:"Signed up"
})
})

app.listen(3000, ()=>{
    console.log("server running on port 3000")
})
    */


//  provide type to object
/*
interface User {
    firstName:string,
    lastName:string,
    email:string,
    age:number
}

let user1:User={
    firstName:"harkirat",
    lastName : "Singh" ,
    email:"krish@123",
    age:22
}

function isLegal(user:User) :boolean
{
if(user.age>18)
{
    return true;   // return type is inferred by ts atomatically
}else return false; 
}

console.log(isLegal(user1));
*/

// ---- you can implement interface as class--------------------------------------------
//so here we have iterface which we are  implemeting as classs
/*
interface Person  {
    name :string;
    age:number;
    greet(phrase:string):void ;

}
// this Manager class would have to user all paramter of Person interface , otherwise error will come
class Manager implements Person {
     name:string;
     age: number;


    constructor(name:string, age:number){
     
        this.name=name;
        this .age=age;
    }

    greet(phrase: string): void {
           console.log("hi there "+phrase)
    }
}

*/
/*
// ----------- we can use abstract class , if we hev this req to use the  interfcae as class
// abstract class is js feature , but interface is ts feature
abstract class shape {
    abstract name:string;
    abstract calculateArea():number;

describe()
{
    console.log(`the shape is a ${this.name} wiht an area ${this.calculateArea()} unit req`)
}
}

*/

// ------------------------------------TYPES-----------------------------------------
//  very simlar to interface 
/*
interface Human  {
    name :string;
    age:number;
    greet(phrase:string):void ;

}
//  or i can write it  , so both are same , interface human === type human =
type  manly = {
    name :string;
    age:number;
    greet(phrase:string):void ;

}

/// so why would use interface  or types  if both are same 
// interfce can be inmplemented by calss but types cant 

// feature of types
//1 unions 
 type  Pincode =string|number;

 let pincode:Pincode ="10033A";

 pincode=12231


 //interseciton
 type Employee ={
    name:string;
    startDate:Date;
 }

 type Manag ={
    name:string;
    department:string
 }

 // if we have two type , we can merge them like this, this is called interface , but it act like union , as common one comes only one
    type superManager=Employee & Manag;
*/

// so basically its same as
/*
 type superManager={
 name :string;
 startDate:Date,
 department :Date
 }
 */


//         array in ts---------------------
/*
function maxValue(arr:number[])
{
    let max=arr[0];
    for(let i=1; i<arr.length; i++)
    {
        if(arr[i]>max)
        {
            max= arr[i];
        }
    }
    return max;
}

console.log( maxValue([1,2,3]));
*/



//  array of interface---------
/*
interface UsersProfile {
    firstName:string,
    lastName:string,
    age:number
}

function filterUser(user:UsersProfile[])
{
return user.filter(x=>x.age>18)
}

console.log(
    filterUser(
        [
        {
            firstName:"krisan",
            lastName:"me",
            age:22
        },
        {
            firstName:"mahi",
            lastName:"singj",
            age:10
        }
        ]
    )
);
*/
// -------------------

// --------- enum in typscript---------------------------
// enum :  enumeration , it allow to define the set of named constant
// the concept behind enum is to create human readable way to represent the constant value , which migh otherowse be represented as string 





// this function will aceept left, right , up , down
// 
/*
function doSomthing(keyPressed:string)
{

}

doSomthing("up");
doSomthing("down");
doSomthing("left");
doSomthing("leftdosomethin"); // we can pass this too , as function accept string , so no problem but our logic will be broken 

//  one way to solve it is this 
type keyInput="up"|"down"|"left"|"right";
function doSomthing1(keyPressed:keyInput)
{

}

doSomthing1("up");
doSomthing1("down");
console.log(doSomthing1("left"));
// doSomthing1("leftdosomethin"); //so now at compile time we will get the error
*/


//  now enum -----------------more human way to do this
enum Directions {
    Up=1,  // here we are providng default starting poiint otherwise it will start from 0 
    Down,
    Left,
    Right
}

// [0,1,2,3]
function doSomthing2(keyPressed:Directions)
{
    if(keyPressed==Directions.Up)
    {

    }

}
doSomthing2(Directions.Up);
doSomthing2(Directions.Down);
doSomthing2(Directions.Left);
 console.log(doSomthing2(Directions.Right));



 // enums are used for standard status code 
/*
 enum ResponseStatus {
    success=200,
    NotFound=404,
    Error=500
 }


 app.get("/", (req,res)=>{

  res.status(ResponseStatus.NotFound).json({

  })


 })
  */
//  ---------------generic -----------------
// generic are language independent concept 


// write a function that return the array frst elemnt which can be string or number

type Input = string|number;
function firstEl(arr:Input[])
{
return arr[0];
}

const value = firstEl(["krisha","sigh"]);
console.log(value);  // 
// console.log(value.toUpperCase); // i cant do this it will give errror



//  generic allow u to create component that work with any data type while still provide compile time type safety


// eithert take stinng or number
/*
function Identity(arg:string|number)
{
    return arg;
}

let oup1= Identity("mystring");
let oup2= Identity(100);
*/

/*
// -- now generic
function Identity<T>(arg:T):T
{
    return arg;
}

let oup1= Identity<string>("mystring");
let oup2= Identity<number>(100);
*/




// -- now generic soltution of problem
function getFirstElement<T>(arr:T[]):T
{
    return arr[0];
}

let oup1= getFirstElement<string>(["mystring","singh"]);
let oup2= getFirstElement<number>([100,330]);

