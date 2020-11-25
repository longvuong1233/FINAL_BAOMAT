//require
const express = require("express")
const logger = require("morgan")
const cors = require("cors")
const bodyParser = require("body-parser")
const database = require("./database/config")
const userRoutes = require("./routes/user")


//initial
const app = new express()

//database

database()


//middleware
app.use(cors())

app.use(logger("dev"))

app.use(bodyParser.json())


//routes
app.get("/", (req, res) => {
    console.log("ddsdadsa")
    res.status(200).json({
        result: "ok"
    })
})
app.use("/user", userRoutes)

//handle error

app.use((err, req, res, next) => {

    let status = err.status || 500
    res.status(status).json({
        message: err.message
    })
})

//start server

app.listen(3000, () => {
    console.log("server are running at port 3000")
})