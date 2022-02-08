import React, { FC, ChangeEvent, memo } from "react";

interface TextfieldValidationInterface {
  isError: boolean
  message: string
}
interface TextfieldInterface {
  id: string,
  label: string,
  value: string,
  required?: boolean,
  type?: string,
  validation?: TextfieldValidationInterface,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
};

const Textfield: FC<TextfieldInterface> = ({ id, label, type = "text", required = false, validation = { isError: false, message: "" }, value, onChange }) => {
  return(
    <div className="input-group">
      <div className="label-group">
        <label 
          className={[required ? "label-required" : "", "label-group"].join(" ")} 
          htmlFor={label}
        >
          {label}
        </label>
      </div>
      <input
        className={validation.isError ? 'error-validation' : ""}
        id={id}
        data-testid={id}
        value={value}
        placeholder={value === "" ? "input here" : ""}
        onChange={onChange}
        type={type}
      />
      {
        validation.isError && (
          <div className="error-validation" style={{ position: 'absolute' }}>{ validation.message }</div>
        )
      }
    </div>
  )
};

const compare = ( prevProps: TextfieldInterface, nextProps: TextfieldInterface ) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
};

export default memo(Textfield, compare);