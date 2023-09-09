const express = require("express")


const app = express()
const port = 3000

app.use(express.json())

app.post("/api/login", (req,res)=> {
    console.log(req.body)
    res.redirect("http://localhost:4200/#/modes")
})

app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
})