import React, { FC, ChangeEvent, memo } from "react";

interface TextfieldInterface {
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
};

const Textfield: FC<TextfieldInterface> = ({ value, onChange }) => {
  console.log("RENDER TEXTFIELD")
  return(
    <div style={{ position: 'relative' }}>
      <input
        value={value}
        placeholder={value === "" ? "input here" : ""}
        onChange={onChange}
        type={'text'}
      />
    </div>
  )
};

const compare = ( prevProps: TextfieldInterface, nextProps: TextfieldInterface ) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
};

export default memo(Textfield, compare);