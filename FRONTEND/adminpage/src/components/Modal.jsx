// src/components/Modal.jsx
import React from "react";

export default function Modal({ children, onClose }){
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e)=>e.stopPropagation()}>
        <div style={{display:"flex", justifyContent:"flex-end"}}>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}
