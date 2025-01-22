import React, { useState } from "react";
import "./App.css";
import SlotDisplay from "./Components/SlotDisplay";
import VoteDisplay from "./Components/VoteDisplay";
import Sidebar from "./Components/Sidebar";

function App() {
  const [selectedComponent, setSelectedComponent] = useState("SlotDisplay");

  return (
    <div className="App">
      <Sidebar
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
      />

      <header className="App-header">
        {selectedComponent === "SlotDisplay" && <SlotDisplay />}
        {selectedComponent === "VoteDisplay" && <VoteDisplay />}
      </header>
    </div>
  );
}

export default App;
