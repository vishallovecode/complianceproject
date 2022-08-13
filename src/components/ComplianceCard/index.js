import React from "react";
import { Button } from "reactstrap";
import { getDate } from "../../Helpers/functions";
import "./compliance.scss";
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';

const ComplianceCard = (props) => {
  const { item, cardHandler } = props;
  return (
    <div className="RC_Conatiner" onClick={() => cardHandler(item._id)}>
      <div className={`Upper_Section ${item.status}`}>
        <div className="container">{item.compliance}
        </div>
        <div className="iconCon">
        <div className="title">{item.statue}
        </div>
        <span className="title">
        <ModeEditOutlineTwoToneIcon/>
        </span>
        </div>
      </div>
      <span className="horizontal_line"></span>

      <div className="Lower_Section">
        <div className="content1">
          <span className="title">Due date</span>
          <span className="description">{getDate(item.dueDate)}</span>
        </div>
        <div className="content1">
          <span className="title">Last Date:</span>
          <span className="description">{getDate(item.lastDate)}</span>
        </div>
      </div>
      <div className="Lower_Section">
        <div className="content1">
          <span className="title">Recurring:</span>
          <span className="description">{item.frequency}</span>
        </div>
        <div className="content1">
          <span className="title">Status:</span>
          <span className="description">{item.status}</span>
        </div>
      </div>
    </div>
  );
};
export default ComplianceCard;