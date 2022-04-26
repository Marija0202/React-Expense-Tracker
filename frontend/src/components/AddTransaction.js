import React, { useContext, useEffect } from "react";
import axios from "axios";

import { TransactionsContext } from "../context/GlobalContext";
import Transaction from "./Transaction";

const AddTransaction = () => {
  const currentTransaction = {};
  const [transactions, setTransactions] = useContext(TransactionsContext);

  useEffect(() => {
    const getAndSetState = async() =>{      
      const response =await axios.get('http://localhost:4000/transactions')
      setTransactions(response.data);   
    }
    getAndSetState();
  },[]);

  //submitHandler
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   const inputTitle = document.querySelector("#text-transaction");    
  //   const inputAmount = document.querySelector("#amount-transaction");
  //   if(isNaN(inputAmount.value)) {
  //     return alert("Please enter a number");
  //   }
  //   const newTransaction = [...transactions];
  //   currentTransaction.id = transactions.length;
  //   newTransaction.unshift(currentTransaction);
  //   setTransactions(newTransaction);

  //   inputTitle.value = "";
  //   inputAmount.value = "";
  //   inputTitle.focus();
  // };

  // HandleInputItem
  const handleInputText = (e) => {
    currentTransaction.transactionName = e.target.value;
  };
  //handleInputNumber
  const handleInputNumber = (e) => {
    currentTransaction.amount = Number(e.target.value);
  };

  return (
    <>
      {transactions.map((trans, id) => {
     
        return (
          <div key={id}>
            <Transaction
              transactionName={trans.transactionName}
              amount={trans.amount}
              id={trans.id}
            />
          </div>
        );
      })}
     
      <form action='http://localhost:4000/transactions' method='post'>
        <h2 className="form__title">Add Transaction</h2>
        <label htmlFor="text-transaction"> Transaction</label>
        <input
          required
          value={transactions.transactionName}
          type="text"
          onChange={handleInputText}
          name="transactionName"
          id="text-transaction"
          placeholder="Enter text"
        />
        <label htmlFor="">Amount <span className="amount__info">(By expenses use negative(-))</span></label>
        <input
          required
          value={transactions.amount}
          onChange={handleInputNumber}
          type= "number"  step="0.01"
          name = "amount"
          id="amount-transaction"
          placeholder="Enter amount"
        />
        <button type="submit" className="btn__add">Add</button>
      </form>
    </>
  );
};
export default AddTransaction;
