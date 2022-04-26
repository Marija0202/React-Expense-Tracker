import express from 'express';
import { urlencoded } from 'express'; 
import transactions from "./routes/transactions.js";
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());

app.use( express.urlencoded({extended:false}) );
app.use( express.json() );
app.use(transactions);

 app.get("/", (req, res) => {
     res.send('<h1> Welcome </h1>')
 })

 .post("/transactions", (req,res) =>{
     res.redirect("localhost:3000");
 } )

app.listen(PORT, ()=> {
    console.log("Server laüft in  Port =>", PORT);
});