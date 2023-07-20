import { Label, Input } from 'form_utility_package'
import React, { memo } from 'react'

function CreateOptions({localStore, onClick, onChange,onDelete, index , currectAnswer}) {

    return (
        <div className='create-options'>
            <div className='options'>
                <Label className="lebels" label={`Answer Option ${index}`} />
                <Input
                    type="text"
                    name={`option_${index}`}
                    placeholder={`write option-${index}`}
                    //write value
                    value ={localStore.options?.[`option_${index}`]}
                    className="input-class"
                    onChange={onChange}
                />
            </div>
            <div className='right-option'>
                <Label label="In Correct" className="labels" /><br/>
                <div className='d-flex'>
                    <Input
                        type="radio"
                        name="correct_answar"
                        value={`option_${index}`}
                        onClick={onClick}
                        className="check-css"
                        checked={currectAnswer == `option_${index}`}
                        onChange={(e)=> ''}
                    />
                    <i className="bi bi-trash" onClick={()=>onDelete(index,`option_${index}`)}></i>
                </div>
            </div>
        </div>
    )

}
export default memo(CreateOptions)