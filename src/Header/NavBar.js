import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import isAuthenticated from "../Helpers/auth";
import { getCompliance } from "../redux/actions";

const AppNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => setIsOpen(!isOpen);
  useEffect(()=>{
    props.getCompliance()
  },[])
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand>
        <Link>Compliances</Link>
      </NavbarBrand>
      <NavbarToggler onClick={toggleNav} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          {/* {!isAuthenticated ? (
            <>
              <NavItem>
                <NavLink>
                  <Link to="/login">Login</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to="/register">Register</Link>
                </NavLink>
              </NavItem>
            </>
          ) : (
            <NavItem>
              <NavLink>
                <Link to="/">Home</Link>
              </NavLink>
            </NavItem>
          )} */}
        </Nav>
        {isAuthenticated() && (
          <NavLink>
            <Link to="/logout">Logout</Link>
          </NavLink>
        )}
      </Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user?.isAuthenticated
});
const mapDispatchToProps = () => (dispatch) => ({
  getCompliance: () => dispatch(getCompliance()),
});


export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);

