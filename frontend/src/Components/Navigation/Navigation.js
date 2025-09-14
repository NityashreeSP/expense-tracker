import React from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png' // placeholder logo
import { menuItems } from '../../utils/menuItems'

function Navigation({ active, setActive }) {
    return (

        <NavStyled>
            {/* College/Institution Info */}

            <div className="institution-con">
                
                <div className="text">
                    <h2>UVCE</h2>
                    <p>Expense Tracker</p>
                </div>
            </div>

            {/* Menu Items */}
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return (
                        <li
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            className={active === item.id ? 'active' : ''}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </li>
                    )
                })}
            </ul>


            
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 280px;
    height: 100%;
    background: #1e3a8a; /* Deep Blue */
    color: #ffffff;
    border-radius: 0 20px 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;

    /* Institution Section */
    .institution-con {
        display: flex;
        align-items: center;
        gap: 1rem;
        img {
            width: 65px;
            height: 65px;
            border-radius: 10px;
            object-fit: cover;
            background: #f0f4ff;
            border: 2px solid #ffffff;
            padding: 0.2rem;
        }
        h2 {
            color: #ffffff;
            font-size: 1.2rem;
        }
        p {
            color: #bfdbfe;
            font-size: 0.9rem;
        }
    }

    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;
        li {
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: 0.6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            color: #cbd5e1;
            padding: 0.8rem 1rem;
            border-radius: 8px;
            i {
                color: #cbd5e1;
                font-size: 1.3rem;
                transition: all 0.3s ease-in-out;
            }
            &:hover {
                background: #374151;
                color: #ffffff;
                i {
                    color: #ffffff;
                }
            }
        }
    }

    .active {
        background: #2563eb; /* Bright blue highlight */
        color: #ffffff !important;
        font-weight: 600;
        i {
            color: #ffffff !important;
        }
    }

    .bottom-nav {
        li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #f87171;
            font-weight: 600;
            cursor: pointer;
            transition: color 0.3s ease;
            &:hover {
                color: #ef4444;
            }
        }
    }
`;

export default Navigation
