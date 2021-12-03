import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div>
      This is the sidebar!
      <Link to="/ThisWeeksSteals">Link to ThisWeeksSteals!</Link>
    </div>
  );
}

export default SideBar;
