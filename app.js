//Step1: Import modules

const express= require("express");
const mysql= require ("mysql2")

// step 2 : initiate express

let app= express();

// ! middleWare()

app.use(express.urlencoded({extended:true}));
app.use(express.json());

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

// let PORT=4678
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

 let PORT=4678
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


// step7: Test api creation

app.get("/test",(req,res)=>{
    res.send("Backend is working.")
});
startServer();

// step eight: create table

app.get("/createTable",(req,res)=>{
    let tableSchema = `CREATE TABLE if not exists UserInfo(
    user_id int auto_increment,
    user_first_name varchar(255) not null,
    user_last_name varchar(255) not null,
    user_email varchar(255) not null,
    user_batch varchar(255) not null,
    user_group varchar(255) not null,
    user_course varchar(255) not null,
    PRIMARY KEY(user_id))`;

    myDBconnection.query(tableSchema, (err,result,filled)=>{

        // ! err if there is any error while executing
        // !data if there is any incoming data from db
        // !field any additional data
        if (err){
            console.log(err)
        }else{
            res.send("Table created successfully.")
        }
    });
})

// step9: data insertion 
app.post("/createUser", (req,res)=>{

    const {firstName, lastName, email, batch,group,course} = req.body;

    let insertQuery= `
    INSERT INTO UserInfo(
    user_first_name,
    user_last_name,
    user_email ,
    user_batch,
    user_group,
    user_course 
    )
    VALUES(?,?,?,?,?,?)  
    `

    myDBconnection.query(insertQuery, [firstName, lastName, email, batch, group, course],(err, data, field)=>{
         if (err){
            console.log(err)
        }else{
            res.send("Data inserted successfully.")
        }
    })
})

//  on the post man make the method post and  http://localhost:4678/createUser  and on the body write 
// {
//     "firstName": "Reyhana",
//     "lastName": "Hamza",
//     "email": "reyhana@gmail.com",
//     "batch": "Sunday",
//     "group": "A",
//     "course": "Full Stack"
// }



// step 10: getting your data

app.get("/getUserData",(req,res)=>{
    let getAllUsersQuery = `
    SELECT * FROM userInfo
    `

    myDBconnection.query(getAllUsersQuery, (err, data,fields)=>{
        if(err){
            console.log(err);
        } else {
            res.send (data);
        }
    });
})

//  on the post man make the method get and  http://localhost:4678/getUserData


// & if you want to select in ASC DES : SELECT * FROM userInfo ORDER BY Id ASC/DESC , SELECT * FROM userInfo WHERE user_id = ?

// STEP 11: update single data

app.patch("/user/:user_id",(req,res)=>{
    const { user_id } = req.params;
    const { user_group } = req.body;

    console.log(req.body);

    let updateQuery = `
    UPDATE UserInfo
    SET user_group=?
    WHERE user_id=?
    `;

    myDBconnection.query(
        updateQuery,
        [user_group,user_id],
        (err,data)=>{
            if(err){
                console.log(err);
                res.send("Error updating user");
            } else {
                res.send("User info updated successfully");
            }
        }
    )
})

// on the post man make the method PATCH and  http://localhost:4678/user/1  then on the body write {
    // "user_group": "Two"
// }


// STEP12: delete user data

app.delete("/user/:user_id", (req,res)=>{
    const { user_id } = req.params;

    let deleteQuery = `
    DELETE FROM userInfo
    WHERE user_id = ?
    `;

    myDBconnection.query(
        deleteQuery,
        [user_id],
        (err, data, field)=>{
            if(err){
                console.log(err);
                res.send("Error deleting user");
            }else{
                res.send("User data deleted!");
            }
        }
    );
});

// on the post man make the method delete and  http://localhost:4678/user/1
