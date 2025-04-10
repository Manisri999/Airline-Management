import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { FaWallet, FaCreditCard, FaDownload } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserWallet.css";

function UserWallet() {
  const [balance, setBalance] = useState(parseInt(localStorage.getItem("walletBalance")) || 10000);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [transactions, setTransactions] = useState(JSON.parse(localStorage.getItem("walletTransactions")) || []);
  const [message, setMessage] = useState("");

  const handleAddFunds = () => {
    const numAmount = parseInt(amount);
    if (!numAmount || numAmount <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }
    setBalance(prev => prev + numAmount);
    const newTransaction = { date: new Date().toLocaleString(), amount: numAmount, type: "Credit", method: paymentMethod };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem("walletBalance", balance + numAmount);
    localStorage.setItem("walletTransactions", JSON.stringify(updatedTransactions));
    setAmount("");
    setMessage(`₹${numAmount} added successfully via ${paymentMethod}!`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Namma Airlines Wallet Statement", 20, 20);
    doc.setFontSize(12);
    doc.text(`Balance: ₹${balance}`, 20, 30);
    doc.text("Transaction History:", 20, 40);
    transactions.forEach((t, i) => {
      doc.text(`${t.date} - ${t.type}: ₹${t.amount} (${t.method})`, 20, 50 + i * 10);
    });
    doc.save("wallet-statement.pdf");
  };

  return (
    <div className="user-wallet container mt-5">
      <h2 className="mb-4"><FaWallet /> My Wallet</h2>
      <div className="wallet-card card shadow-sm p-4">
        <h4>Balance: ₹{balance}</h4>
        <div className="payment-form mt-3">
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            className="form-control mb-3"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
          </select>
          <button className="btn btn-primary" onClick={handleAddFunds}>
            <FaCreditCard /> Add Funds
          </button>
        </div>
        {message && <div className="message mt-3">{message}</div>}
        {transactions.length > 0 && (
          <div className="transaction-history mt-4">
            <h5>Transaction History</h5>
            {transactions.map((t, i) => (
              <p key={i}>{t.date} - {t.type}: ₹{t.amount} via {t.method}</p>
            ))}
            <button className="btn btn-success mt-3" onClick={generatePDF}>
              <FaDownload /> Download Statement
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserWallet;
