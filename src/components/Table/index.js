import React from 'react';
import { Table ,Button} from 'reactstrap';

export default class CustomTable extends React.Component {
  render() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         { Array.isArray(this.props?.data) && this.props?.data?.map((item , index)=> {
          return (
            <tr>
            <th scope="row">{index+1}</th>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.company}</td>
            <td>{item.roles?.join(',')}</td>
            <td>{item.email}</td>
            <td> <Button color="secondary" onClick = {()=>this.props.onEdit(item)} >Edit  <i class="fas fa-edit"></i></Button>{' '}
                 <Button color="danger"  onClick = {()=>this.props.onDelete(item)}>Delete</Button>{' '}
            </td>
          </tr>
          )
         })
         }

        </tbody>
      </Table>
    );
  }
}