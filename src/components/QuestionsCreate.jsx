import React, { memo, useContext, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { Button, Input, Radio } from 'form_utility_package'
import { managedByOption, radioOptions, radioOptions2, screeningTypeOptions} from './Data';
import { ContextAPI } from './Layout';

function QuestionsCreate() {

    const ContextAPIData = useContext(ContextAPI)
    const {store,setStore}=ContextAPIData

    const { testName, managedType, testTypeOptionsCreate, screeningType, numberOfQuestions } = store;

    // only this onSmash function apply selete field
    const onSmash = (type, obj) => {
        console.log(obj)
        if (obj?.value == 'agent') {
            setStore(pre => ({ ...pre, [type]: obj }))
            setStore(pre => ({ ...pre, radioValue: "mcq" }))
        }
        else if (obj?.value == 'user') {
            setStore(pre => ({ ...pre, [type]: obj }))
            setStore(pre => ({ ...pre, radioValue: " " }))
        }
        else {
            setStore(pre => ({ ...pre, [type]: obj }))
        }
    }

    //this onChange function apply othere field
    const onChange = (e) => {
        if(e.target.value < 0){
              //enter message or other statement
        }else {
            setStore(pre => ({ ...pre, [e.target.name]: e.target.value }))
        }
    }

    const onCreateOptionSmash = (value) => {
        setStore(pre => ({
            ...pre,
            testTypeOptionsCreate: [...pre.testTypeOptionsCreate,
            { value: value, label: value[0].toUpperCase() + value.slice(1,).toLowerCase() }
            ]
        }
        ))
    }
    console.log(store)

    return (
        <div className='container-questions-create'>
            <div className='questions-create'>

                {/* form_utility_library code */}
                <label className="labels">Test name </label>
                <Input type="text" name="testName" value={testName} onChange={onChange} placeholder="Enter test name" className="test-name-input" />

                {/* react-select library code */}
                <label className="labels">Select Test Type or add New Test Type </label>
                <CreatableSelect
                    isClearable
                    options={testTypeOptionsCreate}
                    onChange={(obj) => onSmash('testType', obj)}
                    className="test-type-select"
                    onCreateOption={onCreateOptionSmash}
                />
                <label className="labels">Managed by </label>
                <Select
                    options={managedByOption}
                    defalutValue={managedType}
                    onChange={(obj) => onSmash('managedType', obj)}
                    className="managed-type-select"
                />
                {
                    managedType.value == 'agent'
                    &&
                    <Radio
                        options={radioOptions}
                        name="radioValue"
                        onChange={onChange}
                        disabled={true}
                    />
                }
                {
                    managedType.value == 'user'
                    &&
                    <>
                        <Radio
                            options={radioOptions2}
                            name="radioValue"
                            onChange={onChange}
                        />
                    </>
                }

                <label className="labels">Screening type </label>
                <Select
                    options={screeningTypeOptions}
                    defalutValue={screeningType}
                    onChange={(obj) => onSmash('screeningType', obj)}
                    className="screening-type-select"
                />

                {/* form_utility_library code */}
                <label className="labels">Enter total number of questions </label>
                <Input
                    type="number"
                    name="numberOfQuestions"
                    value={numberOfQuestions}
                    onChange={onChange}
                    className="number-of-questions-input"
                />
                
            </div>
        </div>
    )
}

export default memo(QuestionsCreate)