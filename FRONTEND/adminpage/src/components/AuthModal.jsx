// src/components/AuthModal.jsx
import React, { useState } from "react";
import Modal from "./Modal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthModal({ mode="login", onClose, onLogin }){
  const [view, setView] = useState(mode);

  return (
    <Modal onClose={onClose}>
      <div style={{display:"flex", gap:8, marginBottom:12}}>
        <button className={"btn " + (view==="login" ? "btn-primary":"btn-ghost")} onClick={()=>setView("login")}>Login</button>
        <button className={"btn " + (view==="signup" ? "btn-primary":"btn-ghost")} onClick={()=>setView("signup")}>Sign Up</button>
      </div>

      {view === "login" ? (
        <LoginForm onLogin={(user)=>{onLogin(user); onClose();}} />
      ) : (
        <SignupForm onSignup={(user)=>{onLogin(user); onClose();}} />
      )}
    </Modal>
  );
}
