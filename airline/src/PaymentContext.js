import React, { createContext, useContext, useState, useEffect } from "react";

const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  const [walletBalance, setWalletBalance] = useState(() => parseInt(localStorage.getItem("walletBalance")) || 10000);
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem("walletTransactions")) || []);

  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance);
    localStorage.setItem("walletTransactions", JSON.stringify(transactions));
  }, [walletBalance, transactions]);

  return (
    <PaymentContext.Provider value={{ walletBalance, setWalletBalance, transactions, setTransactions }}>
      {children}
    </PaymentContext.Provider>
  );
}

export const usePayment = () => useContext(PaymentContext);