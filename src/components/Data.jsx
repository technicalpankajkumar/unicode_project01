 const testTypeOptions = [
    { value: "react_test", label: "React Test" },
    { value: "java_test", label: "Java Test" },
    { value: "coding_round", label: "Coding Round" },
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
    {value:"yes", label:"YES",className:"radio",checked:true},
    {value:"no", label:"NO",className:"radio"},
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
export {testTypeOptions,managedByOption,screeningTypeOptions,radioOptions,technologyOptions,questionTypeOptions}