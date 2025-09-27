// src/components/RequestsTable.jsx
import React from "react";

export default function RequestsTable({ data = [], onDelete }){
  return (
    <table className="table">
      <thead>
        <tr><th>Request</th><th>User</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {data.length === 0 && <tr><td colSpan="3" className="small">No requests</td></tr>}
        {data.map(r => (
          <tr key={r.id}>
            <td>{r.title}</td>
            <td>{r.user}</td>
            <td style={{display:"flex", gap:8}}>
              <button className="btn btn-ghost" onClick={()=> alert("Open full request page - not implemented in demo")}>View</button>
              <button className="btn btn-ghost" onClick={()=>onDelete(r.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
