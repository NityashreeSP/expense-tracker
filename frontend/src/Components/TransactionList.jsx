import React, { useState, useEffect } from "react";
import { getTransactions } from "../api";
import VerifyButton from "./VerifyButton";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch transactions from backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  // Filter transactions based on search input
  const filteredTransactions = transactions.filter(
    (t) =>
      t.from.toLowerCase().includes(search.toLowerCase()) ||
      t.to.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by department or vendor"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
      />

      <ul>
        {filteredTransactions.map((t) => (
          <li key={t._id} style={{ marginBottom: "8px" }}>
            <strong>{t.from}</strong> → <strong>{t.to}</strong>: ₹{t.amount}{" "}
            <VerifyButton transaction={t} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;