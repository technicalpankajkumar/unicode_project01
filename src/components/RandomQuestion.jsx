import { Input, Label } from 'form_utility_package'
import Select from 'react-select'
import React, { memo, useContext } from 'react'
import { technologyOptions } from './Data'
import { ContextAPI } from './Layout'
import { toast } from 'react-toastify'
function RandomQuestion(){
    const contextApi = useContext(ContextAPI);
    const {numberOfQuestions,randomQueston} =contextApi.store;
    const {random_question} = randomQueston

    const onChange =(e)=>{
        if(e.target.value < 0){
              toast.warn("enter positive number")
        }else {
            if(e.target.value <= Number(numberOfQuestions)){
                contextApi.setStore(pre => ({...pre,randomQueston:{
                    ...pre.randomQueston,[e.target.name]:e.target.value}
                }))
            }else{
                toast.error(" please make sure enter value less or equal of total number of question")
            }
        }
    }
    const onSelect =(name,obj)=>{
        contextApi.setStore(pre => ({...pre,randomQueston:{
            ...pre.randomQueston,[name]:obj.value}
        }))
    }
    return(
        <div className='random-questions'>
            {/* Random Questions */}
            <Label className="labels"  label="Random Question" />
            <Input type="number" name="random_question" value={random_question} className="input-class" onChange={onChange}/>

            {/* Technology */}
            <Label className="labels"  label="Technology" />
            <Select options={technologyOptions} className='select-class'onChange={(obj)=>onSelect('technology',obj)}/>

            {/* Number of MCQ Questions */}
            <Label className="labels"  label="No. of MCQ Question" />
            <Input type="number" name="number_of_mcq_question" className="input-class" onChange={onChange}/>
        </div>
    )
}

export default memo(RandomQuestion)