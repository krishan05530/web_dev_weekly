const express = require('express');


const users=[{
    id:1,
    username:'user1',
    password:'pass1'
},{
    id:2,
    username:'user2',
    password:'pass2'    
}]


const organizations=[{
    id:1,
    title:'100xdev org',
    description :" learningncodeing plafromr",
    admin:"1",
    members:[1] //id of user1              
},
{
    id:2,
    title :"ramag org",
    description :" learningncodeing plafromr",
    admin:"1",
    members:[]
}];

const boards=[{
    id:1,
    title:'100xdev webitse frontend',
    organizationId:1,
}]

const issues=[{
    id:1,
    title:'create login page',
    boardId:1,

},{
    id:2,
    title:"allow admin to create more ocurses",
    boardId:1,
}]


const app= express();

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})