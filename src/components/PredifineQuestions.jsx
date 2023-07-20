import { Button, Input, Label } from 'form_utility_package'
import React, { memo, useContext, useState } from 'react'
import Select from 'react-select'
import { questionTypeOptions, technologyOptions } from './Data'
import CreateNewQuestions from './CreateNewQuestions'
import DataTable from './DataTable'
import { ContextAPI } from './Layout'
import { toast } from 'react-toastify'

function PredifineQuestions() {

    const [addQuestion, setAddQuestion] = useState(false)
    const contextAPI = useContext(ContextAPI)
    const { store, setStore } = contextAPI
    const { total_question, technologies, question_types } = store.predifineQuestion;

    //search use state

    const onSelectChange = (name, obj) => {
        setStore(pre => ({
            ...pre, predifineQuestion: {
                ...pre.predifineQuestion, [name]: obj
            }
        }))
    }
    const onChange = (e) => {
        if (e.target.value < 0) {
            toast.warn("please add value grater then 0 !")
        } else {
            let totalRemainingValue = Number(store.numberOfQuestions)- Number(store.randomQueston.random_question)
            if(e.target.value <= totalRemainingValue){
                setStore(pre => ({
                    ...pre, predifineQuestion: {
                        ...pre.predifineQuestion, [e.target.name]: e.target.value
                    }
                }))
            }else{
                toast(`enter value less then or equal to ${totalRemainingValue} !`)
            }
        }
    }
    const onClear = () => {
        setStore(pre => ({
            ...pre, predifineQuestion: {
                ...pre.predifineQuestion, total_question: 0,
                technologies: [],
                question_types: []
            }
        }))
    }

    return (
        <div className='predifine-question'>
            <div className='container-predifine-question'>
                <div className='same-lavels'>
                    <Label className="labels" label="Total no. of Predifine Questions" />
                    <Input
                        value={total_question}
                        type="number"
                        name="total_question"
                        className="input-class"
                        onChange={onChange}
                    />
                </div>
                <div className='same-lavels'>
                    <Label className="labels" label="Technology" />
                    <Select
                        value={technologies}
                        options={technologyOptions}
                        className='select-class'
                        isMulti
                        onChange={(obj) => onSelectChange('technologies', obj)}
                    />
                </div>
                <div className='same-lavels'>
                    <Label className="labels" label="Questions Type" />
                    <Select
                        value={question_types}
                        isMulti
                        options={questionTypeOptions}
                        className="select-class"
                        classNamePrefix="select"
                        onChange={(obj) => onSelectChange('question_types', obj)}
                    />
                </div>
            </div>
            <div className='btn-group'>
                <Button type="button" label="Search" className="btn-predifine-question" />
                <Button
                    type="button"
                    label="Clear"
                    className="btn-predifine-question"
                    onClick={onClear}
                />
                <Button
                    type="button"
                    label="Add New Questions"
                    className="btn-predifine-question"
                    onClick={() => setAddQuestion(true)}
                />
            </div>
            {addQuestion ? <CreateNewQuestions setAddQuestion={setAddQuestion} /> : <></>}
            <DataTable />
        </div>
    )
}

export default memo(PredifineQuestions)