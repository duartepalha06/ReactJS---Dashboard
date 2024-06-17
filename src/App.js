// App.js

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./navbar/navbar";
import useUsers from "./Collapsibles/useUsers";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";
import Collapsible from "./Collapsibles/Collapsible";
import WeatherWidget from "./weather/WeatherWidget";
import News from "./News/News"; 

import "./App.css";

const App = () => {
  const {
    activeIndex,
    users,
    randomNumberCounts,
    axiosError,
    websocketError,
    setUsers,
    setRandomNumberCounts,
    handleCollapsibleClick,
  } = useUsers();

  const collapsibles = users.map((user) => ({
    title: `${user.name}`,
    user: user,
  }));

  const renderCharts = () => (
    <div className="chart-container">
      <div className="chart">
        <h2>Random Numbers:</h2>
        <BarChart data={randomNumberCounts} />
        {axiosError && (
          <div className="error-message">
            Error fetching data from Axios. Retrying...
          </div>
        )}
      </div>
      <div className="chart">
        <h2>Random Numbers (Pie Chart):</h2>
        <PieChart data={randomNumberCounts} />
        {websocketError && (
          <div className="error-message">
            WebSocket connection failed. Retrying...
          </div>
        )}
      </div>
    </div>
  );

  const renderCollapsibles = () =>
    collapsibles.map((collapsible, index) => (
      <Collapsible
        key={index}
        title={collapsible.title}
        user={collapsible.user}
        isActive={activeIndex === index}
        onClick={() => handleCollapsibleClick(index)}
        position={
          index % 2 === 0 ? "collapsible-left" : "collapsible-right"
        }
        setUsers={setUsers}
        setRandomNumberCounts={setRandomNumberCounts}
      />
    ));

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/">
              {renderCharts()}
              <WeatherWidget />
              <News /> {}
            </Route>
            <Route path="/users">{renderCollapsibles()}</Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
