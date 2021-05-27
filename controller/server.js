const express = require('express')
const fileUpload = require('express-fileupload')
const model = require('../model/handlePostReq')

const app = express() // using express platform
app.use(express.urlencoded({
    extended: false
}))

app.use(fileUpload())
app.use(express.static('../view'))

// send home page - index.html by directing the Path "/" to client
app.get("/",(req,res)=>{
    res.sendFile("index.html")
})

// handle "/detect" request from client, learn and detect by two files that sent to server and return anomalies.
app.post("/detect", async (req,res)=>{
    try {
        if(req.files){ // check if we get files
            var learnFile = req.files.learn_file
            var detectFile = req.files.detect_file
            var algoType = req.body.algo_type // algorithm type we get from client
            // get anomalies list by learnAndDetect function
            var result = await model.learnAndDetect(learnFile.data.toString(),detectFile.data.toString(), algoType)
            res.write(JSON.stringify(result)) // write to client back as Json
        }
        res.end()
    }
    catch(error) { // handle Errors
        if(error.message === "no algoType")
            res.write("no algoType")
        else
            res.write("error in csv")
        res.end()
    }
})
console.log("server is run");
app.listen(8080) // Server Listen to port 8080


