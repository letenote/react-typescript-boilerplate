import React, { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import Button from '../components/Button';
import Textfield from '../components/Textfield';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../redux/reducers';
import * as bankActionCreators from '../redux/actions/bank-action';

const Bank: FC = () => {
  const myBank = useSelector((state: RootState) => state.bank)
  const dispatch = useDispatch();
  const { depositMoney, withdrawMoney, bankruptMoney } = bindActionCreators(bankActionCreators, dispatch);
  const [ moneyField, setMoneyField ] = useState<string>("");
  const [ isValidationError, setValidationError ] = useState<boolean>(false)
  const memoizedActions = ( cb: () => void ) => useCallback(() => cb(), [moneyField]);
  
  useEffect(() => {
    setValidationError(false)
    setMoneyField("")
  }, [myBank.money])
  
  return(
    <div>
      <h1 style={{ position: "relative" }}>
        BANK STORE 
        <span 
          style={{ 
            position: "absolute", 
            left: 0, 
            top: "35px", 
            fontSize: 10 
          }}
        >
          Implement Redux
        </span>
      </h1>
      <h3 data-testid={"count-value"}>Balanced: {myBank.money}</h3>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Textfield 
          id="moneyFormInput"
          label={"Money Input"}
          value={moneyField}
          required={true}
          onChange={(e) => setMoneyField(e.target.value)}
          validation={{
            isError: isValidationError,
            message: "required"
          }}
        />
        <Button
          title="Deposit"
          onClick={memoizedActions(() => moneyField === "" ? setValidationError(true) : depositMoney(Number(moneyField)))}
        />
        <Button
          title="Withdraw"
          onClick={memoizedActions(() => moneyField === "" ? setValidationError(true) : withdrawMoney(Number(moneyField)))}
        />
        <Button
          title="Bankrupt"
          onClick={memoizedActions(() => (setValidationError(false), bankruptMoney()))}
        />
      </div>
    </div>
  )
}

export default Bank