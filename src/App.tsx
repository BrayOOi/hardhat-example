import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import numberChanger from './artifacts/contracts/NumberChanger.sol/NumberChanger.json';
 
import './App.css';

declare var window: any;

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

let numberAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

let numberChangerInstance = new ethers.Contract(numberAddress, numberChanger.abi, signer);

function App() {
  const [number, setNumber] = useState(0);
  const [input, setInput] = useState('');

  const fetchContractInfo = async () => {
    const num = await numberChangerInstance.number();
    setNumber(num.toNumber());
  }

  useEffect(() => {
    fetchContractInfo();


  }, []);

  const onSubmit = async () => {
    const setNumberTx = await numberChangerInstance.setNumber(Number(input));
    await setNumberTx.wait();

    fetchContractInfo();
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Current number set: {number}</h1>
      <input type="number" value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={onSubmit}>Set new number</button>
    </div>
  );
}

export default App;
