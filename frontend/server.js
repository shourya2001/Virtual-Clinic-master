const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/',(req,res) => {
    const filepath = path.resolve(__dirname,"./build","index.html");
    fs.readFile(filepath,"utf8",(err,data) => {
        if(err){
            return console.log(err);
        }
        data = data
            .replace(/__TITLE__/g,"Home Page")
            .replace(/__DESCRIPTION__/g,"Home page description")

        res.send(data);
    })
})

app.use(express.static(path.resolve(__dirname, "./build")))

app.listen(PORT, function(){
    console.log("listening on port " + PORT)
})