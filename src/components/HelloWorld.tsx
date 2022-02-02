import React from "react";
import imageLogo from '../../public/assets/images/logo512.png';

const HelloWorld: React.FC<{}> = () => {
  console.log("CCHCHCHCHk")
  return(
    <>
    <h1>My React and TypeScript App!! {new Date().toLocaleDateString()}</h1>
    <img src={imageLogo} width="200px" height="200px"/>
  </>
  )
};

export default HelloWorld;