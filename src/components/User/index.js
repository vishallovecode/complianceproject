
import React from 'react';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Label, FormGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Multiselect from 'multiselect-react-dropdown';
import { createUser, getUsers } from '../../redux/actions';
import CustomTable from '../Table';
import './user.scss'
import '../../Header/navbar.scss'
import AxiosInstance from '../../middleware/axios';
import { USER } from '../../constants';

const ManageUser = (props) => {
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [roles, setRoles] = useState([]);
    const [complinaces, setCompliances] = useState([])
    const [selectedUser, setSelectedUser] = useState('');
    const [sloading , setSubmitLoading] = useState(false)
    const [rolesList] = useState([
        { id: 1, name: 'REVIEWER' },
        { id: 2, name: 'EDITOR' },
        { id: 3, name: 'ADMIN' }
    ])
    const [statueList] = useState([
        {id:1 , title: "Companies Act"} , {id:2 , title: "GST"}, {id:3 , title: "Income Tax"}
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
        setFirstName('');
        setRoles([])
        setPhone()
        setEmail('')
        setLastName('')
        if (openModal) {
            setEditModeOn(false)
        }
        setOpen(!open)
    }
    const submit = () => {
        const payload = {
            firstName,
            lastName,
            email, phone,
            roles: roles.map((item) => item.name),
            categories: complinaces?.map(c => c.title)
        }
        setSubmitLoading(true)
        AxiosInstance.post(USER,payload ).then((res)=>{
            setSubmitLoading(false)
            setOpen(!open)
            props.getUsers()
        }).catch(()=>{
            setSubmitLoading(false)
            setOpen(!open)

        }).finally(()=>{
            setSubmitLoading(false)
            setOpen(!open)
        })
    }

    const onEdit = (data) => {
        setSelectedUser(data);
        setEditModeOn(true);
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setEmail(data.phone)
        setPhone(data.email)
        setOpen(true);
        setRoles(data.roles.map((item , index) =>{
            return {
                name: item, id: index
            }
        }))
    }
    const onDelete = () => {

    }

    const renderColumns = ()=> {
        return  (
            <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        )
    }
    const renderRows = ()=> {
        return (
<>
{ Array.isArray(props.userList?.data) && props.userList?.data?.map((item , index)=> {
            return (
              <tr>
              <th scope="row">{index+1}</th>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.company}</td>
              <td>{item.roles?.join(',')}</td>
              <td>{item.email}</td>
              <td> <Button color="secondary" onClick = {()=>onEdit(item)} >Edit  <i class="fas fa-edit"></i></Button>{' '}
                   <Button color="danger"  onClick = {()=>onDelete(item)}>Delete</Button>{' '}
              </td>
            </tr>
            )
           })
           }
    </>
        )
    }
      
    return (
        <div className="user">
            <div className="header">
                <h3 className='title'>Manage Users</h3>
                <Button color="primary" className='button' onClick={openModal}>Add User</Button>
            </div>
            <CustomTable renderRows = {renderRows} renderColumns= {renderColumns} loader = {props.userList?.loading}/>
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
                                selectedValues={roles}// Preselected value to persist in dropdown
                                onSelect={onSelect} // Function will trigger on select event
                                onRemove={onRemove} // Function will trigger on remove event
                                displayValue="name" // Property name to display in the dropdown options
                                showCheckbox={true}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="loginUser">Select Compliance</Label>

                            <Multiselect
                                options={statueList} // Options to display in the dropdown
                                selectedValues={complinaces}  // Preselected value to persist in dropdown
                                onSelect={onSelectC} // Function will trigger on select event
                                onRemove={onRemoveC} // Function will trigger on remove event
                                displayValue="title" // Property name to display in the dropdown options
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
           { sloading &&  <div className='cover-spin'></div>}
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
