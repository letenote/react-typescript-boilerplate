import React from "react";
import HelloWorld from "./components/HelloWorld";
import RenderForm from "./components/RenderForm";
import Counter from './containers/Counter';
import Bank from './containers/Bank';

const App: React.FC<{}> = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Counter title="Counter"/>
      <Bank/>
    </div>
  );
};

export default App;