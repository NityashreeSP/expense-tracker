import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { InnerLayout } from '../../styles/Layouts'
import ExpenseForm from './ExpenseForm'
import IncomeItem from '../IncomeItem/IncomeItem'

function Expenses() {
    const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext()
    const [showForm, setShowForm] = useState(false)
    const [showHistory, setShowHistory] = useState(false)

    useEffect(() => {
        getExpenses()
    }, [])

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>💸 Expenses</h1>
                <h2 className="total-expense">
                    Total Expense: <span>${totalExpenses()}</span>
                </h2>

                {/* Toggle Buttons */}
                <div className="button-group">
                    <button onClick={() => { setShowForm(!showForm); setShowHistory(false) }}>
                        {showForm ? "Close Form" : "➕ Add Expense"}
                    </button>
                    <button onClick={() => { setShowHistory(!showHistory); setShowForm(false) }}>
                        {showHistory ? "Close History" : "📜 Show History"}
                    </button>
                </div>

                {/* Add Expense Form */}
                {showForm && (
                    <div className="section">
                        <h3>➕ Add New Expense</h3>
                        <ExpenseForm />
                    </div>
                )}

                {/* Expense History */}
                {showHistory && (
                    <div className="section">
                        <h3>📜 Expense History</h3>
                        <div className="expenses">
                            {expenses.map((expense) => {
                                const { _id, title, amount, date, category, description, type } = expense
                                return (
                                    <IncomeItem
                                        key={_id}
                                        id={_id}
                                        title={title}
                                        description={description}
                                        amount={amount}
                                        date={date}
                                        type={type}
                                        category={category}
                                        indicatorColor="var(--color-red)" 
                                        deleteItem={deleteExpense}
                                    />
                                )
                            })}
                        </div>
                    </div>
                )}
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    flex-direction: column;

    h1 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #2563eb;
    }

    .total-expense {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff1f2;
        border: 2px solid #fecaca;
        border-radius: 15px;
        padding: 1rem;
        margin: 1rem 0 2rem 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: #2563eb;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);

        span {
            font-size: 2rem;
            font-weight: 800;
            color: #2563eb;
        }
    }

    .button-group {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;

        button {
            background: #2563eb;
            color: #fff;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s ease;

            &:hover {
                background: #2563eb;
            }
        }
    }

    .section {
        background: #ffffff;
        border: 1px solid #fecaca;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);

        h3 {
            margin-bottom: 1rem;
            color: #2563eb;
        }

        .expenses {
            max-height: 70vh;
            overflow-y: auto;
        }
    }
`

export default Expenses
