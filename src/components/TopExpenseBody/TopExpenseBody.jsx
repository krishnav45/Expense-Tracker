import React, { useContext, useState, useEffect } from 'react';
//styles
import "../TransactionsBody/TransactionsBody.css";
//contexts
import { TransactionsContext } from '../../Contexts/AllContexts';
//library
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const TopExpenseBody = () => {
    //context
    const [transactionData] = useContext(TransactionsContext);

    //state
    const [chartData, setChartData] = useState([
        { name: 'food', value: 0 },
        { name: 'entertainment', value: 0 },
        { name: 'travel', value: 0 },
    ]);

    //effect to calculate chart data whenever transactions change
    useEffect(() => {
        if (transactionData.length === 0) {
            setChartData([
                { name: 'food', value: 0 },
                { name: 'entertainment', value: 0 },
                { name: 'travel', value: 0 },
            ]);
            return;
        }

        const foodTotal = transactionData
            .filter(item => item.category === 'food')
            .reduce((sum, item) => sum + Number(item.price), 0);

        const entertainmentTotal = transactionData
            .filter(item => item.category === 'entertainment')
            .reduce((sum, item) => sum + Number(item.price), 0);

        const travelTotal = transactionData
            .filter(item => item.category === 'travel')
            .reduce((sum, item) => sum + Number(item.price), 0);

        setChartData([
            { name: 'food', value: foodTotal },
            { name: 'entertainment', value: entertainmentTotal },
            { name: 'travel', value: travelTotal },
        ]);
    }, [transactionData]);

    //functions
    const showSortedData = () => {
        return [...chartData].sort((a, b) => b.value - a.value);
    };

    // Handle empty data
    if (chartData.every(data => data.value === 0)) {
        return <div>No expenses to display. Add some transactions!</div>;
    }

    return (
        <div className='TopExpensesBody' style={{ height: "30vh" }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={showSortedData()} layout="vertical" barSize={30}>
                    <XAxis type='number' hide />
                    <YAxis type="category" width={120} dataKey="name" axisLine={false} tickLine={false} />
                    <Bar dataKey="value" fill="#8784D2" radius={[0, 20, 20, 0]} />
                    
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TopExpenseBody;

