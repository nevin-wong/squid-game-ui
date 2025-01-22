import React from "react";
import "./PlayerMonitor.css";

const PlayerMonitor = () => {
  const columns = 10; // Number of columns in the pyramid

  const renderColumns = () => {
    let columnElements = [];
    for (let i = 1; i <= columns; i++) {
      let elements = [];
      for (let j = 0; j < i; j++) {
        elements.push(<div key={`${i}-${j}`} className="grid-item"></div>);
      }
      columnElements.push(
        <div key={`column-${i}`} className="grid-column">
          {elements}
        </div>
      );
    }
    return columnElements;
  };

  return (
    <div className="player-monitor">
      <div className="grid-container">{renderColumns()}</div>
    </div>
  );
};

export default PlayerMonitor;
