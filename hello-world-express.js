const express = require ('express')
const app = express()
const port = 82


app.get('/', (req, res) =>{
res.send('Hello, World from express!')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})