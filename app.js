const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000 ;

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
})

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.get('/getUsers', (req,res) => {
    console.log('Getting Users');

    db.query("SELECT * FROM users;",(err,result)=>{
        if(err){
            res.status(400).json(err);
        }else{
            res.json(result);
        }
        
    })
})

app.get('/getTransactions', (req,res) => {
    console.log('Getting Transactions');

    db.query("SELECT * FROM transactions ORDER BY id DESC;",(err,result)=>{
        if(err){
            res.status(400).json(err);
        }else{
            res.json(result);
        }
        
    })
})


app.post('/sendMoney',(req,res) => {
    const {sender , receiver , amount } = req.body;
    const date = new Date();

    db.query("INSERT INTO transactions (sender,receiver,date,amount) VALUES (?,?,?,?)",[sender,receiver,date,amount],(err,result)=>{
        
        res.redirect('/users.html');
        
    })
     
    db.query("UPDATE `users` SET balance = (balance - ?) WHERE `username` LIKE ?",[amount,sender],(err,result)=>{
        
    })

    db.query("UPDATE `users` SET balance = (balance + ?) WHERE `username` LIKE ?",[amount,receiver],(err,result)=>{
        
    })
    
    // res.json(req.body)
});

app.listen(port, () => console.log(`server started at port ${port}`));