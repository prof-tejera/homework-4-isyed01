import { useState, useEffect } from 'react';
import Screen from "../Screen/Screen";
import Button from "../Button/Button";
import "./Calculator.css"

const ZERO_VALUE = "0";
const EMPTY_VALUE = "";

const OPERATIONS = {
  NONE: { id:"NONE", symbol: "", calc:()=>{} },
  ADD: { id:"ADD", symbol: "+", calc:(a,b)=>a+b },
  SUBTRACT: { id:"SUBTRACT", symbol: "-", calc:(a,b)=>a-b },
  MULTIPLY: { id:"MULTIPLY", symbol: "×", calc:(a,b)=>a*b },
  DIVIDE: { id:"DIVIDE", symbol: "/", calc:(a,b)=>a/b },
}


const formatNumber = (valueString) => {
  const wholeNumber = Math.min(valueString).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0  });
  const decimalNumber = valueString.includes(".") ? `.${valueString.split(".")[1]}` : "";
  return `${wholeNumber}${decimalNumber}`
}




const Calculator = () => {
  
  /*  Log item:
    { 
      ts: Date.now(),
      value1: '', 
      value2: '',
      operation: '', 
      result: ''
    }

  */
  


  // STATE
  const [input, setInput] = useState(ZERO_VALUE);
  const [prevInput,setPrevInput] = useState(EMPTY_VALUE);
  const [saved, setSaved] = useState(false);
  const [operation,setOperation] = useState(OPERATIONS.NONE);


  // EVENT HANDLERS
  const handleNumber = (e) => { 
    if(!saved) return setInput(  input===ZERO_VALUE ? e.target.value : `${input}${e.target.value}` );
    setInput( e.target.value );
    setSaved( false );
  }
  const handleDecimal = (e) => {
    if(!saved) return setInput( input.includes(".") ? input : `${input}.` );
    setInput( "0." );
    setSaved( false );
  }
  const handleDelete = (e) => {
    if(!saved) return setInput(input!=="0" && input.length > 0 ? input.slice(0,-1) : ZERO_VALUE);
    setInput( "0" );
    setSaved( false );
  }
  const handleSignToggle = () => {
    if(!saved) return setInput(  input.includes("-") ?  input.slice(1) : `-${input}`   );
    setInput( "-0" );
    setSaved( false );
  }
  
  const handleSetOperation = (e) => {
    const id = e.target.value;
    console.log(id)
    if(input === ZERO_VALUE && prevInput===EMPTY_VALUE) return
    setPrevInput(input);
    setOperation(OPERATIONS[id])
    setSaved(true)
  }

  const handleClear = () => setInput(ZERO_VALUE);

  const handleClearEverything = () => {
    setInput(ZERO_VALUE);
    setOperation(EMPTY_VALUE)
    setPrevInput(EMPTY_VALUE);
  }




  const handleCalculate = () => {
    if(input!==ZERO_VALUE && prevInput!==EMPTY_VALUE && operation.id!=="NONE" && !saved){
      const result = OPERATIONS[operation.id].calc( parseFloat(prevInput), parseFloat(input) ).toString();
      setInput(result);
      setPrevInput(result);
      setOperation(OPERATIONS.NONE)
      setSaved(true)
    }
  }




  return (
    <div className="calculator">
      <header>
        <Screen 
          input={formatNumber(input)} 
          prevInput={formatNumber(prevInput)} 
          symbol={operation.symbol}
        />
      </header>
      <main>
        
        <Button value={7} label={7} onClick={handleNumber} />
        <Button value={8} label={8} onClick={handleNumber} />
        <Button value={9} label={9} onClick={handleNumber} />
        
        <Button value={"ADD"} label={OPERATIONS.ADD.symbol} className="func" onClick={handleSetOperation} />

        <Button value={4} label={4} onClick={handleNumber} />
        <Button value={5} label={5} onClick={handleNumber} />
        <Button value={6} label={6} onClick={handleNumber} />

        <Button value={"SUBTRACT"} label={OPERATIONS.SUBTRACT.symbol} className="func" onClick={handleSetOperation} />
        
        <Button value={1} label={1} onClick={handleNumber} />
        <Button value={2} label={2} onClick={handleNumber} />
        <Button value={3} label={3} onClick={handleNumber} />
        
        <Button value={"MULTIPLY"} label={OPERATIONS.MULTIPLY.symbol} className="func" onClick={handleSetOperation} />

        <Button value={"SIGN"} label={"+/-"} className="func" onClick={handleSignToggle}/>

        <Button value={0} label={0} onClick={handleNumber} />
        
        <Button value={"DECIMAL"} label={"."} className="func" onClick={handleDecimal} />

        <Button value={"DIVIDE"} label={OPERATIONS.DIVIDE.symbol} className="func" onClick={handleSetOperation} />
        
        <Button value={"RESET"} label={"CE"} className="func" onClick={handleClearEverything} />
        <Button value={"CLEAR"} label={"C"} className="func" onClick={handleClear} />
        <Button value={"DELETE"} label={"DEL"} className="func" onClick={handleDelete} />

        <Button value={"SUBMIT"} label={"="} className="calc" onClick={handleCalculate} />
      </main>
    </div>
  );
};

export default Calculator;
