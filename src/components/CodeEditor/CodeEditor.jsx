import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';  // Importar el modo JSON
import { basicSetup } from 'codemirror'; // Tema para el editor

const CodeEditor = ({data,label,change}) => {
  const [jsonData, setJsonData] = useState(data);
 
  const handleChange = (value) => {
    try {
      change(value)
    } catch (e) {
    
      setJsonData(value);
    }
  };

  return (
    <div>
      <h2>{label}</h2>
      <CodeMirror
        value={JSON.stringify(jsonData, null, 2)} 
        height="200px"
        width='400px'
        extensions={[json(), basicSetup]} 
        onChange={handleChange} 
        theme="dark" 
      />
    </div>
  );
};

export default CodeEditor;
