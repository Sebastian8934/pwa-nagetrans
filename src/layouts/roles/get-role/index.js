
  import React, { useState, useEffect } from "react";
  import axios from "axios";

  // import confit
  import config from 'config/config'

  // @mui material components
  import Icon from "@mui/material/Icon";
  import { DataGrid } from '@mui/x-data-grid';

  // Material Dashboard 2 React components
  import MDBox from "components/MDBox";
  import MDButton from "components/MDButton";

  // Material Dashboard 2 React example components
  import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
  import DashboardNavbar from "examples/Navbars/DashboardNavbar";
  import Footer from "examples/Footer";
  import RegisterRole from "../register-role";
  import EditRole from "../edit-role";

function GetRole() {

  const [rows, setRows] = useState([]);
  const [createRole, setCreateRole ] = useState(false);
  const [editRole, setEditRole ] = useState(false);
  const [valuesRole, setValuesRole ] = useState();

  const columns = [
    { field: 'name', headerName: 'Name', width: 100 , headerAlign:'center' },
    { field: 'edit', headerName: 'Edit', width: 150 , headerAlign:'center' ,
        renderCell: (cellValues) => {
          return (
            <MDBox>
              <MDButton onClick={ (event) => { handleClickEdit(event, cellValues) } } variant="gradient" color="success">
                <Icon>person</Icon>&nbsp;
                Editar
              </MDButton>
            </MDBox>
          );
        }  
    },
    { field: 'delete', headerName: 'Delete', width: 150 , headerAlign:'center' ,
        renderCell: (cellValues) => {
          return (
            <MDBox>
              <MDButton onClick={ (event) => { handleClickDelete(event, cellValues) } } variant="gradient" color="error">
                <Icon>person</Icon>&nbsp;
                Eliminar
              </MDButton>
            </MDBox>
          );
        } 
    },
  ];

  const getAllRole = async () => {
    axios.get(`${config.devUrl}role/`).then((response) => {
      setRows(response.data.data);
    });
  } 

  const handleClickSave = async (event) => {
    setCreateRole(true);
  }

  const handleClickEdit = (event, cellValues) => {
    setValuesRole(cellValues.row);
    setEditRole(true);
  };

  const handleClickDelete = async (event, cellValues) => {
    if (window.confirm('Estas seguro que deseas eliminar este rol ?')) {
      axios
      .delete(`${config.devUrl}role/${cellValues.id}`)
      .then(() => {
        alert("Eliminado con Exito");
        getAllRole();
      });
    }
  };

  useEffect(async () => {
    await getAllRole();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />

        {createRole === true ? (
          <RegisterRole setCreateRole={setCreateRole} getAllRole={getAllRole} />
        ) : editRole === true ? (
          <EditRole setEditRole={setEditRole} getAllRole={getAllRole} values={valuesRole} />
        ) : (
          <>
            <MDBox mt={2} mb={1} px={3} align="right">
              <MDButton onClick={handleClickSave} variant="gradient" color="info" align="right">
                <Icon>person</Icon>&nbsp;
                Crear Roles
              </MDButton>
            </MDBox>
            <MDBox mt={2} mb={1} px={3}>
              <div style={{ height: 800, width: '100%' }}>
                <DataGrid
                  getRowId={(row) => row._id}
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  sx={{
                    // boxShadow: 2,
                    // '& .MuiDataGrid-cell:hover': {
                    //   color: '#2196f3'
                    // },
                    // '& .super-app-theme--header': {
                    //   backgroundColor: 'rgba(255, 7, 0, 0.55)',
                    // }
                  }}
                  />
              </div>
            </MDBox>
          </>
        )}

      <Footer />
    </DashboardLayout>
  )
}

export default GetRole
