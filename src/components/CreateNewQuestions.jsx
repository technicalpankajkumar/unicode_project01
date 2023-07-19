import React, { memo, useContext, useState } from 'react'
import { Input, Label } from 'form_utility_package'
import Select from 'react-select'
import { questionTypeOptions, technologyOptions } from './Data'
import CreateOptions from './CreateOptions'
import { Button } from 'form_utility_package'
import { ContextAPI } from './Layout'
import { toast } from 'react-toastify'
function CreateNewQuestions({ setAddQuestion }) {
    const staticField = {
        technology: '',
        question_type: '',
        question_title: '',
        options: {},
        correct_answar: ''
    }
    const [questionStore, setQuestionStore] = useState(staticField)
    const [optionsCreate, setOptionsCreate] = useState([])
    const apiData = useContext(ContextAPI)

    const { store, setStore } = apiData

    const onSmash = (e) => {
        setQuestionStore(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }
    const onSelect = (name, obj) => {
        setQuestionStore(pre => ({ ...pre, [name]: obj.value }))
    }
    const onOptionClick = () => {
        if (optionsCreate.length < 4) {
            setOptionsCreate(pre => [...pre, 0])
        } else {
            //toast here show 
        }
    }
    const onOptionChange = (e) => {
        setQuestionStore(pre => ({ ...pre, options: { ...pre.options, [e.target.name]: e.target.value } }))
    }

    const onHandleCreate = () => {
        if (Object.values(questionStore).every(data => Boolean(data) !== false)) {
            setStore(pre => ({
                ...pre,
                predifineQuestion: {
                    ...pre.predifineQuestion, addNewQuestions: [
                        ...pre.predifineQuestion.addNewQuestions, questionStore
                    ]
                }
            }
            ))
            setAddQuestion(false)
        } else {
            toast.error("Please fill all field are required !", {
                icon: "🚀",
            })
        }
    }
    const onHandleSaveCreate = () => {
        if (Object.values(questionStore).every(data => Boolean(data) !== false)) {
            setStore(pre => ({
                ...pre,
                predifineQuestion: {
                    ...pre.predifineQuestion, addNewQuestions: [
                        ...pre.predifineQuestion.addNewQuestions, questionStore
                    ]
                }
            }
            ))
            setQuestionStore(staticField)
            setOptionsCreate([])
        }else {
            toast.error("Please fill all field are required !", {
                icon: "🚀",
            })
        }
    }

    return (
        <div className='container-create-new-question'>
            <h1>Add New Question</h1>
            <Label className="labels" label="Technology" />
            <Select
                defaultValue={questionStore.technology}
                options={technologyOptions}
                onChange={(obj) => onSelect('technology', obj)}
                className='select-class'
            />

            <Label className="labels" label="Question Type" />
            <Select
                defaultValue={questionStore.question_type}
                options={questionTypeOptions}
                onChange={(obj) => onSelect('question_type', obj)}
                className='select-class'
            />

            <Label className="labels" label="Question Title" />
            <Input
                type="text"
                value={questionStore?.question_title}
                name="question_title"
                className="input-class"
                onChange={onSmash}
            />

            <div className='create-icon'>
                <Label className="labels" label="Answer options" />
                &nbsp;  &nbsp;<span onClick={onOptionClick}> <i className="bi bi-patch-plus"></i></span>
            </div>
            {
                optionsCreate.map((data, index) => {
                    return (<span key={index}>
                        <CreateOptions onChange={onOptionChange} onClick={onSmash} index={index} />
                    </span>)
                })
            }
            <div className='btn-group'>
                <Button
                    type="button"
                    label="Create"
                    className="btn-create"
                    onClick={onHandleCreate}
                />
                <Button
                    type="button"
                    label="Save & Create New"
                    className="btn-save-create"
                    onClick={onHandleSaveCreate}
                />
                <Button
                    type="button"
                    label="Cancel"
                    className="btn-cancel"
                    onClick={() =>{ setAddQuestion(false); toast.success("thank for cancelation")}}
                />
            </div>
        </div>
    )
}

export default memo(CreateNewQuestions)