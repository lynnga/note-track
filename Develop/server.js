const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require("fs");
app.use(express.json());

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

    fs.appendFile('db/db.json',JSON.stringify(req.body), function (err) {
        if (err) throw err;
       res.send("k")
      });

});






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});