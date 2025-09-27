// src/components/SignupForm.jsx
import React, { useState } from "react";

/*
  Signup rules described by you:
  - roles: supervisor, user
  - supervisor fields: name, email, username, password, confirm, company (dropdown)
  - user: can be private OR under supervision (checkboxes). Private => no company. Under supervision => company required.
*/

const COMPANIES = ["Google","Microsoft","IBM","Oracle","KL University","SRM University","VIT University"];

export default function SignupForm({ onSignup }){
  const [role, setRole] = useState("supervisor"); // default
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [privateUse, setPrivateUse] = useState(true);
  const [company, setCompany] = useState(COMPANIES[0]);

  function handleSubmit(e){
    e.preventDefault();
    if(!name || !email || !username || !password){ alert("Please fill required fields"); return; }
    if(password !== confirm){ alert("Passwords do not match"); return; }

    // Save a simple user record in localStorage so later you can test
    const users = JSON.parse(localStorage.getItem("expense_users") || "[]");
    const newUser = { role, name, email, username, company: role==="supervisor" || !privateUse ? company : null };
    users.push(newUser);
    localStorage.setItem("expense_users", JSON.stringify(users));

    // Call onSignup to treat them as logged in right after creating account
    onSignup({ role, username });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="small">Role</label>
        <div className="radio-row">
          <label><input type="radio" checked={role==="supervisor"} onChange={()=>setRole("supervisor")} /> Supervisor</label>
          <label><input type="radio" checked={role==="user"} onChange={()=>setRole("user")} /> User</label>
        </div>
      </div>

      <div className="form-row">
        <label className="small">Full name</label>
        <input className="input" value={name} onChange={e=>setName(e.target.value)} />
      </div>

      <div className="form-row">
        <label className="small">Email</label>
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
      </div>

      <div className="form-row">
        <label className="small">Username</label>
        <input className="input" value={username} onChange={e=>setUsername(e.target.value)} />
      </div>

      <div className="form-row">
        <label className="small">Password</label>
        <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
      </div>

      <div className="form-row">
        <label className="small">Confirm Password</label>
        <input type="password" className="input" value={confirm} onChange={e=>setConfirm(e.target.value)} />
      </div>

      {role === "user" && (
        <div className="form-row">
          <label className="small">Usage type</label>
          <div style={{display:"flex", gap:12, alignItems:"center"}}>
            <label><input type="checkbox" checked={privateUse} onChange={()=>setPrivateUse(true)} /> Private use</label>
            <label><input type="checkbox" checked={!privateUse} onChange={()=>setPrivateUse(false)} /> Under supervision</label>
          </div>
        </div>
      )}

      {(role === "supervisor" || (role === "user" && !privateUse)) && (
        <div className="form-row">
          <label className="small">Company</label>
          <select className="input" value={company} onChange={e=>setCompany(e.target.value)}>
            {COMPANIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      )}

      <div style={{display:"flex", justifyContent:"flex-end", gap:8, marginTop:8}}>
        <button className="btn btn-primary" type="submit">Create account</button>
      </div>
    </form>
  );
}
