import React, { memo, useState, createContext, useEffect } from 'react'
import QuestionsCreate from './QuestionsCreate'
import RandomQuestion from './RandomQuestion'
import PredifineQuestions from './PredifineQuestions'
import { testTypeOptions } from './Data'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const ContextAPI = createContext()

function Layout({storeHub,setStoreHub,btnControl,setBtnControl,formName,createForms,uniqueKey}) {
    
    const [store, setStore] = useState({
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
    })

    const [renderSection, setRenderSection] = useState(true)

    useEffect(() => {

        const data = {
                    "test_type_key": store.testType.value,
                    "test_name": store.testName,
                    "is_screening_test": store.screeningType.value=== 'pre-interview' ? 0:1,
                    "is_for_agent_panel": store.managedType.value !== 'agent' ? "false" : "true",
                    "is_mcq": store.radioValue === 'mcq' ? "true" :"false",
                    "total_no_question": store.numberOfQuestions,
                    "predefined_questions": {
                        "no_of_predefined_questions": store.predifineQuestion.total_question,
                        "already_selected_question_id": store.predifineQuestion.checkbox_selected_question,
                        "newly_created_questions": store.predifineQuestion.newly_created_questions
                    },
                    "random_questions": {
                        "no_of_random_question": store.randomQueston.random_question,
                        "technologies":store.randomQueston.technologies,
                        "no_of_mcq_question": store.randomQueston.number_of_mcq_question,
                        "no_of_programming_question":store.randomQueston.programming_question
                    }
                }
        setStoreHub((prev)=>({...prev,test_types: {...prev.test_types, [formName]: {...data} }}))

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
                if(store.randomQueston.technologies.length !== 0)
                   setBtnControl(false)
            }
             else {
                setBtnControl(true)
            }
        }
        btnDisabled()

    }, [store.predifineQuestion.checkbox_selected_question.length,store.randomQueston.random_question,store.randomQueston.technologies,store.randomQueston.no_of_mcq_question])


    const createFormsDelete=(keyName)=>{

        let copyTestType = {...storeHub.test_types};
        delete copyTestType[keyName];
        setStoreHub((prev)=>({...prev, test_types:copyTestType}))
    
      }
      
    return (
        <ContextAPI.Provider value={{ store, setStore, setBtnControl, createForms,storeHub,setStoreHub,formName ,createFormsDelete , uniqueKey}}>
                <h3 style={{padding:"5px 20px"}}>   </h3>
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
                    </div>
        </ContextAPI.Provider>
    )
}

export default memo(Layout)