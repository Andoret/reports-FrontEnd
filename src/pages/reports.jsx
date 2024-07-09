import React, { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar/sidebar";
import { Button, Divider, TextField } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { DataGrid } from '@mui/x-data-grid';
import "../assets/styles/reports.css";
import axios from 'axios'
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { UserContext } from "../context/UserContext";
export default function Reports() {

useEffect(() => {
    
  getData();
  
  }, [])
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [cases,setCases]=useState([])

  const [filteredRows, setFilteredRows] = useState([]);

  const {role,clientId}=useContext(UserContext)

  const getData= async()=>{
    try{
      if (role=="1"){
        const response = await axios.get("http://localhost:3000/cases/all")
        setCases(response.data.response.cases)
        setFilteredRows(response.data.response.cases);
      }else if (role=="2"){
        const response = await axios.get(`http://localhost:3000/cases/clienteid/${clientId}/`)
        setCases(response.data.response.cases)
        setFilteredRows(response.data.response.cases);
      }else{
        console.error(error)
      }
      
      console.log(filteredRows)
      
    }catch(error){
      console.error(error)
    }
  }
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigateTo = (route) => {
    nav(route);
    setOpen(false);
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    if (cases && cases.length > 0) {
      if (searchValue === "") {
        setFilteredRows(cases);
      } else {
        const filteredRows = cases.filter((row) => {
          return row.code_case.toString().includes(searchValue); // Asegurando que code_case se convierta a string si es necesario
        });
        setFilteredRows(filteredRows);
      }
    }
  };

  const columns = [
    { field: 'code_case', headerName: 'Numero de caso', flex: 1 },
    { field: 'response_1', headerName: 'Pregunta 1', flex: 1 },
    { field: 'response_2', headerName: 'Pregunta 2', flex: 1 },
  ];

    const exportData = ()=> {
      
        const csvData = convertToCSV(originalRows);
        downloadCSV(csvData);
    
      };
    const convertToCSV = (array) => {
      const header = Object.keys(array[0]).join(",");
      const rows = array.map(obj => Object.values(obj).join(","));
      return [header, ...rows].join("\n");
    };
    const downloadCSV = (csvData) => {
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
  
  
  return (
    <div className=" indexBodyReports" >
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
        <div className="row  mb-1">
          <div className="container col-10  mw-50" >
            <div className="contReports" style={{ backgroundColor: "#131414", color: "#FFFFFF", border:"1px solid #131414"}}>
              <div className="m-2  ">
                <div className="row" style={{minHeight:"50px", margin:"0"}}>
              <div className="col-10 ">
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
              <div className="col-2 justify-content-center d-flex" style={{ height:"3.8rem",padding:"15px"}}>
                <Button variant="contained" size="small" startIcon={<SimCardDownloadIcon/>} onClick={()=> exportData()}>Exportar</Button>
              </div>
              </div>
              </div>
              <div className="m-2 mb-1">
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
                    border:"1px solid #FFFFFF",
                    fontWeight:"bold"
                  },
                  '& .MuiDataGrid-columnHeaderDraggableContainer': {
                    bgcolor: "#131414",
                    color: "#FFFFFF",
                    padding:"15px",
                    border:"none",
                   
                  },"& .MuiDataGrid-columnHeaderTitle":{
                        fontWeight:"800",
                        fontSize:"105%",
                        margin:"0",
                        padding:"0"
                  },
                  '& .MuiDataGrid-cell': {
                    bgcolor: "#131414",
                    color: "#FFFFFF",
                    border: 'none', 
                    margin:"0",
                    // Cambiar el color del borde de la celda
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
