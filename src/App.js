import { useEffect, useState } from 'react';
// styles
import './App.css';
// components
import Navbar from './components/Navbar/Navbar';
import AppHead from './components/AppHead/AppHead';
import AppBody from './components/AppBody/AppBody';
// contexts
import { TransactionsContext, MoneyContext } from "./Contexts/AllContexts";

function App() {
  const [money, setMoney] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("allData");
      return savedData ? JSON.parse(savedData).money : { balance: 5000, expenses: 0 };
    }
    return { balance: 5000, expenses: 0 };
  });

  const [transactionData, setTransactionData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("allData");
      return savedData ? JSON.parse(savedData).transactionData : [];
    }
    return [];
  });

  // Save data to localStorage when state changes
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "allData",
          JSON.stringify({ money, transactionData })
        );
      }
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [money, transactionData]);

  return (
    <main className="App">
      <MoneyContext.Provider value={[money, setMoney]}>
        <TransactionsContext.Provider value={[transactionData, setTransactionData]}>
          <Navbar />
          <AppHead balance={money.balance} expenses={money.expenses} />
          <AppBody transactionData={transactionData} />
        </TransactionsContext.Provider>
      </MoneyContext.Provider>
    </main>
  );
}

export default App;
