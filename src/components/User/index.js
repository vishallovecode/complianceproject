
import React from 'react';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Label, FormGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Multiselect from 'multiselect-react-dropdown';
import { createUser, getUsers } from '../../redux/actions';
import CustomTable from '../Table';
import './user.scss'

const ManageUser = (props) => {
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [roles, setRoles] = useState([]);
    const [complinaces, setCompliances] = useState([])
    const [openD, setOpenDropDown] = useState(false)
    const [selectedUser, setSelectedUser] = useState('');
    const [rolesList] = useState([
        { id: 1, name: 'REVIEWER' },
        { id: 2, name: 'EDITOR' },
        { id: 3, name: 'ADMIN' }
    ])
    const [editMode, setEditModeOn] = useState(false)
    useEffect(() => {
        props.getUsers()
    }, [])
    const onSelect = (data) => {
        setRoles(data)
    }
    const onRemove = (data) => {
        setRoles(data)
    }
    const onSelectC = (data) => {
        setCompliances(data)
    }
    const onRemoveC = (data) => {
        setCompliances(data)
    }

    const openModal = () => {
        if (openModal) {
            setEditModeOn(false)
        }
        setOpen(!open)
    }
    const submit = () => {
        props.createUser({
            firstName,
            lastName,
            email, phone,
            roles: roles.map((item) => item.name),
            complinaces: complinaces?.map(c => c._id)
        })
    }
    const data = props.compliance?.data?.length ? props.compliance : [
        {
            "firstName": "Shivam",
            "lastName": "Rai",
            "email": "shivam@yopmail.com",
            "autoGenPass": "gyMtW7Is",
            "phone": "48324843895",
            "company": "62c5cfee5d0d20a4dec79106",
            "roles": [
                "REVIEWER",
                "OWNER"
            ],
            "compliances": [
                "62c5c7573c9f3bf57fb35a34",
                "62c5c76f3c9f3bf57fb35a36"
            ]
        }

    ]
    const onEdit = (data) => {
        setSelectedUser(data);
        setEditModeOn(true);
        setOpen(true);
    }
    const onDelete = () => {

    }
    return (
        <div className="user">
            <div className="header">
                <h3 className='title'>Manage Users</h3>
                <Button color="primary" className='button' onClick={openModal}>Add User</Button>
            </div>
            <CustomTable data={data} onEdit={onEdit} onDelete={onDelete} />
            <Modal isOpen={open} toggle={openModal} className={props.className}>
                <ModalHeader toggle={openModal}>{`${editMode ? 'Edit' : 'Add'} Users`}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="loginUser">First Name</Label>
                            <Input
                                tabIndex={1}
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={editMode ? selectedUser.firstName : firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="loginUser">Last Name</Label>
                            <Input
                                tabIndex={2}
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={editMode ? selectedUser.lastName : lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="loginUser">Email</Label>
                            <Input
                                tabIndex={3}
                                type="text"
                                id="email"
                                name="email"
                                value={editMode ? selectedUser.email : email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="loginUser">Phone</Label>
                            <Input
                                tabIndex={4}
                                type="text"
                                id="phone"
                                name="phone"
                                value={editMode ? selectedUser.phone : phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="loginUser">Select Role</Label>

                            <Multiselect
                                options={rolesList} // Options to display in the dropdown
                                selectedValues={selectedUser?.roles?.map((item, index) => {
                                    return {
                                        name: item, id: index
                                    }
                                })} // Preselected value to persist in dropdown
                                onSelect={onSelect} // Function will trigger on select event
                                onRemove={onRemove} // Function will trigger on remove event
                                displayValue="name" // Property name to display in the dropdown options
                                showCheckbox={true}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="loginUser">Select Compliance</Label>

                            <Multiselect
                                options={props?.compliance?.data} // Options to display in the dropdown
                                selectedValues={complinaces}  // Preselected value to persist in dropdown
                                onSelect={onSelectC} // Function will trigger on select event
                                onRemove={onRemoveC} // Function will trigger on remove event
                                displayValue="compliance" // Property name to display in the dropdown options
                                showCheckbox={true}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={submit}>Submit</Button>{' '}
                    <Button color="secondary" onClick={openModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>

    )
}
const mapStateToProps = (state) => ({
    user: state.user.user,
    isAuthenticated: state?.user?.isAuthenticated,
    success: state.user.success,
    loading: state.user.loading,
    status: state.user.status,
    compliance: state.compliance,
    userList: state.userList,

});

const mapDispatchToProps = () => (dispatch) => ({
    getUsers: () => dispatch(getUsers()),
    createUser: (data) => dispatch(createUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
