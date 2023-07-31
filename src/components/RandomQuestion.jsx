import { Input, Label } from 'form_utility_package'
import Select from 'react-select'
import React, { memo, useContext, useEffect } from 'react'
import { technologyOptions } from './Data'
import { ContextAPI } from './Layout'
import { toast } from 'react-toastify'

function RandomQuestion() {
    const contextApi = useContext(ContextAPI);

    const { numberOfQuestions, randomQueston, radioValue } = contextApi.store;
    const { random_question, no_of_descriptive_question, no_of_programming_question, technologies, } = randomQueston

    useEffect(() => {
        //set predifine question value remaing value
        let remainingValue = Number(numberOfQuestions) - Number(random_question)

        contextApi.setStore(pre => ({
            ...pre, predifineQuestion: {
                ...pre.predifineQuestion, total_question: remainingValue
            }
        }))

        if (radioValue === 'yes') {

            //this is depend on random_question state
            contextApi.setStore(pre => ({
                ...pre, randomQueston: {
                    ...pre.randomQueston,
                    no_of_mcq_question: random_question
                }
            }))
        }
        else {
            contextApi.setStore(pre => ({
                ...pre, randomQueston: {
                    ...pre.randomQueston,
                    no_of_mcq_question: 0
                }
            }))
        }

    }, [random_question, radioValue, numberOfQuestions])  //remove dependecy no_of_mcq_question


    const onChange = (e) => {
        let { name, value } = e.target;
console.log(Boolean(value), "--------")
        if (value < 0) {
            toast.warn("please add value grater then 0 !")
        } else {
            // expected values random_question, no_of_programming_question, 'no_of_descriptive_question'
            //validate or setState of random_question
            if (name === 'random_question') {
                if (value <= Number(numberOfQuestions)) {
                    contextApi.setStore(pre => ({
                        ...pre, randomQueston: {
                            ...pre.randomQueston, [name]: value
                        }
                    }))
                    contextApi.setStore(pre => ({
                        ...pre, randomQueston: {
                            ...pre.randomQueston, no_of_descriptive_question: 0, no_of_programming_question: 0
                        }
                    }))
                }
                else {
                    toast.warn(`please enter value less or equal to total number of question! `)
                }
            }
            // validate of setState no_of_programming_question or no_of_descriptive_question 
            else if (('no_of_programming_question' === name && value <= Number(random_question)) || ('no_of_descriptive_question' === name && value <= Number(random_question))) {

                // checking value or programing - descriptive
                if (name === 'no_of_programming_question') {
                    contextApi.setStore(pre => ({
                        ...pre, randomQueston: {
                            ...pre.randomQueston, [name]: value, no_of_descriptive_question: random_question - value 
                        }
                    }))
                } else if (name === 'no_of_descriptive_question') {
                    contextApi.setStore(pre => ({
                        ...pre, randomQueston: {
                            ...pre.randomQueston, [name]: value, no_of_programming_question: random_question - value 
                        }
                    }))
                }
            } else {
                toast("please first choose random Q. value")
            }

        }

    }

    //select option logic for random question
    const onSelect = (name, obj) => {
        contextApi.setStore(pre => ({
            ...pre, randomQueston: {
                ...pre.randomQueston, [name]: obj
            }
        }
        ))
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
                radioValue !== 'yes'
                &&
                // technologies.map((data, index) => {
                //     return 
                <div style={{ display: "flex" }}>
                    <span style={{ margin: "0px 4px 0px 0px" }}>
                        <Label className="labels" label="No. of Programming Question" />
                        <Input
                            type="number"
                            name="no_of_programming_question"
                            value={no_of_programming_question}
                            className="input-class"
                            onChange={onChange}
                        // title={"Programming Q. "+data.label}
                        />
                    </span>
                    <span style={{ margin: "0px 0px 0px 4px" }}>
                        <Label className="labels" label="No. of Descriptive Question" />
                        <Input
                            type="number"
                            name="no_of_descriptive_question"
                            value={no_of_descriptive_question}
                            className="input-class"
                            onChange={onChange}
                        // title={"Descriptive Q. "+data.label}

                        />
                    </span>
                </div>
                // })
            }
        </div>
    )
}

export default memo(RandomQuestion)