const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(cors());
app.use(express.json());

//connection to databse 
const db = mysql.createConnection({
    user : 'root',
    host:'localhost',
    password:'',
    database:'tododb'

});

//to post task into tasks table 
app.post('/create',(req,res)=>{
    const task = req.body.task

    db.query("INSERT INTO tasks (task) VALUES (?)",
    task,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("value inserted successfully");
        }

    });
});

//to get all task from tasks table 
app.get('/alltasks',(req,res)=>{
    db.query("SELECT * FROM tasks", (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

//to update particular task
app.put('/updateTask', (req,res)=>{
    const id = req.body.id
    const task = req.body.task
    if(task != null){
    db.query("UPDATE tasks SET task = ? where id = ?",
    [task,id],
    (err,result)=>{
        if(err){
            consoile.log(err);
        }else{
            res.send(result);
        }
    })
}
})

//to delete task 
app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id
    db.query("DELETE FROM tasks where id = ?",
    id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.listen(5000,()=>{
    console.log("server is running in port 5000");
})

