import React , { useState , useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { ACTIVITY, BASE_URL } from '../../constants';

import { getDate } from '../../Helpers/functions';
import AxiosInstance from '../../middleware/axios';
import CustomTable from '../Table';
import './activity.scss';
const ViewActivity = (props)=> {
   const [activityData , setActivity] = useState([])
   const [loader , setLoader]  = useState(false);

    const getActivity = ()=> {
        setLoader(true);
        AxiosInstance.get(`${BASE_URL}${ACTIVITY}` ).then((res)=>{
            setActivity(res.data);
            setLoader(false);
          }).catch(()=>{
                setLoader(false);
          });
    }

    useEffect(()=>{
        getActivity()
      
    },[])
    const renderColumn = ()=> {
        return  (
            <tr>
            <th>Activity Id</th>
            <th>Completion Date</th>
            <th>Compliance Name</th>
            <th>Company Name</th>
            <th>Statue</th>
            <th>Documents</th>
            <th>Amount Paid</th>
            <th>Late Fee</th>
            <th>Updated At</th>
            <th>Edited By</th>
          </tr>
        )
    }
    const getComplianceName = (id)=> {
            const data  = props.compliance?.data.filter(item=> item._id ==id );
            return data && data.length && data[0].compliance;
    }

    const getStatue =(id)=> {
      const data  = props.compliance?.data.filter(item=> item._id ==id );
      return data && data.length && data[0].statue;
    }
    const getEditedBy =(item)=>{
            return `${item?.completedBy?.firstName} ${item?.completedBy?.lastName}`;
    }
    const renderRows =()=> {

         return  (
          <tbody>
            {
                activityData.map((item)=>{
                   return (
                    <tr>
                    <th scope="row">{item._id}</th>
                    <td>{getDate(item.completionDate)}</td>
                    <td>{getComplianceName(item.complianceId)}</td>
                    <td>{item.companyId}</td>
                    <td>{getStatue(item.complianceId)}</td>
                    <td>
                      { item?.proofDocUrl ? <a href= {item?.proofDocUrl} download>Download</a>: <span>No File</span>    }
                        </td>
                    <td>{item.AmountPaid}</td>
                    <th>{item?.LateFee}</th>
                    <td>{getDate(item.updatedAt)}</td>
                    <td>{getEditedBy(item)}</td>
                  </tr>
                   )
                })
            }
            </tbody>
         )
    }

    return(
        <div className = "activity">
           <h3 >Activity</h3>
           <CustomTable renderColumns= {renderColumn} renderRows= {renderRows} loader ={loader}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(ViewActivity);