// src/components/BarChart.jsx
import React from "react";

/*
  Small CSS bar chart. Each data item: { label, value }.
  Heights are calculated relative to the maximum value.
*/
export default function BarChart({ data = [] }){
  const max = Math.max(...data.map(d=>d.value), 1);
  return (
    <div>
      <div className="bar-row">
        {data.map((d, i) => {
          const heightPct = Math.round((d.value / max) * 100);
          return (
            <div key={i} style={{display:"flex", flexDirection:"column", alignItems:"center", gap:6}}>
              <div className="bar" style={{height: `${Math.max(20, heightPct)}%`}} title={`${d.label}: ${d.value}`}></div>
              <div className="bar-label">{d.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
