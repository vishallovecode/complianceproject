import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, NavLink } from "reactstrap";
import PropTypes from "prop-types";
import StatusMessage from "../../Helpers/StatusMessage";
import { Link } from "react-router-dom";

const RegisterForm = ({
  registerUser,
  removeMessage,
  loading,
  success,
  status
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [founderName ,setFounderName] = useState("");
  const [phone , setUserPhone] = useState("");
  const [companyName , setCompanyName] = useState("");
  const [CIN ,setCIN] = useState("");
  const [GST , setGST] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      companyName:companyName,
      CIN: CIN,
      GST: GST,
      founderName: founderName,
      phone: phone
    });
  };

  return (
    <div className="col-md-6 col-sm-12">
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mt-5">
          <Label>
            <h3>Register here!</h3>
          </Label>
        </FormGroup>
        <div className="text-left">
          <FormGroup>
            <Label for="registerFirstName">First name</Label>
            <Input
              tabIndex={1}
              type="text"
              name="firstName"
              id="registerFirstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="registerLastName">Last Name</Label>
            <Input
              tabIndex={2}
              type="text"
              name="lastName"
              id="registerLastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="registerEmail">Email</Label>
            <Input
              tabIndex={4}
              type="email"
              name="email"
              id="registerEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input
              tabIndex={4}
              type="text"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="founderName">Founder Name</Label>
            <Input
              tabIndex={5}
              type="text"
              name="founderName"
              id="founderName"
              value={founderName}
              onChange={(e) => setFounderName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="companyName">Company Name</Label>
            <Input
              tabIndex={6}
              type="text"
              name="companyName"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="CIN">Company CIN</Label>
            <Input
              tabIndex={6}
              type="text"
              name="CIN"
              id="CIN"
              value={CIN}
              onChange={(e) => setCIN(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="GST">Company GST</Label>
            <Input
              tabIndex={6}
              type="text"
              name="GST"
              id="GST"
              value={GST}
              onChange={(e) => setGST(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="registerPassword">Password</Label>
            <Input
              tabIndex={5}
              type="password"
              name="password"
              id="registerPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="text-center">
            <StatusMessage
              loading={loading}
              success={success}
              status={status}
            />
          </FormGroup>
          <FormGroup className="text-center col-12 d-flex flex flex-column align-items-center">
            <Button
              tabIndex={6}
              color="primary"
              className="col-md-6 col-sm-12 mt-3"
              onClick={handleSubmit}
              disabled={loading}
            >
              <i class="bi bi-binoculars"></i>
              {loading ? "Registering..." : "Register Now!"}
            </Button>
            <NavLink>
              <Link to="/login">Click Login</Link>
            </NavLink>
          </FormGroup>
        </div>
      </Form>
    </div>
  );
};

RegisterForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  removeMessage: PropTypes.func.isRequired
};

export default RegisterForm;
