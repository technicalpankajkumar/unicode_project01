import React, { useState } from 'react'
import './App.css';
import Layout from './components/Layout';

function App() {
  const [storeHub, setStoreHub] = useState({
    "hiring_request_id": 1,
    "level": 4,
    "hiring_technologies": [],
    "test_types": []
  })
  const [randerLayout, setRanderLayout] = useState([])
  const [btnControl, setBtnControl] = useState(true)
  return (
    <>
      <Layout
        storeHub={storeHub}
        setStoreHub={setStoreHub}
        btnControl={btnControl}
        setBtnControl={setBtnControl}
      />
    </>
  );
}

export default App;
