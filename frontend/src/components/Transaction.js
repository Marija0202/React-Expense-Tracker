import React, { useState, useContext, useEffect } from "react";
import { TransactionsContext } from "../context/GlobalContext";
import axios from "axios";

const Transaction = ({ id, transactionName, amount }) => {
  const [transactions, setTransactions] = useContext(TransactionsContext);
 const[buttonClicked, setButtonClicked] = useState(false)
  useEffect(() => {

    const getAndSetState = async() =>{
      
      const response =await axios.get('http://localhost:4000/transactions')
       
      setTransactions(response.data);
     
     
    }
    getAndSetState();

  }, [buttonClicked])

  const handlerDelete = () => {
    setButtonClicked(true);
    const newDelete = transactions.filter((item) => item.id !== id);
    //const newDelete = [...transactions];
    //newDelete.splice(id, 1);
    setTransactions(newDelete);
  };

  return (
    <li className="transaction">
      <button onClick={handlerDelete} className="btn__list">
        X
      </button>
      <h4 className="transaction__title">{transactionName} </h4>
      <p className="transaction__price">
        <span>{amount}</span> Euro
      </p>
    </li>
  );
};
export default Transaction;
