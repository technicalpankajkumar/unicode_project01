import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: "ID", width: 100 },
  { field: 'question_title', headerName: 'Question Title', width: 270 },
  { field: 'question_level', headerName: 'Question Lavel', width: 230 },
  { field: 'technology', headerName: 'Technology', width: 130 },
  { field: 'question_type', headerName: 'Question Type', width: 130 },
];

const rows = [
  { id: 1, question_title: "title", technology: `React`, question_level: 'beginer', question_type: 'mcq' },
  { id: 2, question_title: "title", technology: `React`, question_level: 'beginer', question_type: 'mcq' },
  { id: 3, question_title: "title", technology: `React`, question_level: 'beginer', question_type: 'mcq' },
  { id: 4, question_title: "title", technology: `React`, question_level: 'beginer', question_type: 'mcq' },
  { id: 5, question_title: "title", technology: `React`, question_level: 'beginer', question_type: 'mcq' },
  { id: 6, question_title: "title", technology: `React`, question_level: 'beginer', question_type: 'mcq' },
  { id: 7, question_title: "title", technology: `React`, question_level: 'beginer', question_type: 'mcq' },
  { id: 8, question_title: "title", technology: `React`, question_level: 'beginer', question_type: 'mcq' },
  { id: 9, question_title: "title", technology: `React`, question_level: 'beginer', question_type: 'mcq' },
];

export default function DataTable() {
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
        />
      </div>
    </div>
  );
}