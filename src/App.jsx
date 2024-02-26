import './App.css';
import InvestmentChart from './components/investment-chart';
import { useState } from 'react';
import InvestmentData from './models/investment-data';

function App() {
  const [annualPercentageRate, setAnnualPercentageRate] = useState(6.4);
  const [depositsWithinOneYear, setDepositsWithinOneYear] = useState(4);
  const [onetimeDeposit, setOnetimeDeposit] = useState(2000);
  const [depositFee, setDepositFee] = useState(14);
  const [investmentDurationInYears, setInvestmentDurationInYears] = useState(10);
  const [initialDeposit, setInitialDeposit] = useState(0);

  const percentageRate = (annualPercentageRate + 100) / 100;
  const totalNumberOfDeposits = (depositsWithinOneYear || 1) * investmentDurationInYears;
  const oneDepositRate = Math.pow(percentageRate, 1 / (depositsWithinOneYear || 1));

  let depositSum = initialDeposit;
  let feeSum = initialDeposit ? depositFee : 0;
  let profitSum = 0
  let realProfitSum = 0;
  let taxSum = 0;
  let investmentSum = initialDeposit;
  const chartData = [new InvestmentData("Now", 0, 0, 0, 0)];
  for (let i = 1; i <= totalNumberOfDeposits; i++) {
      if (depositsWithinOneYear) {
        depositSum += onetimeDeposit;
        feeSum += depositFee; 
        investmentSum += onetimeDeposit;
      }

      investmentSum = investmentSum * oneDepositRate;

      profitSum = investmentSum - depositSum;
      taxSum = (profitSum * 0.19).toFixed(2);
      realProfitSum = (profitSum - taxSum - feeSum).toFixed(2);
      if (i % depositsWithinOneYear === 0 || depositsWithinOneYear === 0) {
        const year = new Date().getFullYear() + i / (depositsWithinOneYear || 1);
        const investmentData = new InvestmentData(year, depositSum.toFixed(2), feeSum.toFixed(2), realProfitSum, taxSum);
        chartData.push(investmentData);     
      }
  }

  investmentSum = investmentSum.toFixed(2);
  console.log(depositSum);
  console.log(profitSum);
  console.log(feeSum);

  return (
    <>
      <h1>Investment calculator</h1>
      <h2>Entering</h2>
      <div className='inputs'>
        <div className="input">
          <label htmlFor="annual-percentage-rate">Annual percentage rate:</label>
          <input 
            defaultValue={annualPercentageRate}
            id="annual-percentage-rate" 
            min={0} 
            name="annual-percentage-rate" 
            onChange={(e) => setAnnualPercentageRate(parseFloat(e.target.value))} 
            step={.1} 
            type="number" 
          />
        </div>
        <div className="input">
          <label htmlFor="deposits-within-one-year">Deposits within one year:</label>
          <input 
            defaultValue={depositsWithinOneYear}
            id="deposits-within-one-year" 
            min={0} 
            name="deposits-within-one-year" 
            onChange={(e) => setDepositsWithinOneYear(parseInt(e.target.value))} 
            step={1}
            type="number" 
          />
        </div>
        <div className="input">
          <label htmlFor="one-time-deposit">One-time deposit:</label>
          <input 
            defaultValue={onetimeDeposit}
            id="one-time-deposit" 
            min={0} 
            name="one-time-deposit" 
            onChange={(e) => setOnetimeDeposit(parseFloat(e.target.value))} 
            step={50}
            type="number" 
          />
        </div>
        <div className="input">
          <label htmlFor="deposit-fee">Deposit fee:</label>
          <input 
            defaultValue={depositFee}
            id="deposit-fee" 
            min={0} 
            name="deposit-fee" 
            onChange={(e) => setDepositFee(parseFloat(e.target.value))} 
            step={0.1}
            type="number" 
          />
        </div>
        <div className="input">
          <label htmlFor="investment-duration-in-years">Investment duration in years:</label>
          <input 
            defaultValue={investmentDurationInYears}
            id="investment-duration-in-years" 
            min={1} 
            name="investment-duration-in-years" 
            onChange={(e) => setInvestmentDurationInYears(parseInt(e.target.value))} 
            step={1}
            type="number" 
          />
        </div>
        <div className="input">
          <label htmlFor="initial-deposit">Initial deposit:</label>
          <input 
            defaultValue={initialDeposit}
            id="initial-deposit" 
            min={0} 
            name="initial-deposit" 
            onChange={(e) => setInitialDeposit(parseFloat(e.target.value))} 
            step={50}
            type="number" 
          />
        </div>
      </div>
      <div>
        <h2>Result</h2>
        <h3>Ending balance: {investmentSum}</h3>
        <InvestmentChart data={chartData}/>
      </div>
    </>
  )
}

export default App
