import React, { FC, memo } from "react";

interface ButtonProps {
  title: string,
  onClick: () => void
};

const Button: FC<ButtonProps> = ( { title = 'title', onClick } ) => {
  // console.log("RENDER BUTTON")
  
  return(
    <button
      className="button" 
      type={'button'}
      onClick={onClick}
    >
      { title }
    </button>
  )
};

export default memo(Button);