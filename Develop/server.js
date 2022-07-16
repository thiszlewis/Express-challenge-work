const express = require('express');
const fs = require('fs');
const path = require('path')
const notes = require('./db/db.json')
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5557;


const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))

app.get("/notes", (req, res)=>{
    // res.send("Hello world from notes")
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.get("/api/notes", (req, res)=>{
    res.send(notes)
})

app.post("/api/notes", (req, res)=>{

    try {
        notes.push(req.body)
        res.status(200).send(notes)
        
    } catch (error) {
        res.send("error saving note")
    }
})

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
})



app.listen(PORT, ()=>{
    console.log("server running on 3000")
})