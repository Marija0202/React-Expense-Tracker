import React, {useContext} from "react";
import { TransactionsContext } from "../context/GlobalContext";
import axios from "axios";

const Transaction = ({ id, transactionName, amount }) => {
  const [transactions, setTransactions] = useContext(TransactionsContext);

  const handlerDelete = () => {
    const getAndSetState = async() =>{
      
      await axios.delete(`http://localhost:4000/transactions/${id}`)      
      setTransactions(transactions);
     
      const newDelete = transactions.filter((item) => item.id !== id);      
      setTransactions(newDelete);
    }
    getAndSetState();
  }

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
