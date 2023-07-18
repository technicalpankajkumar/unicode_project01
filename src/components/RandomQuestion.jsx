import { Input, Label } from 'form_utility_package'
import Select from 'react-select'
import React, { memo } from 'react'
import { technologyOptions } from './Data'

function RandomQuestion(){

    return(
        <div className='random-questions'>
            {/* Random Questions */}
            <Label className="labels"  label="Random Question" />
            <Input type="number" name="random-question" className="random-question-input" />

            {/* Technology */}
            <Label className="labels"  label="Technology" />
            <Select options={technologyOptions} className='technology-type-select'/>

            {/* Number of MCQ Questions */}
            <Label className="labels"  label="No. of MCQ Question" />
            <Input type="number" name="number-of-mcq-question" className="input-class"/>
        </div>
    )
}

export default memo(RandomQuestion)