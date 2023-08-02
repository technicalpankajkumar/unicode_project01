import * as React
 from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ContextAPI } from './Layout';

const columns = [
  { field: 'id', headerName: "ID", width: 100 },
  { field: 'question_title', headerName: 'Question Title', width: 270 },
  { field: 'technology', headerName: 'Technology', width: 130 },
  { field: 'question_type', headerName: 'Question Type', width: 130 },
  {
    field: 'correct_answar', headerName: 'correct Answar', width: 230,
    sortable: false, valueGetter: (params) => {
      return params.row.options?.[params.row.correct_answar]
    }
  },
];

export default function DataTable({ rows }) {
  const contextApi = React.useContext(ContextAPI)

  const onTableCheckSelect = (data) => {
    const { value, row } = data;
    if (value) {
      contextApi.setStore(pre => ({
            ...pre, predifineQuestion: {
                ...pre.predifineQuestion, checkbox_selected_question: contextApi.store.predifineQuestion.checkbox_selected_question.filter(id => {
                    return id != row.id
                })
            }
        }))
    } else {
      contextApi.setStore(pre => ({ ...pre, predifineQuestion: { ...pre.predifineQuestion, checkbox_selected_question: [...pre.predifineQuestion.checkbox_selected_question, row.id] } }))
    }
}

//   const onHeaderCheckSelection = React.useCallback((arr) => {
//     console.log(arr," chal raha hai")
//     // if (arr.length === 0) {
//     //   contextApi.setStore(pre => ({ ...pre, predifineQuestion: { ...pre.predifineQuestion, checkbox_selected_question: [] } }))
//     // } else {
//     //   contextApi.setStore(pre => ({ ...pre, predifineQuestion: { ...pre.predifineQuestion, checkbox_selected_question: arr } }))
//     // }
// },[])

  return (
    <div className='container-data-table'>
      <div className='data-table'>
        <DataGrid
          rows={rows.length === 0 ? [{ id: "!", technology: "No Data Found" }] : rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20]}
          checkboxSelection
          onCellClick={onTableCheckSelect}
          // onRowSelectionModelChange ={onHeaderCheckSelection}
          rowSelectionModel={contextApi.store.predifineQuestion.checkbox_selected_question}
        />
      </div>
    </div>
  );
}