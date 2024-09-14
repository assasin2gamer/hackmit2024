import React from 'react';
import Graph from './graph/graph'; // Import the Graph component
import './dashboard.css'; // Import the styles
import SimpleGraph from './node/node'; // Import the PulseGraph component
function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <div className="left-sidebar">
        <div className="icon green"></div>
        <div className="icon gray"></div>
        <div className="icon gray"></div>
        <div className="icon gray"></div>
        <div className="icon gray"></div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="graph-header">
          <h2>Portfolio Analytics</h2>
          <div className="timeframe">
            <span>1D</span>
            <span>5D</span>
            <span>1M</span>
            <span>1Y</span>
            <span>5Y</span>
            <span>Max</span>
          </div>
        </div>
        <Graph width="600px" height="400px" />
      </div>
      {/* Node Graph */}
        <div className="node-graph">
            <SimpleGraph />
        </div>
      {/* Right Sidebar */}
      <div className="right-sidebar">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="buttons-container">
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
          <button>Button</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
