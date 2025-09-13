import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext()
    const [showForm, setShowForm] = useState(false)
    const [showHistory, setShowHistory] = useState(false)

    useEffect(() => {
        getIncomes()
    }, [])

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>💰 Incomes</h1>
                <h2 className="total-income">
                    Total Income: <span>${totalIncome()}</span>
                </h2>

                {/* Buttons */}
                <div className="button-group">
                    <button onClick={() => { setShowForm(!showForm); setShowHistory(false); }}>
                        {showForm ? "Close Form" : "➕ Add Income"}
                    </button>
                    <button onClick={() => { setShowHistory(!showHistory); setShowForm(false); }}>
                        {showHistory ? "Close History" : "📜 Show History"}
                    </button>
                </div>

                {/* Conditional Rendering */}
                {showForm && (
                    <div className="section">
                        <h3>➕ Add New Income</h3>
                        <Form />
                    </div>
                )}

                {showHistory && (
                    <div className="section">
                        <h3>📜 Income History</h3>
                        <div className="incomes">
                            {incomes.map((income) => {
                                const { _id, title, amount, date, category, description, type } = income;
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
                                        indicatorColor="var(--color-green)"
                                        deleteItem={deleteIncome}
                                    />
                                )
                            })}
                        </div>
                    </div>
                )}
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
    display: flex;
    flex-direction: column;

    h1 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #1e3a8a;
    }

    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f0f4ff;
        border: 2px solid #dbeafe;
        border-radius: 15px;
        padding: 1rem;
        margin: 1rem 0 2rem 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: #1e3a8a;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);

        span {
            font-size: 2rem;
            font-weight: 800;
            color: #16a34a;
        }
    }

    .button-group {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;

        button {
            background: #1e3a8a;
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
        border: 1px solid #dbeafe;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);

        h3 {
            margin-bottom: 1rem;
            color: #1e3a8a;
        }

        .incomes {
            max-height: 70vh;
            overflow-y: auto;
        }
    }
`;

export default Income
