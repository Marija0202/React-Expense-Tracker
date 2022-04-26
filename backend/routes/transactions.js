import express from 'express';
import db from "../init_lowdb.js";
const router = express.Router();
import cors from "cors"
//import res from 'express/lib/response';

router.use(cors());
router
  //get
  .get("/transactions", (request, response) => {
    const transactions = db.data.transactions;
    response.send(transactions);
  })
  //post
  .post("/transactions", async (request, response) => {
    const { transactionName, amount, typeOfTransaction } = request.body;

    if (db.data.transactions.length > 0) {
      //const id = db.chain.get('transactions').takeRight(1).value()[0].id + 1;
      const id = db.data.transactions.length +1;
      db.chain.get('transactions').unshift({ id, transactionName, amount, typeOfTransaction }).value();
      response.redirect("http://localhost:3000");
      await db.write();
     // response.send({ success: true, addedData: { id, transactionName, amount, typeOfTransaction } })
    } else {
      const id = 1;
      db.chain.get('transactions').push({ id, transactionName, amount, typeOfTransaction }).value();
      
      //response.send({ success: true, addedData: { id, transactionName, amount, typeOfTransaction } })
      response.redirect("http://localhost:3000");
      await db.write();
    }

  })
   //put 
  .put("/transactions/:id", async (req, res) => {
    const changedId = Number(req.params.id);
    const changedTransactions = db.chain.get("transactions").find({ id: changedId }).value();
    db.chain.get("transactions").find({ id: changedId }).assign({ id: changedId, transactionName: req.body.transactionName }).value();
    db.chain.get("transactions").find({ id: changedId }).assign({ id: changedId, amount: req.body.amount }).value();
    db.chain.get("transactions").find({ id: changedId }).assign({ id: changedId, typeOfTransaction: req.body.typeOfTransaction }).value();
    try {
      await db.write();
    } catch {
      res.send({ success: false, error: "couldn't change data" })
      return;
    }
    res.send({ success: true, changedTransactions })
  })
  
  //delete
  .delete("/transactions/:id", async (req, res) => {
    const idId = req.params.id;
    const convertID = Number(idId);
    const deletedTransactions = db.chain.get('transactions').find(transaction => transaction.id === convertID).value();
    db.chain.get('transactions').remove({ id: convertID }).value();
    try {
      res.send({ success: true, deletedTransactions });
      db.write();
      return
    } catch (err) {
      res.send({ success: false, error: "couldn't delete please again" });
    }
  });

export default router;