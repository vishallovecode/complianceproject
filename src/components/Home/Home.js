
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { getCompliance } from '../../redux/actions';
import { Link, useHistory } from "react-router-dom";
import ComplianceCard from '../ComplianceCard';
import Multiselect from 'multiselect-react-dropdown';
import './homes.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Label, FormGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Box, Grid, Paper } from '@mui/material';
const Home = (props) => {
    const { data, loading } = props.compliance;
    const [filters] = useState([{
        id: 1, name: 'Current Month'
    }, { id: 2, name: 'Pending' }, { id: 3, name: "completed" }, { id: 4, name: 'OverDue' }])

    const [selectedFilter, setSelectedFilter] = useState([{ id: 1, name: 'Current Month' }])

    const history = useHistory();
    useEffect(() => {
        props.getCompliance()
    }, [props.user])
    const cardHandler = (id) => {
        history.push(`/compliance/${id}`);
    }
    const onSelect = (data) => {
        setSelectedFilter(data)
    }
    const onRemove = () => {
        setSelectedFilter(data)
    }
    return (
      <div>

        <FormGroup style={{ width: "200px"  , marginLeft:'70%'}}>
            <Multiselect
                options={filters}
                selectedValues={selectedFilter}
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="name"
                showCheckbox={true}
                singleSelect={true}
            />
        </FormGroup>
        {!loading ? <div className="h-container">
            {data?.map((compliance, index) => {
                return (
                    <ComplianceCard item={compliance} cardHandler={cardHandler} />
                )
            })}
        </div> :
            <img src='/loader.svg' className="loader" />}
    </div>


    )
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    isAuthenticated: state?.user?.isAuthenticated,
    success: state.user.success,
    loading: state.user.loading,
    status: state.user.status,
    compliance: state.compliance
});

const mapDispatchToProps = () => (dispatch) => ({
    getCompliance: () => dispatch(getCompliance()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);


