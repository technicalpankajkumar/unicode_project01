import React, { useState } from 'react'
import './App.css';
import Layout from './components/Layout';
import Button from 'form_utility_package/dist/form_utility/fields/Button';
import { testTypeOptions } from './components/Data';
import { PostAPI } from './components/API';
import { toast } from 'react-toastify';
function App() {
  const [storeHub, setStoreHub] = useState({
    level: 4,
    hiring_technologies: [],
    test_types: { form1: {}, }
  })

  const [btnControl, setBtnControl] = useState(true)

  const initialState ={
    testName: "",
    testTypeOptionsCreate: testTypeOptions,
    testType: '',
    managedType: {},
    radioValue: '',
    screeningType: {},
    numberOfQuestions: 0,
    randomQueston: { random_question: 0, technologies: [], number_of_mcq_question: 0, programming_question: 0 },
    predifineQuestion: {
        total_question: 0,
        checkbox_selected_question: [],
        newly_created_questions: [0]
    }
}

  function onSubmitTest() {
    const {test_types,...rest} = storeHub
    const testTypeArr = Object.values(test_types)
     PostAPI(`http://localhost:8000/data`,{hiring_request_id: 1,...rest,test_types:testTypeArr,}).then(res => {
        toast("Data is "+res.statusText)
     }).catch(err => toast.error(err))
  }

  const createForms = () => {
    let nextFormKey = "form" + (Number(Object.keys(storeHub.test_types).slice(-1)[0].slice(-1)) + 1);

    setStoreHub(pre => ({ ...pre, test_types: { ...pre.test_types, [nextFormKey]: {} } }))
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
              initialState={initialState}
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
