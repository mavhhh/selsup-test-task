import React, { useRef } from "react";
import "./App.css";
import { ParamEditor, Param, Model } from "./components/ParamEditor/ParamEditor";

function App() {
  console.log('render')
  
  const editorRef = useRef<ParamEditor>(null);

  const params: Param[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" },
  ];

  const model : Model = {
    paramValues: [
      { paramId: 1, value: "повседневное" },
      { paramId: 2, value: "макси" },
    ],
    colors: [],
  };

  const handleGetModel = () => {
    if (!editorRef.current) return;

    const currentModel = editorRef.current.getModel();
    console.log("Model:", currentModel);
  };

  return (
    <div className="App" style={{ padding: "10px", textAlign: "left" }}>
      <h2>Редактор параметров</h2>
      <ParamEditor ref={editorRef} params={params} model={model} />
      <button onClick={handleGetModel} style={{ marginTop: "10px" }}>
        Вывести модель в логи 
      </button>
    </div>
  );
}

export default App;
