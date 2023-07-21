import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: "ID", width: 100 },
  { field: 'question_title', headerName: 'Question Title', width: 270 },
  { field: 'technology', headerName: 'Technology', width: 130 },
  { field: 'question_type', headerName: 'Question Type', width: 130 },
  { field: 'correct_answar', headerName: 'correct Answar', width: 230 },
];

export default function DataTable({rows,onClick}) {
  return (
    <div className='container-data-table'>
      <div className='data-table'>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10,15,30]}
          checkboxSelection
          onCellClick={(newSelection) => {
             onClick(newSelection.row)
          }}
        />
      </div>
    </div>
  );
}