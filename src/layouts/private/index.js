
  import { useEffect, useState } from "react";

  // react-router components
  import { Routes , Route , Navigate } from 'react-router-dom';

  // Material Dashboard 2 React example components
  import Sidenav from "examples/Sidenav";

  // Material Dashboard 2 React routes
  import validateRol from "routes";

export const Private = (props) => {

  const [sidenav, setSidenav] = useState();
  const [getAllRoutes, setGetAllRoutes] = useState();

  // este hook solo se ejecutara una vez 
  useEffect(async () => {

    const rol = JSON.parse(sessionStorage.getItem("userInfo")).role[0].name;
    const routes = await validateRol(rol);
   
    // Creacion de las rutas
    const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });

    //Creacion del sidenav
    const createSidenav = (routes) => {
      setSidenav(<Sidenav color={props.color} brand={props.brand} brandName={props.brandName} routes={routes} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} /> );
    }

    setGetAllRoutes(getRoutes(routes));
    createSidenav(routes);
  } , []);

    return (
      <> 
        {sidenav}
        <Routes>
          {getAllRoutes}
          <Route path="*" element={<Navigate to="/profile" />} />
        </Routes>
      </>
    )
}
export default Private;