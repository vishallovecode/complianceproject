import React from 'react';
import { Table ,Button} from 'reactstrap';

export default class CustomTable extends React.Component {
  render() {
    console.log(this.props.loader)
    const {renderRows , renderColumns , loader} = this.props;
    return (
      <Table striped>
        <thead>
         {renderColumns()}
        </thead>
        {renderRows()}
        {loader && <img src= '/loader.svg'/>}
      </Table>
    );
  }
}