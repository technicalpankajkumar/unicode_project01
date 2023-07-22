import React, { memo, useContext, useState } from 'react'
import { Input, Label } from 'form_utility_package'
import Select from 'react-select'
import { questionTypeOptions, technologyOptions } from './Data'
import CreateOptions from './CreateOptions'
import { Button } from 'form_utility_package'
import { ContextAPI } from './Layout'
import { toast } from 'react-toastify'
import { PostAPI } from './API'

function CreateNewQuestions({ setAddQuestion }) {
    const staticField = {
        technology: '',
        question_type: {},
        question_title: '',
        options: { option_1: '', option_2: '' },
        correct_answar: []
    }
    const [questionStore, setQuestionStore] = useState(staticField)
    const [optionsCreate, setOptionsCreate] = useState([])
    const apiData = useContext(ContextAPI)

    const { store, setStore } = apiData

    const onSmash = (e) => {
        setQuestionStore(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }
    const onCheckClick =(e)=>{
        setQuestionStore(pre => ({ ...pre, [e.target.name]: [e.target.value] }))
    }
    const onSelect = (name, obj) => {
        setQuestionStore(pre => ({ ...pre, [name]: obj }))
    }

    //delete options data function   problem create
    const onDelete = (removeData, key) => {

        let rightAnswer = questionStore.correct_answar[0] === key ? '' : key;

        if (rightAnswer == '') {
            setQuestionStore(pre => ({ ...pre, correct_answar: [rightAnswer] }))
        }

        setQuestionStore(pre => ({ ...pre, options: { ...pre.options, [key]: '' } }))

        setOptionsCreate(optionsCreate.filter(item => item != removeData))
    }

    //render option field base on this array
    const onOptionClick = () => {
        function findMissing(arr) {
            for (let i = 1; i <= 4; i++)
                if (!arr.includes(i)) return i;
        }

        if (optionsCreate.length < 4) {
            setOptionsCreate(pre => [...pre, findMissing(optionsCreate)])
        } else {
            toast.warn("maximum option selected !")
        }
    }

    // Main Store data handler All button create data logic or validations
    const onOptionChange = (e) => {
        setQuestionStore(pre => ({ ...pre, options: { ...pre.options, [e.target.name]: e.target.value } }))
    }
    const onHandleCreate = () => {
        if (Object.values(questionStore).every(data => Boolean(data) !== false)) {
            if ((optionsCreate.length > 1 && questionStore.correct_answar.length === 1)|| questionStore.question_type.value === 'programming' || questionStore.question_type.value === 'descriptive') {

                setStore(pre => ({
                    ...pre, predifineQuestion: {
                        ...pre.predifineQuestion, newly_created_questions: [
                            Number(store.predifineQuestion.newly_created_questions) + 1
                        ]
                    }
                }))

                const { technology, question_type, ...rest } = questionStore;

                PostAPI('http://localhost:8000/created_new_questions', {
                    technology: technology.value,
                    question_type: question_type.value,
                    ...rest
                }).then(res => {
                    toast.success(`Data successfully ${res.statusText}`)
                }).catch((err) => console.log(err))

                setAddQuestion(false)

            } else {
                toast("please select minimum 2 options and choose right answer")
            }
        } else {
            toast.error("Please fill all field are required !", {
                icon: "🚀",
            })
        }
    }
    const onHandleSaveCreate = () => {
        if (Object.values(questionStore).every(data => Boolean(data) !== false)) {
            if ((optionsCreate.length > 1 && questionStore.correct_answar.length === 1 )|| questionStore.question_type.value === 'programming' || questionStore.question_type.value === 'descriptive') {
                setStore(pre => ({
                    ...pre, predifineQuestion: {
                        ...pre.predifineQuestion, newly_created_questions: [
                            Number(store.predifineQuestion.newly_created_questions) + 1
                        ]
                    }
                }))

                const { technology, question_type, ...rest } = questionStore;

                PostAPI('http://localhost:8000/created_new_questions', {
                    technology: technology.value,
                    question_type: question_type.value,
                    ...rest
                }).then(res => {
                    toast.success(`Data successfully ${res.statusText}`)
                }).catch((err) => console.log(err))

                setQuestionStore(staticField)
                setOptionsCreate([])

            } else {
                toast("please select minimum 2 options and choose right answer")
            }
        } else {
            toast.error("Please fill all field are required !", {
                icon: "🚀",
            })
        }
    }

    console.log(questionStore)

    return (
        <div className='container-create-new-question'>
            <h1>Add New Question</h1>
            <Label className="labels" label="Technology" />
            <Select
                value={questionStore.technology}
                options={technologyOptions}
                onChange={(obj) => onSelect('technology', obj)}
                className='select-class'
            />

            <Label className="labels" label="Question Type" />
            <Select
                value={questionStore.question_type}
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

           { 
           
            questionStore.question_type?.value === 'mcq' && <div className='create-icon'>
                <Label className="labels" label="Answer options" />
                &nbsp;  &nbsp;<span onClick={onOptionClick}> <i className="bi bi-patch-plus"></i></span>
            </div>
           
            }
            {
                optionsCreate.map((data, index) => {
                    return (<span key={index}>
                        <CreateOptions
                            localStore={questionStore}
                            onChange={onOptionChange}
                            onClick={onCheckClick}
                            onDelete={onDelete}
                            index={data}
                            currectAnswer={questionStore.correct_answar[0]}
                        />
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
                    onClick={() => { setAddQuestion(false); toast.success("thank for cancelation") }}
                />
            </div>
        </div>
    )
}

export default memo(CreateNewQuestions)