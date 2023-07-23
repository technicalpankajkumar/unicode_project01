import { Input, Label } from 'form_utility_package'
import Select from 'react-select'
import React, { memo, useContext, useEffect } from 'react'
import { technologyOptions } from './Data'
import { ContextAPI } from './Layout'
import { toast } from 'react-toastify'
function RandomQuestion() {
    const contextApi = useContext(ContextAPI);
    const { numberOfQuestions, randomQueston,radioValue } = contextApi.store;
    const { random_question, number_of_mcq_question , technologies} = randomQueston

    useEffect(()=>{
          //set predifine question value remaing value
          let remainingValue = Number(numberOfQuestions) - Number(random_question)
          contextApi.setStore(pre => ({...pre,predifineQuestion:{...pre.predifineQuestion,total_question: remainingValue}}))

          if(Number(number_of_mcq_question) === 0 || radioValue === 'mcq')
          contextApi.setStore(pre => ({...pre,randomQueston:{...pre.randomQueston,number_of_mcq_question: random_question}}))

    },[random_question,radioValue])


    const onChange = (e) => {
        if (e.target.value < 0) {
            toast.warn("please add value grater then 0 !")
        } else {
            let reduceQuestion = (String(e.target.name) == 'number_of_mcq_question') ? Number(random_question) : Number(numberOfQuestions);

            if (e.target.value <= reduceQuestion) {
                contextApi.setStore(pre => ({
                    ...pre, randomQueston: {
                        ...pre.randomQueston, [e.target.name]: e.target.value
                    }
                }))
            } else {
                toast.error(`please make sure value is ${e.target.name} less then question ! `)
            }
        }
    }

    //select option logic for random question
    const onSelect = (name, obj) => {
        contextApi.setStore(pre => ({
            ...pre, randomQueston: {
                ...pre.randomQueston, [name]: obj
            }
        }))
    }
    return (
        <div className='random-questions'>
            {/* Random Questions */}
            <Label className="labels" label="Random Question" />
            <Input
                type="number"
                name="random_question"
                value={random_question}
                className="input-class"
                onChange={onChange}
            />

            {/* Technology */}
            <Label className="labels" label="Technology" />
            <Select
                isMulti
                value={technologies}
                options={technologyOptions}
                className='select-class'
                onChange={(obj) => onSelect('technologies', obj)}
            />

            {/* Number of MCQ Questions */}
            {
            radioValue !== 'mcq' && <>
            <Label className="labels" label="No. of MCQ Question" />
            <Input
                type="number"
                name="number_of_mcq_question"
                value={number_of_mcq_question}
                className="input-class"
                onChange={onChange}
            />
            </>
            }
        </div>
    )
}

export default memo(RandomQuestion)