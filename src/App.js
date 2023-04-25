
import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

// context
import { AuthGuard } from "./guards/auth.guard";

// routes
import { PublicRoutes } from './models/routes';

// pages
import SignIn from "./layouts/authentication/sign-in";
import SignUp from "./layouts/authentication/sign-up";
import Private from "layouts/private";

  export default function App() {

  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return ( 
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />
          <Routes>
            <Route path="/" element={<Navigate to={PublicRoutes.signIn} />} />
            <Route path={PublicRoutes.signIn} element={<SignIn />} />
            <Route path={PublicRoutes.SignUp} element={<SignUp />} />
            <Route element={<AuthGuard/>}>
              <Route path={`/*`} element={<Private 
                  color={sidenavColor} 
                  brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite} 
                  brandName={"GSE"} 
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                  />} />
            </Route>
            <Route path="*" element={<Navigate to={PublicRoutes.signIn} />} />
          </Routes>
      </ThemeProvider>
  );  
}