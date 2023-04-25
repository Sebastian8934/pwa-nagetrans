
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
  // import RegisterRole from "../register-role";
  // import EditRole from "../edit-role";

function GetUser() {

  const [rows, setRows] = useState([]);
  const [createUser, setCreateUser ] = useState(false);
  const [editUser, setEditUser ] = useState(false);
  // const [valuesUser, setValuesUser ] = useState();

  const columns = [
    { field: 'cedula', headerName: 'Cedula', width: 200 , headerAlign:'left' },
    { field: 'nombre', headerName: 'Nombre', width: 200 , headerAlign:'left' },
    { field: 'apellido', headerName: 'Apellido', width: 200 , headerAlign:'left' },
    { field: 'telefono', headerName: 'Telefono', width: 200 , headerAlign:'left' },
    { field: 'usuarioCertificadoDigital', headerName: 'Usuario Certificado Digital', width: 250 , headerAlign:'left' },
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

  const getAllUser = async () => {
    axios.get(`${config.devUrl}user/getAll`).then((response) => {
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
    await getAllUser();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />

        {createUser === true ? (
          // <RegisterRole setCreateRole={setCreateRole} getAllRole={getAllRole} />
          <div>create</div>
        ) : editUser === true ? (
          // <EditRole setEditRole={setEditRole} getAllRole={getAllRole} values={valuesRole} />
          <div>Edit</div>
        ) : (
          <>
            <MDBox mt={2} mb={1} px={3} align="right">
              <MDButton onClick={handleClickSave} variant="gradient" color="info" align="right">
                <Icon>person</Icon>&nbsp;
                Crear usuario
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

export default GetUser
