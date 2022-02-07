import React, { FC, useState } from "react";

interface Props {
  title : string
}

enum GetOperator {
  Addition = "+",
  Subtraction = "-"
}

const Counter: FC<Props> = ({ title = "title" }) => {
  const [ count, setCounter ] = useState<number>(0);

  const changeCounter = ( operator:GetOperator ):void => {
    const getValue = eval(`${count}${operator}1`);
    getValue >= 0 && setCounter(getValue)
  }

  return(
    <div>
      <h1>{title}: {count}</h1>
      <div style={{ display: "flex" }}>
        <button 
          className="button" 
          onClick={() => changeCounter(GetOperator.Subtraction)}
        >-</button>
        <button 
          className="button" 
          onClick={() => changeCounter(GetOperator.Addition)}
        >+</button>
      </div>
      <button 
        className="button" 
        onClick={() => setCounter(0)}
      >Reset</button>
    </div>
  )
};

export default Counter;
