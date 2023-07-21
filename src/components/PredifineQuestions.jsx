import { Button, Input, Label } from 'form_utility_package'
import React, { memo, useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { questionTypeOptions, technologyOptions } from './Data'
import CreateNewQuestions from './CreateNewQuestions'
import DataTable from './DataTable'
import { ContextAPI } from './Layout'
import { toast } from 'react-toastify'
import { GetAPI } from './API'

function PredifineQuestions() {
    //search use state
    const [searchData, setSearchData] = useState({ technology:[], question_type:[] })
    const [searchClear,setSearchClear]= useState(false)

    const [rows, setRows] = useState([])

    const [addQuestion, setAddQuestion] = useState(false)

    const contextAPI = useContext(ContextAPI)
    const { store, setStore } = contextAPI
    const { total_question } = store.predifineQuestion;

    useEffect(() => {
        GetAPI('http://localhost:8000/created_new_questions').then(resp => resp.json().then(res => {
            setRows(res)
        }))
    }, [store.predifineQuestion.newly_created_questions,searchClear])

    const onSelectChange = (name, obj) => {
        setSearchData(pre => ({ ...pre, [name]: obj }))
    }
    const onChange = (e) => {
        if (e.target.value < 0) {
            toast.warn("please add value grater then 0 !")
        } else {
            let totalRemainingValue = Number(store.numberOfQuestions) - Number(store.randomQueston.random_question)

            if (e.target.value <= totalRemainingValue) {
                setStore(pre => ({
                    ...pre, predifineQuestion: {
                        ...pre.predifineQuestion, [e.target.name]: e.target.value
                    }
                }))
            } else {
                toast(`enter value less then or equal to ${totalRemainingValue} !`)
            }
        }
    }
    const onSearch = () => {
        const {technology,question_type}= searchData
        const value1= searchData.technology.length != 0 && technology[0]?.value
        const value2 =searchData.question_type.length != 0 && question_type[0]?.value

        GetAPI(`http://localhost:8000/created_new_questions?technology=${value1}&?question_type=${value2}`).then(resp =>{
            resp.json().then(result => setRows(result))
        })

    }
    const onClear = () => {
        setSearchData(pre => ({ technology:[], question_type:[]}))
        setSearchClear(!searchClear)
    }

    const tableCheckSelect=(e)=>{
        console.log(e)
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
                        value={searchData.technology}
                        options={technologyOptions}
                        className='select-class'
                        isMulti
                        onChange={(obj) => onSelectChange('technology', obj)}
                    />
                </div>
                <div className='same-lavels'>
                    <Label className="labels" label="Questions Type" />
                    <Select
                        value={searchData.question_type}
                        isMulti
                        options={questionTypeOptions}
                        className="select-class"
                        classNamePrefix="select"
                        onChange={(obj) => onSelectChange('question_type', obj)}
                    />
                </div>
            </div>
            <div className='btn-group'>
                <Button
                    type="button"
                    label="Search"
                    className="btn-predifine-question"
                    onClick={onSearch}
                />
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
            <DataTable rows={rows} onClick={tableCheckSelect}/>
        </div>
    )
}

export default memo(PredifineQuestions)