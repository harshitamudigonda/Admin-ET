// src/components/LoginForm.jsx
import React, { useState } from "react";

/*
  Simple demo login:
  - Choose role (admin / supervisor / user)
  - Enter username & password (no real verification in demo)
  - On submit we "log in" the chosen role and username
*/
export default function LoginForm({ onLogin }){
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e){
    e.preventDefault();
    if(!username || !password){ alert("Please fill username and password"); return; }
    // In a real app, send to server for verification.
    onLogin({ role, username });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="small">Role</label>
        <div className="radio-row">
          <label><input type="radio" name="role" checked={role==="admin"} onChange={()=>setRole("admin")} /> Admin</label>
          <label><input type="radio" name="role" checked={role==="supervisor"} onChange={()=>setRole("supervisor")} /> Supervisor</label>
          <label><input type="radio" name="role" checked={role==="user"} onChange={()=>setRole("user")} /> User</label>
        </div>
      </div>

      <div className="form-row">
        <label className="small">Username</label>
        <input className="input" value={username} onChange={e=>setUsername(e.target.value)} />
      </div>

      <div className="form-row">
        <label className="small">Password</label>
        <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
      </div>

      <div style={{display:"flex", gap:8, justifyContent:"flex-end", marginTop:8}}>
        <button className="btn btn-primary" type="submit">Login</button>
      </div>
    </form>
  );
}
