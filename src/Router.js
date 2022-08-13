import { Grid } from "@mui/material";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Jumbotron } from "reactstrap";
import Home from "./components/Home/Home";
import LoginForm from "./components/login";
import AppLogout from "./components/Logout";
import RegisterForm from "./components/register";
import SideBar from "./components/SideBar";
import CustomTable from "./components/Table";
import ManageUser from "./components/User";
import ViewActivity from "./components/ViewActivity";
import AppNavbar from "./Header/NavBar";
import ProtectedRoute from "./Helpers/ProtectedRoute";

const AppRouter = () => {
  return (
    <Grid>
      <AppNavbar />
      <Grid style={{display:'flex'}}>
       { <SideBar />}
    
       <Grid style ={{width: "100%"}} >
            <Switch>
              <Route path="/" exact>
                <ProtectedRoute component={Home} />
              </Route>
              <Route path="/user" exact>
                <ManageUser/>
              </Route>
              <Route path="/activity" exact>
                <ViewActivity/>
              </Route>
              
              <Route path="/login">
                <LoginForm />
              </Route>
              <Route path="/register">
                <RegisterForm />
              </Route>
              <Route path="/logout">
                <AppLogout />
              </Route>
              <Route path="*" component={() => "404 Not found"} />
            </Switch>
      </Grid>
      </Grid>
      </Grid>
  );
};

export default AppRouter;
