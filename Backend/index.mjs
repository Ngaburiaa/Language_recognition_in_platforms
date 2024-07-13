import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import route from "./routes/eventRoutes.mjs"
const app =express()
const corsoptions = {
    origin: "http://localhost:5173", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  };
  app.use(cors(corsoptions));
  app.options("*", cors(corsoptions));


app.use(bodyParser.json())
app.use(express.json())
app.use(route)
app.use(cors())


app.listen( process.env.port ||3000,()=>{
    console.log("Server running on port 3000")
})


