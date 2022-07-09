import React from 'react';
import { useEffect } from 'react';
import { connect } from "react-redux";
import { getCompliance } from '../../redux/actions';
import ComplianceCard from '../ComplianceCard';
import './homes.scss'
const Home = (props) => {
    const { data, loading } = props.compliance;
    useEffect(() => {
        props.getCompliance();
    }, [])
    return (
        <>
            {!loading ? <div className ="h-container">
                {data?.map((compliance, index) => {
                    return (
                        <ComplianceCard item={compliance} />
                    )
                })}
            </div> :
                <img src='/loader.svg'  className= "loader"/>}
        </>

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


