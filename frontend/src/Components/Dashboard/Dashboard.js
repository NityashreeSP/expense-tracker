import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>📊 Dashboard</h1>


                {/* Summary Cards */}
                <div className="summary-cards">
                    <div className="card income">
                        <h3>💰 Income</h3>
                        <p>{dollar} {totalIncome()}</p>
                    </div>
                    <div className="card expense">
                        <h3>💸 Expense</h3>
                        <p>{dollar} {totalExpenses()}</p>
                    </div>
                    <div className="card balance">
                        <h3>🏦 Balance</h3>
                        <p>{dollar} {totalBalance()}</p>
                    </div>
                </div>

                {/* Chart */}
                <div className="section">
                    <h2>📈 Overview</h2>
                    <Chart />
                </div>

                {/* History */}
                <div className="section">
                    <h2>📜 Recent History</h2>
                    <History />
                </div>

                {/* Insights */}
                <div className="section">
                    <h2>💡 Insights</h2>
                    <div className="range">
                        <p><strong>Income Range:</strong></p>
                        <p>Min: ${Math.min(...incomes.map(item => item.amount)) || 0}</p>
                        <p>Max: ${Math.max(...incomes.map(item => item.amount)) || 0}</p>
                    </div>
                    <div className="range">
                        <p><strong>Expense Range:</strong></p>
                        <p>Min: ${Math.min(...expenses.map(item => item.amount)) || 0}</p>
                        <p>Max: ${Math.max(...expenses.map(item => item.amount)) || 0}</p>
                    </div>
                </div>

            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    h1 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 2rem;
        color: #1e3a8a; /* deep blue */
    }

    .summary-cards {
        display: flex;
        justify-content: space-around;
        gap: 1rem;
        margin-bottom: 2rem;

        .card {
            flex: 1;
            background: #f0f4ff;
            border: 2px solid #1e3a8a;
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
            transition: 0.2s;
            box-shadow: 0 2px 6px rgba(0,0,0,0.05);

            &:hover {
                background: #e0ebff;
            }

            h3 {
                font-size: 1rem;
                color: #1e3a8a;
                margin-bottom: 0.5rem;
            }

            p {
                font-size: 1.6rem;
                font-weight: bold;
                color: #111827;
            }
        }
    }

    .section {
        background: #fff;
        border: 1px solid #dbeafe;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);

        h2 {
            color: #1e3a8a;
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }

        .range {
            background: #f0f4ff;
            padding: 0.8rem 1rem;
            border-radius: 8px;
            margin-bottom: 0.8rem;
            font-size: 1rem;
            color: #111827;
        }
    }
`;

export default Dashboard
