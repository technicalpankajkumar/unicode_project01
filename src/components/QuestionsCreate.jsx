import React, { memo, useContext } from 'react'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { Input, Radio } from 'form_utility_package'
import { managedByOption, radioOptions, screeningTypeOptions } from './Data';
import { ContextAPI } from './Layout';
import { toast } from 'react-toastify';

function QuestionsCreate() {

    const ContextAPIData = useContext(ContextAPI)
    const { store, setStore, createForms, formName, createFormsDelete } = ContextAPIData

    const { testName, managedType, testTypeOptionsCreate, screeningType, numberOfQuestions } = store;

    // only this onSmash function apply selete field
    const onSmash = (type, obj) => {
        if (obj?.value == 'agent') {
            setStore(pre => ({ ...pre, [type]: obj }))
            setStore(pre => ({ ...pre, radioValue: "yes" }))
        }
        else if (obj?.value == 'user') {
            setStore(pre => ({ ...pre, [type]: obj }))
            setStore(pre => ({ ...pre, radioValue: "yes" }))
        }
        else {
            setStore(pre => ({ ...pre, [type]: obj }))
        }
    }

    //this onChange function apply othere field
    const onChange = (e) => {
        if (e.target.value < 0) {
            toast.warn("please add value grater then 0 !")
        } else {
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

    return (
        <div className='container-questions-create'>
            <div className='questions-create'>

                {/* form_utility_library code */}
                <label className="labels">Test name </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Input
                        type="text"
                        name="testName"
                        value={testName}
                        onChange={onChange}
                        placeholder="Enter test name"
                        className="input-class" />
                    <i className="bi bi-plus-square"
                        onClick={createForms}
                        style={{ fontSize: "15px", margin: "0px 7px", color: "green" }}
                    ></i>
                    {
                        formName !== 'form1' && <i className="bi bi-trash3"
                            style={{ fontSize: "15px", color: "red" }}
                            onClick={() => createFormsDelete(formName)}
                        ></i>
                    }

                </div>

                {/* react-select library code */}
                <label className="labels">Select Test Type or add New Test Type </label>
                <CreatableSelect
                    options={testTypeOptionsCreate}
                    onChange={(obj) => onSmash('testType', obj)}
                    className="select-class"
                    onCreateOption={onCreateOptionSmash}
                />
                <label className="labels">Managed by </label>
                <Select
                    options={managedByOption}
                    defalutValue={managedType}
                    onChange={(obj) => onSmash('managedType', obj)}
                    className="select-class"
                />

                {
                    managedType.value === 'agent'
                    &&
                    <>
                        <p style={{ marginBottom: "4px" }}>is MCQ</p>
                        <Radio
                            options={radioOptions}
                            name="radioValue"
                            onChange={onChange}
                            disabled={true}
                        />
                    </>
                }
                {
                    managedType.value === 'user'
                    &&
                    <>
                        <p style={{ marginBottom: "4px" }}>is MCQ</p>
                        <div style={{display:"flex"}}>
                            <Input
                                type="radio"
                                value="yes"
                                name="radioValue"
                                onChange={onChange}
                                checked={store.radioValue === 'yes'}
                                style={{margin:"5px 5px 15px"}}
                            />
                            <span style={{margin:"4px 0px",}}>YES</span>
                            <Input
                                type="radio"
                                value="no"
                                name="radioValue"
                                onChange={onChange}
                                checked={store.radioValue === 'no'}
                                style={{margin:"5px 5px 15px"}}
                            />
                            <span style={{margin:"4px 0px",}}>NO</span>
                        </div>
                    </>
                }

                <label className="labels">Screening type </label>
                <Select
                    options={screeningTypeOptions}
                    defalutValue={screeningType}
                    onChange={(obj) => onSmash('screeningType', obj)}
                    className="select-class"
                />

                {/* form_utility_library code */}
                <label className="labels">Enter total number of questions </label>
                <Input
                    type="number"
                    name="numberOfQuestions"
                    value={numberOfQuestions}
                    onChange={onChange}
                    className="input-class"
                />

            </div>
        </div>
    )
}

export default memo(QuestionsCreate)