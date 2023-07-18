import React, { memo, useState, createContext } from 'react'
import QuestionsCreate from './QuestionsCreate'
import { testTypeOptions } from './Data'
import { Button } from 'form_utility_package'
import RandomQuestion from './RandomQuestion'

export const ContextAPI = createContext()
function Layout() {
    const [store, setStore] = useState({
        testName: "",
        testTypeOptionsCreate: testTypeOptions,
        testType: "",
        managedType: {},
        radioValue: '',
        screeningType: {},
        numberOfQuestions: 0
    })
    return (
        <ContextAPI.Provider value={{ store, setStore }}>
            <div className='layout-container'>
                <h3 className='questions-title'>Candidate screening test creation.</h3>
                <div className="container">
                    <QuestionsCreate />
                    {/* Random and Predifined Question Section */}
                    <RandomQuestion />

                    {/* submitted buttons */}
                    <div className='btn-group'>
                        <Button type="button" label="Submit Condidate Test" className="btn btn-1" />
                        <Button type="button" label="Final Submit" className="btn btn-2" />
                    </div>
                </div>
            </div>
        </ContextAPI.Provider>
    )
}

export default memo(Layout)