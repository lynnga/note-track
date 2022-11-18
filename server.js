const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/api/notes', (req,res) => {
    fs.readFile("db/db.json", "utf8", (err, myData) => {
        if (err) {
          console.log("File read failed:", err);
          res.send("error");
        }
        console.log("File data:", myData);
        res.send(myData);
      });
})

app.post('/api/notes',(req,res) => {
  fs.readFile("db/db.json", "utf8", (err, myData) => {
    if (err) {
      console.log("File read failed:", err);
      res.send("error");
    }
    
    
    req.body.id = uuidv4();
    const array = JSON.parse(myData)
    array.push(req.body)
  
    fs.writeFile('db/db.json',JSON.stringify(array), function (err) {
        if (err) throw err;
       res.send("note added")
      });
    })
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});