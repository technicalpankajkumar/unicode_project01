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
    const [searchData, setSearchData] = useState({ technology: [], question_type: [] })
    const [searchClear, setSearchClear] = useState(false)

    const [rows, setRows] = useState([])

    const [addQuestion, setAddQuestion] = useState(false)

    const contextAPI = useContext(ContextAPI)
    const { store, setStore, setBtnControl } = contextAPI
    const { total_question, checkbox_selected_question } = store.predifineQuestion;

    useEffect(() => {
        GetAPI('http://localhost:8000/created_new_questions').then(resp => resp.json().then(res => {
            setRows(res)
        }))
    }, [store.predifineQuestion.newly_created_questions[0], searchClear])

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
        const { technology, question_type } = searchData
        const technology1 = searchData.technology.length != 0 && technology[0]?.value
        const technology2 = searchData.technology.length === 2 && technology[1]?.value
        const question_type1 = searchData.question_type.length !== 0 && question_type[0]?.value
        const question_type2 = searchData.question_type.length === 2 && question_type[1]?.value

        if (question_type1) {
            if (question_type2 && technology2) {
                GetAPI(`http://localhost:8000/created_new_questions?technology=${technology1}&technology=${technology2}&question_type=${question_type1}&question_type=${question_type2}`).then(resp => {
                    resp.json().then(result => setRows(result))
                })
            }
            else if (question_type2 && technology1) {
                GetAPI(`http://localhost:8000/created_new_questions?technology=${technology1}&question_type=${question_type1}&question_type=${question_type2}`).then(resp => {
                    resp.json().then(result => setRows(result))
                })
            } else if (technology1 && technology2) {
                GetAPI(`http://localhost:8000/created_new_questions?technology=${technology1}&technology=${technology2}&question_type=${question_type1}`).then(resp => {
                    resp.json().then(result => setRows(result))
                })
            }
            else if (technology1) {
                GetAPI(`http://localhost:8000/created_new_questions?technology=${technology1}&question_type=${question_type1}`).then(resp => {
                    resp.json().then(result => setRows(result))
                })
            } else {
                GetAPI(`http://localhost:8000/created_new_questions?question_type=${question_type1}`).then(resp => {
                    resp.json().then(result => setRows(result))
                })
            }
        } else if (technology2) {
            GetAPI(`http://localhost:8000/created_new_questions?technology=${technology1}&technology=${technology2}`).then(resp => {
                resp.json().then(result => setRows(result))
            })
        } else {
            GetAPI(`http://localhost:8000/created_new_questions?technology=${technology1}`).then(resp => {
                resp.json().then(result => setRows(result))
            })
        }

    }
    const onClear = () => {
        setSearchData(pre => ({ technology: [], question_type: [] }))
        setSearchClear(!searchClear)
    }

    const onTableCheckSelect = (data) => {
        const { value, row } = data;
        if (value) {
            setStore(pre => ({
                ...pre, predifineQuestion: {
                    ...pre.predifineQuestion, checkbox_selected_question: checkbox_selected_question.filter(id => {
                        return id != row.id
                    })
                }
            }))
        } else {
            setStore(pre => ({ ...pre, predifineQuestion: { ...pre.predifineQuestion, checkbox_selected_question: [...pre.predifineQuestion.checkbox_selected_question, row.id] } }))
        }
    }
    const onHeaderCheckSelection = (arr) => {
        if (arr.length === 0) {
            setStore(pre => ({ ...pre, predifineQuestion: { ...pre.predifineQuestion, checkbox_selected_question: [] } }))
        } else {
            setStore(pre => ({ ...pre, predifineQuestion: { ...pre.predifineQuestion, checkbox_selected_question: arr } }))
        }
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


            {/* adding new section date 28-07-2023 */}
            {/* <div style={{display:"flex", padding:"0px"}}>
            <Button
                style={{ margin: "10px 0px 10px 10px", padding: "10px", borderRadius: "4px", border: "none", background:"green",color:"white", fontWeight:"bold"}}
                type="button"
                label={'Selected Q. ' + store.predifineQuestion.checkbox_selected_question.length}
            />
            <div style={{paddingTop:"14px"}}><i className="bi bi-trash3" style={{fontSize:"25px",color:"darkRed"}}></i></div>
            </div> */}
            {/* adding new section date 28-07-2023 */}


            <DataTable rows={rows} onClick={onTableCheckSelect} onHeaderCheckSelection={onHeaderCheckSelection} />
        </div>
    )
}

export default memo(PredifineQuestions)