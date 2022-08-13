import React from "react";
import { getDate } from "../../Helpers/functions";
import "./compliance.scss";
const ComplianceCard = (props) => {
  const { item, cardHandler } = props;
  return (
    <div className="RC_Conatiner" onClick={() => cardHandler(item._id)}>
      <div className="Upper_Section">
        <div className="container">{item.compliance}
        </div>
        <div className="title">{item.statue}

        </div>
      </div>
      <span className="horizontal_line"></span>

      <div className="Lower_Section">
        <div className="content">
          <span className="title">Due date</span>
          <span className="description">{getDate(item.dueDate)}</span>
        </div>
        <div className="content">
          <span className="title">Last Date:</span>
          <span className="description">{getDate(item.lastDate)}</span>
        </div>
      </div>
      <div className="Lower_Section">
        <div className="content">
          <span className="title">Recurring:</span>
          <span className="description">{item.frequency}</span>
        </div>
        <div className="content">
          <span className="title">Status:</span>
          <span className="description">{item.frequency}</span>
        </div>
      </div>
    </div>
  );
};
export default ComplianceCard;