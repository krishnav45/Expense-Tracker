import React, { useContext, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
//styles
import "./PieChart.css";
//components
import PieLabel from '../PieLabel/PieLabel';
//contexts
import { TransactionsContext } from '../../Contexts/AllContexts';

const COLORS = ['#FF9304', '#A000FF', '#FDE006'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartComp = () => {
    //context
    const [transactionData] = useContext(TransactionsContext);

    //state
    const [chartData, setChartData] = useState([
        { name: 'Entertainment', value: 0 },
        { name: 'Food', value: 0 },
        { name: 'Travel', value: 0 },
    ]);

    //effect to calculate chart data whenever transactions change
    useEffect(() => {
        if (transactionData.length === 0) {
            setChartData([
                { name: 'Entertainment', value: 0 },
                { name: 'Food', value: 0 },
                { name: 'Travel', value: 0 },
            ]);
            return;
        }

        const entertainmentTotal = transactionData
            .filter(item => item.category === 'entertainment')
            .reduce((sum, item) => sum + Number(item.price), 0);

        const foodTotal = transactionData
            .filter(item => item.category === 'food')
            .reduce((sum, item) => sum + Number(item.price), 0);

        const travelTotal = transactionData
            .filter(item => item.category === 'travel')
            .reduce((sum, item) => sum + Number(item.price), 0);

        setChartData([
            { name: 'Entertainment', value: entertainmentTotal },
            { name: 'Food', value: foodTotal },
            { name: 'Travel', value: travelTotal },
        ]);
    }, [transactionData]);

    // Handle empty data
    if (chartData.every(data => data.value === 0)) {
        return <div>No expenses to display. Add some transactions!</div>;
    }

    return (
        <div className='pieChart'>
            <div className='pie'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={99}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className='pieLabelsDiv'>
                <PieLabel name="Food" color="#A000FF" />
                <PieLabel name="Entertainment" color="#FF9304" />
                <PieLabel name="Travel" color="#FDE006" />
            </div>
        </div>
    );
};

export default PieChartComp;
