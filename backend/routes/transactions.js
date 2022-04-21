import express from 'express';
import db from "../init_lowdb.js";
const router = express.Router();

router 
.get("/transactions", (request, response)=> {
    const transactions = db.data.transactions;
    response.send(transactions);
  })

.post("/transactions/new", async (request, response) => {

    const {transactionName, amount, typeOfTransaction} = request.body;
    const id = db.chain.get('transactions').takeRight(1).value()[0].id + 1
    
    if(!transactionName || !amount || !typeOfTransaction) {
      response.send({success: false, error: "please ad Transaction Name, Amount and Type of Transaction"})
    } else {
      db.chain.get('transactions').push({id, transactionName, amount, typeOfTransaction}).value();
      await db.write();
      response.send({success: true, addedData: {id, transactionName, amount, typeOfTransaction}})
    }
  })
  
.put("/transactions/:id", async(req, res) =>{
    const {id, transactionName, amount, typeOfTransaction} = req.params;
    const changedId = Number(req.params.id);
  
    const changedTransactions = db.chain.get("transactions").find({id:changedId}).value();
    db.chain.get("transactions").find({id:changedId}).assign({id:changedId, transactionName: req.body.transactionName}).value();
    db.chain.get("transactions").find({id:changedId}).assign({id:changedId, amount: req.body.amount}).value();
    db.chain.get("transactions").find({id:changedId}).assign({id:changedId, typeOfTransaction: req.body.typeOfTransaction}).value();
    try{
      await db.write();
    }catch{
      res.send({succes: false, error: "couldn't change data"})
      return;
    }
    res.send({succes:true, changedTransactions})
}).delete("/transactions/:id", async(req, res) =>{
    const idId = req.params.id;
    const convertID = Number(idId);
   
    const deletedTransactions = db.chain.get('transactions').find(transaction => transaction.id ===convertID ).value();
  
    db.chain.get('transactions').remove({id:convertID}).value();
    try{
        res.send({succes: true, deletedTransactions});
        db.write();
        return
        }catch(err){
        res.send({succes:false, error: "couldn't delete please again"});
    }
});

 export default router;