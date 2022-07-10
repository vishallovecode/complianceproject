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
import AppNavbar from "./Header/NavBar";
import ProtectedRoute from "./Helpers/ProtectedRoute";

const AppRouter = () => {
  return (
    <>
      <AppNavbar />
      <div style={{ display: 'flex' }}>
       { <SideBar />}
    
       <Container className="d-flex flex flex-column align-items-center">
        <Jumbotron className="d-flex flex flex-column col-sm-12 my-5 py-0 align-items-center">
            <Switch>
              <Route path="/" exact>
                <ProtectedRoute component={Home} />
              </Route>
              <Route path="/user" exact>
                {/* <ProtectedRoute component={Home} /> */}
                <ManageUser/>
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
            </Jumbotron>
      </Container>
      </div>
    </>
  );
};

export default AppRouter;
