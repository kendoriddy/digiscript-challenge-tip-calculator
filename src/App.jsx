import React, { useState, useEffect } from 'react'
import './App.css'
import dollarIcon from './assets/icon-dollar.svg';
import personIcon from './assets/icon-person.svg';
import TipButton from './components/TipButton';

function App() {
  const [bill, setBill] = useState('');
  const [people, setPeople] = useState('');
  const [customTip, setCustomTip] = useState(0);
  const [tip, setTip] = useState(0);
  const [isSelected, setSelected] = useState(null);

  const numberFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  const [tipAmount, setTipAmount] = useState(numberFormat.format(0));
  const [totalAmount, setTotalAmount] = useState(numberFormat.format(0));


  function updateView(tip) {
    let amountPerPerson = bill / people;
    let calcTip = (tip / 100);
    let tipPerPerson = amountPerPerson * calcTip;

    let formattedAmount = numberFormat.format(amountPerPerson);
    let formattedTip = numberFormat.format(tipPerPerson);

    setTotalAmount(formattedAmount);
    setTipAmount(formattedTip);
  }

  const selectTip = (e) => {
    setTip(+e.target.dataset.tipAmount);
    setSelected(+e.target.dataset.tipAmount);
  }

  const updateCustomTip = (event) => {
    setCustomTip(+event.target.value);
    setSelected('custom');
  }

  const reset = () => {
    setBill('');
    setPeople('');
    setCustomTip('0');
    setTip(0);
    setTotalAmount(numberFormat.format(0))
    setTipAmount(numberFormat.format(0))
  }
  
  // Effects
  useEffect(() => {
    if(bill && people && tip){
      updateView(tip);
    }
  }, [tip, bill, people])

  useEffect(() => {
    if(customTip && bill && people){
      updateView(customTip);
    }
  }, [customTip])

  const hasErrorMessage = setPeople===0
  return (
    <div className="">
      <h1 className="text-3xl text-center my-8 uppercase text-palette-darkGreyCyan">
        Spli <br /> tter
      </h1>

      <div className="calc-wrapper bg-white rounded-lg p-6 md:w-3/6 md:flex justify-between items-stretch max-w-screen-lg lg:mx-auto">

        <div className="left-col flex-1 mr-4">
          <label htmlFor="bill" className="block text-palette-darkGreyCyan mb-1">Bill</label>
          <div className="Bill relative">
            <img src={dollarIcon} alt="dollar" className="absolute top-2 left-2" />
            <input
              className="bg-gray-100 py-1 pr-4 pl-10 rounded-sm text-right w-full"
              type="number"
              name="bill"
              id="bill"
              value={bill}
              onChange={(e) => setBill(+e.target.value)} />
          </div>


          <div className="Tip">
            <h3 className="text-palette-darkGreyCyan mt-6 mb-1">Select Tip %</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center my-4">
              <TipButton tipAmount={5} selectTip={selectTip} isSelected={isSelected} />
              <TipButton tipAmount={10} selectTip={selectTip} isSelected={isSelected} />
              <TipButton tipAmount={15} selectTip={selectTip} isSelected={isSelected} />
              <TipButton tipAmount={25} selectTip={selectTip} isSelected={isSelected} />
              <TipButton tipAmount={50} selectTip={selectTip} isSelected={isSelected} />
              <input
                type="number" 
                id="custom_tip"
                className={`tip-btn text-right pr-2 ${isSelected === 'custom' && 'bg-palette-darkCyan'}`} 
                onChange={updateCustomTip}
                value={customTip}
                placeholder="Custom" />
            </div>
          </div>

          <label htmlFor="bill" className="block text-palette-darkGreyCyan mb-1 mt-6">Number of People</label>
          {hasErrorMessage ? <h4 className="zero">Can't be zero</h4> : ''}
          <div className="Num-Of-People relative">
            <img src={personIcon} alt="person cutout" className="absolute top-2 left-2" />
            <input
              className="bg-gray-100 py-1 pr-4 pl-10 rounded-sm text-right w-full"
              type="number"
              name="people"
              id="people"
              hasErrorMessage={hasErrorMessage}
              value={people}
              onChange={(e) => setPeople(+e.target.value)} />
          </div>
        </div>

        <div className="right-col bg-palette-darkCyan rounded-md flex-1 p-4 mt-8 md:ml-4 md:mt-0">

          <div className="Tip_Amount flex justify-between max-w-sm mx-auto">
            <div className=" mb-8 md:mb-16">
              <h3 className="text-gray-100 text-xl">Tip Amount</h3>
              <p className="text-gray-200 text-sm">/ person</p>
            </div>
            <h2 className="text-palette-prime text-3xl">{tipAmount}</h2>
          </div>

          <div className="flex justify-between max-w-sm mx-auto">
            <div className=" mb-8 md:mb-16">
              <h3 className="text-gray-100 text-xl">Total</h3>
              <p className="text-gray-200 text-sm">/ person</p>
            </div>
            <h2 className="text-palette-prime text-3xl">{totalAmount}</h2>
          </div>
          <button onClick={reset} className="uppercase text-palette-darkCyan bg-palette-prime w-11/12 mx-auto block rounded-md py-3 font-bold">Reset</button>
        </div>
      </div>
    </div>
  )
}

export default App
