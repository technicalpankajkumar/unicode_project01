import { Label,Input } from 'form_utility_package'
import React, { memo } from 'react'

function CreateOptions({onClick,onChange,index}){
  
    return (
        <div className='create-options'>
            <div className='options'>
                <Label className="lebels" label={`Answer Option ${index+1}`} />
                <Input 
                type="text" 
                name={`option_${index+1}`}
                placeholder="write option" 
                className="input-class" 
                onChange={onChange}
                />
            </div>
            <div className='right-option'>
                <Label label="In Correct" className="labels" />
                <Input type="radio" name="correct_answar" value={`option_${index+1}`} onClick={onClick}/>
            </div>
        </div>
    )

}
export default memo(CreateOptions)