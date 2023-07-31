import React, { useState } from 'react'
import './App.css';
import Layout from './components/Layout';
import Button from 'form_utility_package/dist/form_utility/fields/Button';
import { PostAPI } from './components/API';
import { toast } from 'react-toastify';

function App() {
  const [storeHub, setStoreHub] = useState({
    hiring_request_id: 1,
    level: 4,
    hiring_technologies: [],
    test_types: { form1: {}, }
  })

  const [btnControl, setBtnControl] = useState(true)
  const [uniqueKey,setUniqueKey] = useState(0)
  
  function onSubmitTest() {
    const {test_types,...rest} = storeHub
    const testTypeArr = Object.values(test_types)
     PostAPI(`http://localhost:8000/data`,{...rest,test_types:testTypeArr,}).then(res => {
        toast("Data is "+res.statusText)
        setBtnControl(true)
        setTimeout(()=> window.location.reload(),5000)
     }).catch(err => toast.error(err))
  }

  const createForms = () => {
    let nextFormKey = "form" + (Number(Object.keys(storeHub.test_types).slice(-1)[0].slice(-1)) + 1);

    setStoreHub(pre => ({ ...pre, test_types: { ...pre.test_types, [nextFormKey]: {} } }))
    
    setUniqueKey(nextFormKey.slice(-1))

  }
 

  return (
    <>
      <div className='layout-container'>
        <h3 className='questions-title'>Candidate screening test creation.</h3>
        {
          Object.keys(storeHub.test_types).map((name) => {
            return <Layout
              key={name}
              storeHub={storeHub}
              setStoreHub={setStoreHub}
              btnControl={btnControl}
              setBtnControl={setBtnControl}
              formName={name}
              createForms={createForms}
              uniqueKey={uniqueKey}
            />
          })
        }

        {/* submitted buttons */}
        <div className='btn-group btn-main'>
          <Button
            type="button"
            label="Submit Condidate Test"
            className={btnControl ? 'btn btn-1 btn-disabled' : "btn btn-1 "}
            disabled={btnControl}
            onClick={() => onSubmitTest()}
          />
          <Button
            type="button"
            label="Final Submit"
            className={btnControl ? 'btn btn-2 btn-disabled' : "btn btn-2"}
            disabled={btnControl}
            onClick={() => console.log("but working.....")}
          />
        </div>
      </div>
    </>
  );
}

export default App;
