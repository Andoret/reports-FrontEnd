import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar/sidebar";
import { Button, Divider, TextField } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { DataGrid } from '@mui/x-data-grid';
import "../assets/styles/reports.css";
import axios from 'axios'


export default function Register() {

useEffect(() => {
    
  getData();
  }, [])
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");


  const getData= async()=>{
    try{
      const response = await axios.get("http://localhost:3000/cases/all")
      console.log(response.data.response)
    }catch(error){
      console.error(error)
    }
  }


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
        <div className="row mt-5">
          <div className="container col-10 mt-4">
            <div className="contReports" style={{ backgroundColor: "#131414", color: "#FFFFFF", border:"1px solid #131414"}}>
              <div className="m-2">
              <TextField
                style={{border:"1px solid #131414"}}
                variant="outlined"
                fullWidth
                placeholder="Buscar..."
                value={searchText}
                onChange={(e) => requestSearch(e.target.value)}
                sx={{
                  input: { color: "#FFFFFF" },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#5D5D5D',
                    },
                    '&:hover fieldset': {
                      borderColor: '#5D5D5D',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#5D5D5D',
                    },
                    
                  },
                  border:"1px solid #5D5D5D",
                }}
              />
              </div>
              <div className="m-2 vh-50  ">
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
                  border: "1px",
                  svg:{
                    fill:"white"
                  },
                  '& .MuiDataGrid-columnHeader': {
                    bgcolor: "#131414",
                    color: "#FFFFFF",
                    padding:"0",
                    margin:"0",
                   
                    border:"1px solid #FFFFFF"
                  },
                  '& .MuiDataGrid-columnHeaderDraggableContainer': {
                    bgcolor: "#131414",
                    color: "#FFFFFF",
                    padding:"15px",
                    border:"none"
                   
                  },
                  '& .MuiDataGrid-cell': {
                    bgcolor: "#131414",
                    color: "#FFFFFF",
                    border: 'none', // Cambiar el color del borde de la celda
                  },
                  '& .MuiDataGrid-row': {
                    '&:nth-of-type(even)': {
                      bgcolor: "blue",
                    },
                    '& .MuiDataGrid-cell': {
                      border: '1px solid 	#5D5D5D', // Cambiar el color del borde de la fila
                    }
                  },
                  '& .MuiDataGrid-footerContainer': {
                    bgcolor: "#131414",
                    color: "#FFFFFF",
                    border :"none"
                  },
                  '& .MuiTablePagination-root': {
                    color: "#FFFFFF",
                  }
                }}
              />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
