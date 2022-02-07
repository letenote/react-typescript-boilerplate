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
  const memoizedActions = ( cb: () => void ) => useCallback(() => cb(), [moneyField]);
  
  return(
    <div>
      <h1>BANK STORE</h1>
      <h3>Money: {myBank.money}</h3>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Textfield 
          value={moneyField}
          onChange={(e) => setMoneyField(e.target.value)}
        />
        <Button
          title="Deposit"
          onClick={memoizedActions(() => depositMoney(Number(moneyField)))}
        />
        <Button
          title="Withdraw"
          onClick={memoizedActions(() => withdrawMoney(Number(moneyField)))}
        />
        <Button
          title="Bankrupt"
          onClick={memoizedActions(() => bankruptMoney())}
        />
      </div>
    </div>
  )
}

export default Bank