import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar/sidebar";
import { Button, Divider, TextField } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { DataGrid } from '@mui/x-data-grid';
import "../assets/styles/reports.css";

export default function Reports() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const originalRows = [
    { id: 1, caseNumber: '123132123', pregunta1: 'Pregunta 1', pregunta2: 'Pregunta 2' },
    { id: 2, caseNumber: '1231245', pregunta1: 'Pregunta 1', pregunta2: 'Pregunta 2' },
    { id: 3, caseNumber: '1231ster', pregunta1: 'Pregunta 1', pregunta2: 'Pregunta 2' },
    { id: 4, caseNumber: '1231', pregunta1: 'Pregunta 1', pregunta2: 'Pregunta 2' },
    { id: 5, caseNumber: '1231ryen', pregunta1: 'Pregunta 1', pregunta2: 'Pregunta 2' },
    { id: 6, caseNumber: '1231andre', pregunta1: 'Pregunta 1', pregunta2: 'Pregunta 2' },
    { id: 7, caseNumber: '1231ord', pregunta1: 'Pregunta 1', pregunta2: 'Pregunta 2' },
    { id: 8, caseNumber: '1231es', pregunta1: 'Pregunta 1', pregunta2: 'Pregunta 2' },
    { id: 9, caseNumber: '1231', pregunta1: 'Pregunta 1', pregunta2: 'Pregunta 2' },
  ];

  const [filteredRows, setFilteredRows] = useState(originalRows);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigateTo = (route) => {
    nav(route);
    setOpen(false);
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    if (searchValue === "") {
      setFilteredRows(originalRows);
    } else {
      const filteredRows = originalRows.filter((row) => {
        return row.caseNumber.includes(searchValue);
      });
      setFilteredRows(filteredRows);
    }
  };

  const columns = [
    { field: 'caseNumber', headerName: 'Numero de caso', flex: 1 },
    { field: 'pregunta1', headerName: 'Pregunta 1', flex: 1 },
    { field: 'pregunta2', headerName: 'Pregunta 2', flex: 1 },
  ];

  return (
    <div className="app indexBody p-3" style={{ backgroundColor: "#131414", color: "#FFFFFF" }}>
      <section>
        <div className="row d-flex align-items-center mb-3">
          <Sidebar
            open={open}
            toggleDrawer={toggleDrawer}
            navigateTo={navigateTo}
            sx={{
              bgcolor: "#131414",
              color: "#FFFFFF",
            }}
          />
        </div>
        <div className="row">
          <div className="container col-10 mt-4">
            <div className="contReports" style={{ backgroundColor: "#131414", color: "#FFFFFF" }}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Buscar..."
                value={searchText}
                onChange={(e) => requestSearch(e.target.value)}
                sx={{
                  input: { color: "#FFFFFF" },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#FFFFFF',
                    },
                    '&:hover fieldset': {
                      borderColor: '#FFFFFF',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FFFFFF',
                    },
                  },
                }}
              />
              <DataGrid
                rows={filteredRows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                sx={{
                  bgcolor: "#131414",
                  color: "#FFFFFF",
                  '& .MuiDataGrid-columnHeaders': {
                    bgcolor: "#131414",
                    color: "#FFFFFF",
                  },
                  '& .MuiDataGrid-cell': {
                    bgcolor: "#131414",
                    color: "#FFFFFF",
                  },
                  '& .MuiDataGrid-row': {
                    '&:nth-of-type(even)': {
                      bgcolor: "#1E1E1E",
                    },
                  },
                  '& .MuiDataGrid-footerContainer': {
                    bgcolor: "#131414",
                    color: "#FFFFFF",
                  },
                  '& .MuiTablePagination-root': {
                    color: "#FFFFFF",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
