import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const WorkHistory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedSessions = JSON.parse(localStorage.getItem("workSessions")) || [];

    // Son 7 günü al
    const grouped = {};
    storedSessions.forEach((session) => {
      const date = new Date(session.time).toLocaleDateString();
      grouped[date] = (grouped[date] || 0) + session.duration / 60; // dakikaya çevir
    });

    const formattedData = Object.entries(grouped).map(([date, total]) => ({
      date,
      minutes: Math.round(total),
    }));

    setData(formattedData.slice(-7)); // son 7 gün
  }, []);

  return (
    <div style={{ width: "100%", height: 300, marginTop: "2rem" }}>
      <h2>📊 Çalışma Geçmişi (Son 7 Gün)</h2>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis label={{ value: "Dakika", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="minutes" fill="#6C63FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkHistory;
