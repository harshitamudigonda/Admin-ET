// src/components/SecurityTable.jsx
import React from "react";

export default function SecurityTable({ data = [], onDelete, onEdit }) {
  return (
    <table className="table">
      <thead>
        <tr><th>Title</th><th>Severity</th><th>Opened by</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {data.length === 0 && <tr><td colSpan="4" className="small">No issues</td></tr>}
        {data.map(r => (
          <tr key={r.id}>
            <td>{r.title}</td>
            <td><span className="pill">{r.severity}</span></td>
            <td>{r.openedBy}</td>
            <td style={{display:"flex", gap:8}}>
              <button className="btn btn-ghost" onClick={()=> {
                const newTitle = prompt("Edit issue title", r.title);
                if(newTitle) onEdit(r.id, { title: newTitle });
              }}>Edit</button>
              <button className="btn btn-ghost" onClick={()=>onDelete(r.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
