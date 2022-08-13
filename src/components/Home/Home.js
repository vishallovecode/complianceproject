
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { getCompliance } from '../../redux/actions';
import { Link, useHistory } from "react-router-dom";
import ComplianceCard from '../ComplianceCard';
import Multiselect from 'multiselect-react-dropdown';
import './homes.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Label, FormGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { getMonthDayYear } from '../../Helpers/functions';

const Home = (props) => {
    const { data, loading } = props.compliance;
    const [filters] = useState([{ id: "ALL", name: 'All' }, {
        id: "CURRENT", name: 'Current Month'
    }, { id: "PENDING", name: 'Pending' }, { id: "COMPLETE", name: "Completed" }, { id: "OVERDUE", name: 'OverDue' }])

    const [selectedFilter, setSelectedFilter] = useState([{ id: "CURRENT", name: 'Current Month' }])
    const [filterData, setFilterData] = useState([])
    const history = useHistory();
    useEffect(() => {
        props.getCompliance()
    }, [props.user])

    useEffect(() => {
        filteredData(selectedFilter)
    }, [props.compliance])

    const cardHandler = (id) => {
        history.push(`/compliance/${id}`);
    }
    const onSelect = (data) => {
        setSelectedFilter(data)
        const selectedObject = data && data.length && data[0];
        filteredData(selectedObject);
    }

    const filteredData = (obj) => {
        let updatedfilteredData = [];

        if ((obj.id) === 'CURRENT') {
            updatedfilteredData = (data || []).filter(item => getMonthDayYear(item.lastDate) === getMonthDayYear(new Date()))
        } else if (obj.id =='ALL') {
            updatedfilteredData = data;
        }
            else {
            updatedfilteredData = (data || []).filter(item => item.status == obj.id)
        }
        setFilterData(updatedfilteredData)

    }
    const onRemove = (data) => {
        setSelectedFilter(data)
    }
    return (
        <div className='home'>
            <FormGroup style={{ width: "200px", marginLeft: '70%' }}>
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
                {filterData?.length ? filterData?.map((compliance, index) => {
                    return (
                        <ComplianceCard item={compliance} cardHandler={cardHandler} />
                    )
                }) : <div>
                    {selectedFilter[0].id == "CURRENT" ? <span>{`No Compliances for selected Month`}</span> : <span>{`No ${selectedFilter[0].name} Compliances`}</span>}
                    < img src="/happy.png" />
                </div>
                }
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


