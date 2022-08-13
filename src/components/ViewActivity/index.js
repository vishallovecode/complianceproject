import React , { useState , useEffect } from 'react';
import { Button } from 'reactstrap';
import { ACTIVITY, BASE_URL } from '../../constants';

import { getDate } from '../../Helpers/functions';
import AxiosInstance from '../../middleware/axios';
import CustomTable from '../Table';
import './activity.scss';
const ViewActivity = ()=> {
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
            <th>Compliance Id</th>
            <th>Company Id</th>
            <th>Documents</th>
            <th>Amount Paid</th>
            <th>Late Fee</th>
            <th>Updated At</th>
            <th>Edited By</th>
          </tr>
        )
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
                    <td>{item.complianceId}</td>
                    <td>{item.companyId}</td>
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
           <CustomTable renderColumn= {renderColumn} renderRows= {renderRows} loader ={loader}/>
        </div>
    )
}

export default ViewActivity;