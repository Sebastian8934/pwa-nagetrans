  import { useState } from "react";

  // react-router-dom components
  import { Link , useNavigate } from "react-router-dom";

  // @mui material components
  import Card from "@mui/material/Card";
  import Switch from "@mui/material/Switch";
  import Grid from "@mui/material/Grid";
  import MuiLink from "@mui/material/Link";

  // @mui icons
  import FacebookIcon from "@mui/icons-material/Facebook";
  import GitHubIcon from "@mui/icons-material/GitHub";
  import GoogleIcon from "@mui/icons-material/Google";

  // Material Dashboard 2 React components
  import MDBox from "components/MDBox";
  import MDTypography from "components/MDTypography"; 
  import MDInput from "components/MDInput";
  import MDButton from "components/MDButton";

  // Authentication layout components
  import BasicLayout from "layouts/authentication/components/BasicLayout";

  // Images
  import bgImage from "assets/images/bg-sign-in-basic.jpeg";

  // Routes private
  import { PrivateRoutes } from '../../../models/routes';

  // Middleware
  import auth from "middleware/auth";

  // pwa
  import { useReactPWAInstall } from "react-pwa-install";

  // logo
  import myLogo from "../../../assets/images/apple-icon.png";

function Basic() {

  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await auth.login(username , password);
    if(response.code === 200){
      sessionStorage.setItem('userInfo',JSON.stringify(response.data.data));
      navigate(`/${PrivateRoutes.PRIVATE}`);
    } else {
      setMessage(true);
    }
  };

  const handleClick = () => {
    pwaInstall({
      title: "Install Web App",
      logo: myLogo,
      features: (
        <ul>
          <li>Cool feature 1</li>
          <li>Cool feature 2</li>
          <li>Even cooler feature</li>
          <li>Works offline</li>
        </ul>
      ),
      description: "This is a very good app that does a lot of useful stuff. ",
    })
      .then(() => alert("App installed successfully or instructions for install shown"))
      .catch(() => alert("User opted out from installing"));
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox onSubmit={handleSubmit} component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="User" fullWidth onChange={e => setUserName(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth onChange={e => setPassword(e.target.value)} />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            {message === true && (
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="error">
                  Usuario o contraseñas incorrectos
                </MDTypography>
              </MDBox>
            )}  
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
              <MDButton onClick={handleClick} variant="gradient" color="info" fullWidth>
                install
                {/* <div>
                  {supported() && !isInstalled() && (
                    <button type="button" onClick={handleClick}>
                      Install App
                    </button>
                  )}
                </div> */}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
