import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SessionGraph = ({ themeColor }) => {
  const data = [
    { name: "Session 1", time: 20 },
    { name: "Session 2", time: 25 },
    { name: "Session 3", time: 30 },
    { name: "Session 4", time: 15 }
  ];

  return (
    <div className="session-graph">
      <h3>Session Graph</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="time" stroke={themeColor} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SessionGraph;
