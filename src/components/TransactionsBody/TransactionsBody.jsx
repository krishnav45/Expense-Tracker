import React, { useContext, useEffect, useState } from 'react'; 
// styles
import "./TransactionsBody.css"
// components
import TransactionBar from '../TransactionBar/TransactionBar';
import PageNavigateBar from './PageNavigateBar';
// contexts
import { TransactionsContext } from '../../Contexts/AllContexts';

const TransactionsBody = () => {
    // contexts
    const [transactionData] = useContext(TransactionsContext);
    // states
    const [pages, setPages] = useState({ currentPage: 1, totalPages: 1 });

    // every time transactionData updates
    useEffect(() => {
        onLoad();
    }, [transactionData]);

    // functions
    const displayTransactions = () => {
        if (transactionData && transactionData.length) {
            const startIndex = 3 * (pages.currentPage - 1);  
            const endIndex = 3 * pages.currentPage;  // 

            // Slice the data to show only the current page's transactions
            const currentTransactions = transactionData.slice(startIndex, endIndex);
            
            return currentTransactions.map(({ name, date, price, category, id }, index) => (
                <TransactionBar 
                    key={id}  // Using the transaction id as the key to ensure it's unique
                    name={name} 
                    date={date} 
                    amount={price} 
                    category={category} 
                    id={id} 
                />
            ));
        }
        return <div>No transactions available.</div>;
    };

    const onLoad = () => {
        if (transactionData.length) {
            setPages({ currentPage: 1, totalPages: Math.ceil(transactionData.length / 3) });  // Change 5 to 3 here
        }
    };

    const updatePage = (direction) => {
        setPages(prevPages => {
            let { currentPage, totalPages } = prevPages;

            if (direction === "right" && currentPage < totalPages) {
                return { ...prevPages, currentPage: currentPage + 1 };
            }
            if (direction === "left" && currentPage > 1) {
                return { ...prevPages, currentPage: currentPage - 1 };
            }
            return prevPages;  // Return previous state if no change
        });
    };

    return (
        <div className='TransactionBody'>
            <div className='transactionBodyUpper'>
                <div className='transactionPage'>{displayTransactions()}</div>
            </div>
            <div className='transactionBodyLower'>
                <PageNavigateBar 
                    key={"pageNavigate"} 
                    pages={pages} 
                    updatePage={updatePage} 
                />
            </div>
        </div>
    );
};

export default TransactionsBody;
