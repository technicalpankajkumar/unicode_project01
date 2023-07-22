import React, { memo, useState, createContext } from 'react'
import QuestionsCreate from './QuestionsCreate'
import { testTypeOptions } from './Data'
import { Button } from 'form_utility_package'
import RandomQuestion from './RandomQuestion'
import PredifineQuestions from './PredifineQuestions'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const ContextAPI = createContext()

function Layout() {

    const [store, setStore] = useState({
        testName: "",
        testTypeOptionsCreate: testTypeOptions,
        testType: '',
        managedType: {},
        radioValue:'',
        screeningType: {},
        numberOfQuestions: 0,
        randomQueston: { random_question: 0, technologies: [], number_of_mcq_question: 0 },
        predifineQuestion: {
            total_question: 0,
            checkbox_selected_question:[],
            newly_created_questions: [0]
        }
    })
    const [btnControl,setBtnControl]= useState(false)
    const [renderSection, setRenderSection] = useState(true)

    return (
        <ContextAPI.Provider value={{ store, setStore , setBtnControl}}>
            <div className='layout-container'>
                <h3 className='questions-title'>Candidate screening test creation.</h3>
                <ToastContainer />
                <div className="container">
                    <QuestionsCreate />
                    {/* Random and Predifined Question Section */}
                    {
                       ( Number(store.numberOfQuestions) > 0 && store.testName != '' && store.testType != '' && store.radioValue != '' && Object.values(store.managedType).length != 0 && Object.values(store.screeningType).length != 0)
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
                        <Button type="button" label="Submit Condidate Test" className={btnControl ? 'btn btn-1' :"btn btn-1 btn-disabled"} disabled={btnControl} />
                        <Button type="button" label="Final Submit" className={btnControl ? 'btn btn-2' :"btn btn-2 btn-disabled"} disabled={btnControl}/>
                    </div>
                </div>
            </div>
        </ContextAPI.Provider>
    )
}

export default memo(Layout)