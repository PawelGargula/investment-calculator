import './App.css'

function App() {
  return (
    <>
      <h1>Invenstment calculator</h1>
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
