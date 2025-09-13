import React, { useEffect, useState } from "react";
import { getBudgets, getDepartments, getTransactions } from "../api";
import TransactionList from "../Components/TransactionList";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const Dashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetRes, deptRes, transRes] = await Promise.all([
          getBudgets(),
          getDepartments(),
          getTransactions(),
        ]);

        setBudgets(budgetRes.data);
        setDepartments(deptRes.data);
        setTransactions(transRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Prepare PieChart data for departments
  const deptChartData = departments.map((d) => ({
    name: d.name,
    value: d.allocated,
  }));

  return (
    <div style={{ padding: "20px" }}>
      <h1>FundFlow Dashboard</h1>

      {/* Budget Overview */}
      {budgets.length > 0 && (
        <div>
          <h2>Total Budget: ₹{budgets[0].total}</h2>
          <h3>Year: {budgets[0].year}</h3>
        </div>
      )}

      {/* Department Allocation Pie Chart */}
      <h2>Department Budget Allocation</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={deptChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(entry) => `${entry.name}: ₹${entry.value}`} // ✅ fixed template literal
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {deptChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> // ✅ fixed key template literal
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      {/* Transactions */}
      <h2>Transactions</h2>
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default Dashboard;
