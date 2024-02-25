import './App.css';
import InvestmentChart from './components/investment-chart';
import { useState } from 'react';

function App() {
  const [annualPercentageRate, setAnnualPercentageRate] = useState(6);
  const [depositsWithinOneYear, setDepositsWithinOneYear] = useState(4);
  const [onetimeDeposit, setOnetimeDeposit] = useState(1400);
  const [depositFee, setDepositFee] = useState(14);
  const [investmentDurationInYear, setInvestmentDurationInYear] = useState(10);
  const [initialDeposit, setInitialDeposit] = useState(0);

  const percentageRate = (annualPercentageRate + 100) / 100;
  const totalNumberOfDeposits = (depositsWithinOneYear || 1) * investmentDurationInYear;
  const oneDepositRate = Math.pow(percentageRate, 1 / (depositsWithinOneYear || 1));

  let sum = initialDeposit;
  for (let i = 1; i <= totalNumberOfDeposits; i++) {
      sum += onetimeDeposit;
      sum = sum * oneDepositRate;
  }

  const allPaymentFee = depositFee * depositsWithinOneYear * investmentDurationInYear || depositFee;
  const allInputs = onetimeDeposit * depositsWithinOneYear * investmentDurationInYear + allPaymentFee + initialDeposit;
  const allInputsString = `${allInputs} (${allPaymentFee} is fee)`;

  const profit = sum - allInputs;
  const profitAfterTaxPayment = profit * 0.81;

  return (
    <>
      <h1>Investment calculator</h1>
      <InvestmentChart />
    </>
  )
}

// Co trzeba wprowadzić?
// 1. Roczna stopa oprocentowania
// 2. Ile wynosi jednorazowa wpłata?
// 3. Jak często wpłacamy? Co rok, Co pół roku, Co 3 miesiące, Co miesiąc
// 4. Prowizja

function getInputAndOutput() {
  const annualPercentageRate = 4;
  const percentageRate = (annualPercentageRate + 100) / 100;
  const onetimePayment = 1400;
  const depositsWithinOneYear = 12
  const paymentFee = 0;
  const investmentDurationInYear = 10;
  const startingSum = 0;

  const totalNumberOfDeposits = (depositsWithinOneYear || 1) * investmentDurationInYear;
  const onePaymentRate = Math.pow(percentageRate, 1 / (depositsWithinOneYear || 1));

  let sum = startingSum;
  for (let i = 1; i <= totalNumberOfDeposits; i++) {
      sum += onetimePayment;
      sum = sum * onePaymentRate;
  }

  const allPaymentFee = paymentFee * depositsWithinOneYear * investmentDurationInYear || paymentFee;
  const allInputs = onetimePayment * depositsWithinOneYear * investmentDurationInYear + allPaymentFee + startingSum;
  const allInputsString = `${allInputs} (${allPaymentFee} is fee)`;

  const profit = sum - allInputs;
  return {
      input: allInputsString,
      output: sum,
      profit: profit,
      profitAfterTaxPayment: profit * 0.81
  }
}

console.log(getInputAndOutput());

export default App
