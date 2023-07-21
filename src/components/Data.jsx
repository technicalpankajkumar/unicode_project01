 const testTypeOptions = [
    { value: "xyz", label: "XYZ" },
    { value: "chocolate", label: "Chocolate" },
]
 const managedByOption= [
    { value: "user", label: "User" },
    { value: "agent", label: "Agent" },
]
const screeningTypeOptions =[
    {value:"pre-interview", label:"Pre Interview"},
    {value:"post-interview", label:"Post Interview"},
]

const radioOptions = [
    {value:"mcq", label:"MCQ",className:"radio",checked:true},
    {value:"all", label:"All",className:"radio"},
]
const radioOptions2 = [
    {value:"mcq", label:"MCQ",className:"radio"},
    {value:"all", label:"All",className:"radio"},
]

const technologyOptions=[
    {value:"react_js",label:"React JS"},
    {value:"java",label:"Java"},
    {value:"python",label:"Python"},
]
const questionTypeOptions = [
    {value:"mcq",label:"MCQ"},
    {value:"programming",label:"Programming"},
    {value:"descriptive",label:"Descriptive"},
]
export {testTypeOptions,managedByOption,screeningTypeOptions,radioOptions,radioOptions2,technologyOptions,questionTypeOptions}