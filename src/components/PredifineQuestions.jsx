import { Button, Input, Label } from 'form_utility_package'
import React, { memo, useState } from 'react'
import Select from 'react-select'
import { questionTypeOptions, technologyOptions } from './Data'
import CreateNewQuestions from './CreateNewQuestions'
import DataTable from './DataTable'

function PredifineQuestions() {

    const [addQuestion,setAddQuestion]=useState(false)

    return (
        <div className='predifine-question'>
            <div className='container-predifine-question'>
                <div className='same-lavels'>
                    <Label className="labels" label="Total no. of Predifine Questions" />
                    <Input type="number" name="predifine-question" className="input-class" />
                </div>
                <div className='same-lavels'>
                    <Label className="labels" label="Technology" />
                    <Select 
                    options={technologyOptions} 
                    className='select-class' 
                    isMulti
                    />
                </div>
                <div className='same-lavels'>
                    <Label className="labels" label="Questions Type" />
                    <Select
                        defaultValue={[questionTypeOptions[0]]}
                        isMulti
                        name="question-type"
                        options={questionTypeOptions}
                        className="select-class"
                        classNamePrefix="select"
                    />
                </div>
            </div>
            <div className='btn-group'>
                <Button type="button" label="Search" className="btn-predifine-question"/>
                <Button type="button" label="Clear" className="btn-predifine-question"/>
                <Button 
                type="button" 
                label="Add New Questions" 
                className="btn-predifine-question"
                onClick={()=>setAddQuestion(true)}
                />
            </div>
          { addQuestion ? <CreateNewQuestions setAddQuestion={setAddQuestion}/> : <></>}
          <DataTable />
        </div>
    )
}

export default memo(PredifineQuestions)