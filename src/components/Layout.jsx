import React, { memo, useState, createContext, useEffect } from 'react'
import QuestionsCreate from './QuestionsCreate'
import { testTypeOptions } from './Data'
import { Button } from 'form_utility_package'
import RandomQuestion from './RandomQuestion'
import PredifineQuestions from './PredifineQuestions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { PostAPI } from './API'

export const ContextAPI = createContext()
const initialStore ={
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

function Layout({storeHub,setStoreHub,btnControl,setBtnControl}) {
    
    const [store, setStore] = useState(initialStore)

    const [renderSection, setRenderSection] = useState(true)

    useEffect(() => {
        //main submit form button disable
        const btnDisabled = () => {
            if (store.predifineQuestion.checkbox_selected_question.length > 0) {
                if (Number(store.predifineQuestion.total_question) === store.predifineQuestion.checkbox_selected_question.length) {
                    setBtnControl(false)
                } else {
                    setBtnControl(true)
                }
            }
            else if(Number(store.randomQueston.random_question) === Number(store.numberOfQuestions) && Number(store.randomQueston.random_question) !== 0){
                setBtnControl(false)
            }
             else {
                setBtnControl(true)
            }
            
        }
        btnDisabled()

    }, [store.predifineQuestion.checkbox_selected_question.length,store.randomQueston.random_question])

    const onSubmitTest = () => {
        const data = {
            "test_type_key": store.testType.value,
            "test_name": store.testName,
            "is_screening_test": store.screeningType.value,
            "is_for_agent_panel": store.managedType.value !== 'agent' ? "false" : "true",
            "is_mcq": store.radioValue === 'mcq' ? "true" :"false",
            "no_of_predefined_questions": 1,
            "total_no_question": store.numberOfQuestions,
            "predefined_questions": {
                "no_of_predefined_questions": store.predifineQuestion.total_question,
                "already_selected_question_id": store.predifineQuestion.checkbox_selected_question,
                "newly_created_questions": store.predifineQuestion.newly_created_questions
            },
            "random_questions": {
                "no_of_random_question": store.randomQueston.random_question,
                "technologies": store.randomQueston.technologies,
                "no_of_mcq_question": store.randomQueston.number_of_mcq_question,
                "no_of_programming_question":store.randomQueston.programming_question
            }
        }

        PostAPI(`http://localhost:8000/test_types`,data).then(res =>{ toast("Data is " +res.statusText); setStore(initialStore)}).catch(err => toast.error(err.message))
    }

    return (
        <ContextAPI.Provider value={{ store, setStore, setBtnControl }}>
            <div className='layout-container'>
                <h3 className='questions-title'>Candidate screening test creation.</h3>
                <ToastContainer />
                <div className="container">
                    <QuestionsCreate />
                    {/* Random and Predifined Question Section */}
                    {
                        (Number(store.numberOfQuestions) > 0 && store.testName != '' && store.testType != '' && store.radioValue != '' && Object.values(store.managedType).length != 0 && Object.values(store.screeningType).length != 0)
                            ?
                            <div className='container-random-predifine-question'>
                                <div className='navigate-question'>
                                    <div className={renderSection ? 'random active-class' : `random`} onClick={() => setRenderSection(true)}>RANDOM QUESTIONS</div>
                                    <div className={renderSection ? 'predifine ' : `predifine active-class`} onClick={() => setRenderSection(false)}>PREDIFINE QUESTIONS</div>
                                </div>
                                {/* show area of random or predifine question */}
                                <div className='render-section'>
                                    {renderSection ? <RandomQuestion /> : <PredifineQuestions />}
                                </div>
                            </div>
                            :
                            <></>
                    }
                    {/* submitted buttons */}
                    <div className='btn-group btn-main'>

                        {/* btnDisable control function is define in PredifineQuestions component */}
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
                            onClick={() =>console.log("but working.....")}
                        />
                    </div>
                </div>
            </div>
        </ContextAPI.Provider>
    )
}

export default memo(Layout)