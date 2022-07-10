import React from "react";
import './sidebar.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBriefcase,
    faPaperPlane,
    faQuestion,
    faImage,
    faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import SubMenu from "./SubMenu";
import { connect } from "react-redux";
import isAuthenticated from "../../Helpers/auth";

const SideBar = ({ isOpen, toggle ,userAuthenticate }) => {
 
    return (
        <>
    {(userAuthenticate  || isAuthenticated()) ? <div className={classNames("sidebar", { "is-open": isOpen })}>
        <div className="sidebar-header">
            <span color="info" onClick={toggle} style={{ color: "#fff" }}>
                &times;
            </span>
            <h3>Compliance Project</h3>
        </div>
        <div className="side-menu">
            <Nav vertical className="list-unstyled pb-3">
                {/* <SubMenu title="Home" icon={faHome} items={submenus[0]} /> */}
                <NavItem>
                    <NavLink tag={Link} to={"/"}>
                        <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                        Home
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={"/user"}>
                        <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                        Manage User
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={"/activity"}>
                        <FontAwesomeIcon icon={faImage} className="mr-2" />
                        View Activity
                    </NavLink>
                </NavItem>

            </Nav>
        </div>
    </div>:  null}
    </>
    )
}

const submenus = [
    [
        {
            title: "Home 1",
            target: "/",
        },
        {
            title: "Home 2",
            target: "Home-2",
        },
        {
            itle: "Home 3",
            target: "Home-3",
        },
    ],
    [
        {
            title: "Page 1",
            target: "Page-1",
        },
        {
            title: "Page 2",
            target: "Page-2",
        },
    ],
];
const mapStateToProps = (state) => ({
    user: state.user.user,
    userAuthenticate: state?.user?.isAuthenticated,
    success: state.user.success,
    loading: state.user.loading,
    status: state.user.status,
    compliance: state.compliance
});

const mapDispatchToProps = () => (dispatch) => ({
    getCompliance: () => dispatch(getCompliance()),
});

export default connect(mapStateToProps, mapDispatchToProps )(SideBar);

