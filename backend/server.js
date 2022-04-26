import express from 'express';
import { appendFile } from "fs";
import { urlencoded } from 'express';
import transactions from "./routes/transactions.js";
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(transactions);

app.get("/", (req, res) => {
    res.send('<h1> Welcome </h1>')
})

app.post("/transactions", (req, res) => {
        res.redirect("localhost:3000");
    })
app.get("/forbidden", (req, res, next) => {
    const myError = new Error("error....");
    myError.type = "not-found";
    next(myError);

});

app.get("/faulty", (req, res, next) => {
    const myError = new Error("error");
    myError.type = "internat";
    next(myError);

});

app.get("/internalerror", (req, res, next) => {
    res.status(500).send("Server error!")
})

app.get("/notfound", (req, res) => {
    res.status(404).send(`<h1>"Site not Found!"</h1>`);
})

app.use((err, req, res, next) => {
    const logging = `\n${(new Date().toISOString())}: ${err.type}\n`
    appendFile("./log.txt", logging, () => {
        console.log("fine.................")
    });
    next(err);
});

app.use((err, req, res, next) => {
    if (err.type === "not-found") {
        res.redirect("/notfound");
    } else {
        res.redirect("/internalerror");
    }
    next(err)
});

app.listen(PORT, () => {
    console.log("Server laüft in  Port =>", PORT);
});
