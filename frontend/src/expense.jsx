import React, { useEffect, useState } from "react";
import ExpenseItem from "./components/expenseItem";
import ExpenseForm from "./components/expenseForm";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import './expense.css';
export default function Expense() {
  const [expenses, setExpenses] = useState([]);

  const [income, setIncome] = useState(0);
  const [outgoing, setOutgoing] = useState(0);
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const getExpenses = () => {
    fetch("http://localhost:7000/expense/all/66261b2d203cc6b2f4390dad",{
      headers: {
        'Authorization': `Bearer ${cookies.token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getExpenses();
   if(!cookies.token) {
    navigate("/login")
    return
   }
  }, []);

  useEffect(() => {
    let income = 0;
    let outgoing = 0;
    expenses.forEach((expense) => {
      if (expense.amount > 0) {
        income += parseFloat(expense.amount);
      } else {
        outgoing += parseFloat(expense.amount);
      }
    });

    setIncome(income);
    setOutgoing(outgoing);
  }, [expenses]);

  const deleteExpense = (id) => {
    // console.log(expenses.filter((expense) => expense.id != id));
    // setExpenses(expenses.filter((expense) => expense.id != id));

    // http://localhost:7000/expense/delete/:expenseID
    fetch(`http://localhost:7000/expense/delete/${id}`, {
      method: "DELETE",
    })
      .then(() => getExpenses())
      .catch((err) => console.log(err));
  };

  const addExpense = (title, amount) => {
    // append new expense into expenses state using setExpenses
    // array spread operator
    // setExpenses([...expenses, { id: Math.random(), title, amount }]);
    fetch("http://localhost:7000/expense/new/66261b2d203cc6b2f4390dad", {
      method: "POST", // DELETE
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        category: title,
        userId: "66261b2d203cc6b2f4390dad",
        date: new Date(),
      }),
    })
      .then(() => {
        getExpenses();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div class="main">
        <div class="head"><h1>₹xpense Tracker </h1></div>
        <div className="balance">Balance 💸: {income + outgoing}</div>
        <div className="income-expense-container">
          <div className="income">
            <span className="title">Income</span>
            <span>{income}</span>
          </div>
          <div className="block"></div>
          <div className="expense">
            <span className="title">Expense</span>
            <span>{outgoing}</span>
          </div>
        </div>
        {/* form */}
      </div>
      {/* list expenses */}
      {/* <ExpenseItem title={"test"} amount={10}/> */}
      <ExpenseForm addExpense={addExpense} />
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense._id}
          title={expense.category}
          amount={expense.amount}
          id={expense._id}
          deleteExpense={deleteExpense}
        />
      ))}
    </>
  );
}