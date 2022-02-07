import React from "react";
import HelloWorld from "./components/HelloWorld";
import RenderForm from "./components/RenderForm";
import Counter from './containers/Counter';

const App: React.FC<{}> = () => {
  return (
    <>
      <Counter title="Counter"/>
    </>
  );
};

export default App;