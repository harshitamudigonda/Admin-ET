// src/components/Header.jsx
import React, { useState } from "react";

export default function Header({ user, onOpenAuth, onLogout, onSearch }){
  const [q, setQ] = useState("");

  function handleSearchChange(e){
    setQ(e.target.value);
    onSearch && onSearch(e.target.value);
  }

  return (
    <header className="header">
      <div style={{display:"flex", alignItems:"center", gap:12}}>
        <div className="app-title">Expense Tracker</div>
      </div>

      <div className="header-right">
        {!user ? (
          <>
            <button className="btn btn-ghost" onClick={()=>onOpenAuth("signup")}>Sign up</button>
            <button className="btn btn-primary" onClick={()=>onOpenAuth("login")}>Log in</button>
          </>
        ) : (
          <>
            <input
              value={q}
              onChange={handleSearchChange}
              placeholder="Search by username"
              className="search-input"
            />
            <button className="btn btn-ghost" onClick={onLogout}>Sign-out</button>
          </>
        )}
      </div>
    </header>
  );
}
