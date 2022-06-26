import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Jumbotron } from "reactstrap";
import LoginForm from "./components/login";
import AppLogout from "./components/Logout";
import RegisterForm from "./components/register";
import AppNavbar from "./Header/NavBar";
import ProtectedRoute from "./Helpers/ProtectedRoute";

const AppRouter = () => {
  return (
    <>
      <AppNavbar />
      <Container className="d-flex flex flex-column align-items-center">
        <Jumbotron className="d-flex flex flex-column col-sm-12 my-5 py-0 align-items-center">
          <Switch>
            <Route path="/" exact>
              {/* <ProtectedRoute component={Home} /> */}
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
    </>
  );
};

export default AppRouter;
