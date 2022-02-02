import React from "react";
import imageLogo from '../../public/assets/images/logo512.png';

const HelloWorld: React.FC<{}> = () => {
  return(
    <>
    <h1>My React and TypeScript App!! {new Date().toLocaleDateString()}</h1>
  <img src={imageLogo} />
  </>
  )
};

export default HelloWorld;