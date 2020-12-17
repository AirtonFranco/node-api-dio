//fazendo teste no express
const express = require("express") //importando o express
const bodyParser = require('body-parser')
const userRoute = require("./routers/userRoute")//importando a Router

const app = express() //fazendo a chamada do express atravez de uma function
app.use(bodyParser.urlencoded({extended: false}))
const port = 8000 //definindo a porta da nossa aplicação

userRoute(app)

app.get("/", (req,res) =>
res.send("Ola Node")
)

app.listen(port, () => console.log("Api rodando na porta 8000"))