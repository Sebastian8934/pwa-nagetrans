
  import { useState , useEffect } from "react";
  import axios from "axios";

  // // Material Dashboard 2 React components
  import MDInput from "components/MDInput";
  import MDButton from "components/MDButton";
  import MDBox from "components/MDBox";

  // // Material Dashboard 2 React example components
  import Card from "@mui/material/Card";

  // import confit
  import config from 'config/config'

function EditRole(props) {

  const [id, setId] = useState();
  const [name, setName] = useState("");

  const handleReturn = async () => {
    props.setEditRole(false);
    await props.getAllRole();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${config.devUrl}role/${id}`, {
        name: name
      }).then((response) => {
        alert(response.statusText);
      });
  }

  useEffect(async () => {
    setId(props.values._id);
    setName(props.values.name);
  }, []);

  return (
    <MDBox mt={10} mb={10} px={3} align="center">
      <Card style={{ width:"50%" }}>

        <MDBox mt={4} mb={1} px={3} align="left">
          <MDButton onClick={handleReturn} variant="gradient" color="info">
            Volver
          </MDButton>
        </MDBox>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox onSubmit={handleSubmit} component="form" role="form">
            <MDBox mb={2}>
              <MDInput value={name} type="text" label="name" fullWidth onChange={e => setName(e.target.value)} />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Guardar
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>

      </Card>
    </MDBox>
  )
}

export default EditRole