//Step1: Import modules

const express= require("express");
const mysql= require ("mysql2")

// step 2 : initiate express

let app= express

// step4: setup DB connection

let myDBconnection=mysql.createConnection({
    user: "riaCRUDpractice",
    password: "riaCRUD@1234",
    host: "localhost",
    port: 8889,
    database: "riaCRUDdb"
});

//step5: setup db and user in phpMyAdmin

// // step6: connect with db

// myDBconnection.connect((err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("DB connected successfully")
//     }
// })

// // step 3: create server

// let PORT=4648
// app.listen(PORT,( err)=>{
//     if (err){
//         console.log(err)
//     }else{
//         console.log(`server is listening to port: ${PORT}`)
//     }
// })

// !Better way for db and server connection (step 3 and 6 combined)

async function startServer(){
    try{
        myDBconnection.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("DB connected successfully")
    }
})

 let PORT=4648
app.listen(PORT,( err)=>{
    if (err){
        console.log(err)
    }else{
        console.log(`server is listening to port: ${PORT}`)
    }
    }
) }catch(err){
    console.log(err)
} 
}
