// src/components/AdminPage.jsx
import React, { useState, useMemo } from "react";
import BarChart from "./BarChart";
import SecurityTable from "./SecurityTable";
import RequestsTable from "./RequestsTable";

/*
  AdminPage: shows chart, security issues card, client requests card, right-side statistics.
  searchQuery prop filters rows in the tables
*/

export default function AdminPage({ searchQuery = "" }){
  // sample data for chart (months with amounts)
  const expenseData = [
    { label: "Jan", value: 420 },
    { label: "Feb", value: 380 },
    { label: "Mar", value: 520 },
    { label: "Apr", value: 470 },
    { label: "May", value: 610 },
    { label: "Jun", value: 560 },
  ];

  // sample table data (start from localStorage if available)
  const initialSecurity = JSON.parse(localStorage.getItem("security_issues") || "[]");
  const initialRequests = JSON.parse(localStorage.getItem("client_requests") || "[]");

  const [security, setSecurity] = useState(initialSecurity.length ? initialSecurity : [
    { id:1, title:"XSS on reports page", severity:"high", openedBy:"alice" },
    { id:2, title:"Expired certificate on API", severity:"medium", openedBy:"bob" }
  ]);
  const [requests, setRequests] = useState(initialRequests.length ? initialRequests : [
    { id:1, title:"Export to CSV", user:"john" },
    { id:2, title:"Add monthly budget alert", user:"sara" }
  ]);

  // save to localStorage whenever lists change (simple persistence)
  React.useEffect(()=> localStorage.setItem("security_issues", JSON.stringify(security)), [security]);
  React.useEffect(()=> localStorage.setItem("client_requests", JSON.stringify(requests)), [requests]);

  function handleDeleteSecurity(id){
    if(!confirm("Admin delete is emergency-only. Confirm delete?")) return;
    setSecurity(security.filter(s=>s.id!==id));
  }
  function handleEditSecurity(id, patch){
    setSecurity(security.map(s=> s.id===id ? {...s, ...patch} : s));
  }

  function handleDeleteRequest(id){
    if(!confirm("Delete request?")) return;
    setRequests(requests.filter(r=>r.id!==id));
  }

  // filtered lists based on searchQuery
  const filteredSecurity = useMemo(()=> {
    if(!searchQuery) return security;
    const q = searchQuery.toLowerCase();
    return security.filter(s => s.openedBy.toLowerCase().includes(q) || s.title.toLowerCase().includes(q));
  }, [security, searchQuery]);

  const filteredRequests = useMemo(()=> {
    if(!searchQuery) return requests;
    const q = searchQuery.toLowerCase();
    return requests.filter(r => r.user.toLowerCase().includes(q) || r.title.toLowerCase().includes(q));
  }, [requests, searchQuery]);

  return (
    <div style={{display:"flex", flexDirection:"column", gap:12}}>
      <div className="dashboard-grid">
        <div className="main-col">
          <div className="card">
            <h3>Current expense trends</h3>
            <p className="small">Monthly spending (most widely used).</p>
            <BarChart data={expenseData} />
          </div>

          <div className="small-cards">
            <div className="card">
              <h4>Security issues</h4>
              <p className="small">Latest security updates. Click "View all" to open full list.</p>
              <SecurityTable data={filteredSecurity.slice(0,3)} onDelete={handleDeleteSecurity} onEdit={handleEditSecurity} showViewAll={( ) => {/* handled in component */}} />
            </div>

            <div className="card">
              <h4>Client requests</h4>
              <p className="small">Requests from users.</p>
              <RequestsTable data={filteredRequests.slice(0,3)} onDelete={handleDeleteRequest} />
            </div>
          </div>

        </div>

        <aside>
          <div className="stats-card card">
            statistics
            <div style={{position:"absolute", bottom:16, left:16, fontSize:14, color:"var(--muted)"}}>
              Active users: {Math.max(12, Math.floor(Math.random()*120))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
