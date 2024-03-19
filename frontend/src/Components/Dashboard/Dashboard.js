import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()
    const [currency, setCurrency] = useState('HUF'); // Az alapértelmezett pénznem forint

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);


    const currencyOptions = {
        HUF: { rate: 1, symbol: 'Ft' },
        USD: { rate: 350, symbol: '$' } // Tegyük fel, hogy 1 USD = 350 HUF
    };

    const convertCurrency = (amount, currency) => {
        return (amount / currencyOptions[currency].rate).toLocaleString('en-US');
    };

    return (
        <DashboardStyled>
            <InnerLayout>
            <div className="header-with-selector">
                <h1>Tranzakciók</h1>
                <div className="currency-selector">
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        <option value="HUF">Forint (HUF)</option>
                        <option value="USD">Dollár (USD)</option>
                    </select>
                </div>
                </div>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Bevétel</h2>
                                <p>
                                    {currencyOptions[currency].symbol} {convertCurrency(totalIncome(), currency)}
                                </p>

                            </div>
                            <div className="expense">
                                <h2>Kiadás</h2>
                                <p>
                                    {currencyOptions[currency].symbol} {convertCurrency(totalExpenses(), currency)}
                                    
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Egyenleg</h2>
                                <p style={{ color: totalBalance() < 0 ? 'red' : 'green' }}>
                                    {currencyOptions[currency].symbol} {convertCurrency(totalBalance(), currency)}
                                   
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Fizetes</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                Ft {Math.min(...incomes.map(item => item.amount)).toLocaleString('hu-HU')}
                            </p>
                            <p>
                                Ft {Math.max(...incomes.map(item => item.amount)).toLocaleString('hu-HU')}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Költség</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                Ft {Math.min(...expenses.map(item => item.amount)).toLocaleString('hu-HU')}
                            </p>
                            <p>
                                Ft {Math.max(...expenses.map(item => item.amount)).toLocaleString('hu-HU')}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`

.header-with-selector {
    display: flex; /* Flexbox használata az elrendezéshez */
    align-items: center; /* Elemek függőleges középre igazítása */
    gap: 20px; /* 20px térköz a cím és a választó között */

    h1 {
        margin: 0; /* Az alapértelmezett margó eltávolítása, ha szükséges */
    }
}

.currency-selector {
    select {
        padding: 0.5rem 1rem; 
        border-radius: 20px; 
        border: 2px solid white; 
        background-color: transparent; 
        color: #222260;
        font-weight: bold; /* Félkövér szöveg */
        cursor: pointer; /* A kurzor formájának változtatása választás jelzésére */
        outline: none; /* Az alapértelmezett körvonal eltávolítása fókuszáláskor */
        -webkit-appearance: none; /* Eltávolítja a böngésző specifikus stílusokat Safari/Chrome-ban */
        -moz-appearance: none; /* Eltávolítja a böngésző specifikus stílusokat Firefox-ban */
    }

    /* Opcionálisan hozzáadható egy lefelé mutató nyíl ikon a legördülő menühöz */
    select::-ms-expand {
        display: none; /* Eltávolítja az alapértelmezett lefelé mutató nyilat IE/Edge-ben */
    }

    
}

    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-white);
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard