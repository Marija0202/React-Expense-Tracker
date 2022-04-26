import React, { useContext } from "react";
import Transaction from "./Transaction";
import { TransactionsContext } from "../context/GlobalContext";

const RenderTransactions = (arr) => {
  arr.map((liste, id) => {    
    return (
      <Transaction
        key={id}
        transactionName={liste.transactionName}
        amount={liste.amount}
        id={liste.id}
      />
    );
  });
};

const TransactionList = () => {
  const [transaction] = useContext(TransactionsContext);
  return (
    <ul className="transaction-list">{RenderTransactions(transaction)}</ul>
  );
};

export default TransactionList;
