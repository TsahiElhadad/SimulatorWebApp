const express = require('express')
const fileUpload = require('express-fileupload')
const model = require('../model/handlePostReq')

const app = express()
app.use(express.urlencoded({
    extended: false
}))

app.use(fileUpload())
app.use(express.static('../view'))

app.get("/",(req,res)=>{
    res.sendFile("index.html")
})

app.post("/detect", async (req,res)=>{
    if(req.files){ // check if we get files
        var learnFile = req.files.learn_file
        var detectFile = req.files.detect_file
        var algoType = req.body.algo_type
        var result = await model.learnAndDetect(learnFile.data.toString(),detectFile.data.toString(), algoType)
        res.write(JSON.stringify(result))
    }
    res.end()
})
console.log("server is run");
app.listen(8080)


