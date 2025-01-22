import React from "react";

function Sidebar({ selectedComponent, setSelectedComponent }) {
  return (
    <div className="sidebar">
      <div
        className={`tab ${selectedComponent === "SlotDisplay" ? "active" : ""}`}
        onClick={() => setSelectedComponent("SlotDisplay")}
      >
        <div className="circle"></div>
      </div>
      <div
        className={`tab ${selectedComponent === "VoteDisplay" ? "active" : ""}`}
        onClick={() => setSelectedComponent("VoteDisplay")}
      >
        <div className="circle"></div>
      </div>
    </div>
  );
}

export default Sidebar;
