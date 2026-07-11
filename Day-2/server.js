const express = require('express')
const app = express() //For Instance create 

console.log('Good Morning Guys.');

app.get('/home',(req,res)=>{
res.send('This is Home Page.')
})

app.get('/',(req,res)=>{
    res.send("This is Main page.")
})

app.get('/about',(req,res)=>{
    res.send('It is about page.')
})


app.get('/contact',(req,res)=>{
res.send('This is Contact Page.')
})

app.listen(3000,()=>{ //For run a server
    console.log('Server is Started...');
})

//We gwnwrally use port like 3000,8080,8000,7000,5173