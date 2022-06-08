const express = require('express')
const cors = require("cors")

const routerApi = require('./routes')
const { logError, errorHandler, boomError } = require('./middlewares/error.handler')

const app = express()
const port = 3977

app.use(express.json())

const whileList = ["http://univalle.edu", `http://localhost:${port}`]

const options = {
    origin: (origin, callback) =>{
        if(whileList.includes(origin)){
            callback(null, true)
        } else {
            callback(new Error("Origen no permitido"))
        }
    }
}

app.use(cors())

app.get('/', (req, res) => {
    res.send("este es mi premer API - Hola mundo")
})

routerApi(app)

app.use(logError)
app.use(boomError)
app.use(errorHandler)

app.listen(port, () => {
    console.log("######################");
    console.log("###### API_REST #######");
    console.log("######################");
    // console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}`);
    console.log(`http://localhost:3977`);
});