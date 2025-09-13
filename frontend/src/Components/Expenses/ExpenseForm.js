import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function ExpenseForm() {
    const { addExpense, error, setError } = useGlobalContext()

    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
        expenseType: '',   // department | project | vendor
        department: '',
        project: '',
        vendor: ''
    })

    const { title, amount, date, category, description, expenseType } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value })
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addExpense(inputState)
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
            expenseType: '',
            department: '',
            project: '',
            vendor: ''
        })
    }

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}

            {/* Title */}
            <div className="input-control">
                <input 
                    type="text" 
                    value={title}
                    name="title" 
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />
            </div>

            {/* Amount */}
            <div className="input-control">
                <input 
                    type="number" 
                    value={amount}  
                    name="amount" 
                    placeholder="Expense Amount"
                    onChange={handleInput('amount')} 
                />
            </div>

            {/* Date */}
            <div className="input-control">
                <DatePicker 
                    id="date"
                    placeholderText="Enter A Date"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({ ...inputState, date: date })
                    }}
                />
            </div>

            {/* Expense Type */}
            <div className="input-control">
                <label>Expense Type:</label>
                <select value={expenseType} onChange={handleInput("expenseType")}>
                    <option value="">-- Select --</option>
                    <option value="department">Department</option>
                    <option value="project">Project</option>
                    <option value="vendor">Vendor</option>
                </select>
            </div>

            {/* Conditionally Rendered Inputs */}
            {expenseType === "department" && (
                <div className="input-control">
                    <select 
                        value={inputState.department} 
                        onChange={handleInput("department")}
                    >
                        <option value="">Select Department</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
            )}

            {expenseType === "project" && (
                <div className="input-control">
                    <input
                        type="text"
                        value={inputState.project}
                        name="project"
                        placeholder="Project Name"
                        onChange={handleInput("project")}
                    />
                </div>
            )}

            {expenseType === "vendor" && (
                <div className="input-control">
                    <input
                        type="text"
                        value={inputState.vendor}
                        name="vendor"
                        placeholder="Vendor Name"
                        onChange={handleInput("vendor")}
                    />
                </div>
            )}

            {/* Category */}
            <div className="selects input-control">
                <select 
                    required 
                    value={category} 
                    name="category" 
                    id="category" 
                    onChange={handleInput('category')}
                >
                    <option value="" disabled >Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>  
                    <option value="travelling">Travelling</option>  
                    <option value="other">Other</option>  
                </select>
            </div>

            {/* Reference */}
            <div className="input-control">
                <textarea 
                    name="description" 
                    value={description} 
                    placeholder="Add A Reference" 
                    id="description" 
                    cols="30" 
                    rows="4" 
                    onChange={handleInput('description')}
                ></textarea>
            </div>

            {/* Submit */}
            <div className="submit-btn">
                <Button 
                    name={'Add Expense'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </ExpenseFormStyled>
    )
}


const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input, select, textarea{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;

export default ExpenseForm