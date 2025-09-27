// src/App.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import AuthModal from "./components/AuthModal";
import AdminPage from "./components/AdminPage";
import "./index.css";

export default function App(){
  // who is logged in? null or { role, username }
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(()=>{
    // restore a saved user from localStorage (keeps you logged in in the browser)
    const saved = localStorage.getItem("expense_user");
    if(saved) setUser(JSON.parse(saved));
  },[]);

  function handleLogin(userObj){
    // userObj should be { role, username }
    setUser(userObj);
    localStorage.setItem("expense_user", JSON.stringify(userObj));
    setShowAuth(false);
  }
  function handleLogout(){
    setUser(null);
    localStorage.removeItem("expense_user");
  }

  return (
    <div className="app-root">
      <Header
        user={user}
        onOpenAuth={(mode) => { setAuthMode(mode); setShowAuth(true); }}
        onLogout={handleLogout}
        onSearch={(q)=>setSearchQuery(q)}
      />

      {user && user.role === "admin" ? (
        <AdminPage searchQuery={searchQuery} />
      ) : (
        <main className="card" style={{marginTop:12}}>
          <h2>Welcome to Expense Tracker</h2>
          <p className="large">Welcome to our Expense Tracker! 
            Managing your finances has never been easier. Our tool helps you effortlessly track your daily spending, 
            categorize expenses, and visualize your financial habits with clear charts and summaries. 
            Whether you want to save more, control overspending, or simply understand where your money goes, 
            our expense tracker puts you in full control. Easy to use, accessible anywhere, and designed for real-life budgets, 
            it empowers you to make smarter financial decisions every day. 
            Take charge of your money and start building a healthier financial future with us today! </p>

            <h3>WHAT OUR WEBSITE DOES?</h3>
            <h4> 1. Users can track their expenses. </h4>
            <h4> 2. Supervisors can watch the expenditure of their users. </h4>
            <h4> 3. Supervisors can be from large institutions, Parents or companies. </h4>
        </main>
      )}

      {showAuth && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}
